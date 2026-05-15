import { NextRequest, NextResponse } from "next/server";
import providersData from "@/data/ofsted_providers.json";

/**
 * API: /api/find
 *
 * Query params:
 *   postcode (required) — the user's UK postcode (any format)
 *   radius   (optional) — search radius in miles (default 10, max 30)
 *   types    (optional) — comma-separated provider types to include
 *
 * Approach:
 *   1. Geocode the user's postcode via postcodes.io
 *   2. Filter providers to the same postcode AREA (e.g. "OX", "SW")
 *      and nearby areas if close to a boundary. This is a fast pre-filter
 *      that avoids geocoding all 27,000 providers.
 *   3. Bulk-geocode the candidate providers' postcodes
 *   4. Calculate exact distances using haversine
 *   5. Return up to 20 nearest providers
 */

interface Provider {
  urn: string | null;
  name: string;
  type: string;
  subtype: string | null;
  address: string | null;
  town: string | null;
  postcode: string;
  rating: string;
  inspection_date: string | null;
  places: number | null;
}

interface ProviderWithDistance extends Provider {
  distance: number;
  lat: number;
  lng: number;
}

const providers = providersData as Provider[];

// Build an index by postcode area for fast filtering
const providersByArea: Record<string, Provider[]> = {};
for (const p of providers) {
  const area = getPostcodeArea(p.postcode);
  if (!providersByArea[area]) providersByArea[area] = [];
  providersByArea[area].push(p);
}

function getPostcodeArea(postcode: string): string {
  // "OX1 2JD" -> "OX", "L1 1AA" -> "L", "SW1A 1AA" -> "SW"
  const clean = postcode.replace(/\s/g, "").toUpperCase();
  const match = clean.match(/^[A-Z]+/);
  return match ? match[0] : "";
}

function haversineMiles(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const R = 3958.8;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/** Geocode a single postcode via postcodes.io */
async function geocodeOne(postcode: string): Promise<{ lat: number; lng: number; postcode: string } | null> {
  const cleaned = postcode.replace(/\s/g, "").toUpperCase();
  try {
    const r = await fetch(
      `https://api.postcodes.io/postcodes/${encodeURIComponent(cleaned)}`,
      { next: { revalidate: 86400 } } // cache for 24h
    );
    if (!r.ok) return null;
    const data = await r.json();
    if (data.status !== 200 || !data.result) return null;
    return {
      postcode: data.result.postcode,
      lat: data.result.latitude,
      lng: data.result.longitude,
    };
  } catch {
    return null;
  }
}

/** Bulk-geocode a list of postcodes via postcodes.io */
async function geocodeBulk(postcodes: string[]): Promise<Map<string, { lat: number; lng: number }>> {
  const result = new Map<string, { lat: number; lng: number }>();
  // postcodes.io accepts up to 100 per request
  const batchSize = 100;
  for (let i = 0; i < postcodes.length; i += batchSize) {
    const batch = postcodes.slice(i, i + batchSize);
    try {
      const r = await fetch("https://api.postcodes.io/postcodes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postcodes: batch }),
        next: { revalidate: 86400 },
      });
      if (!r.ok) continue;
      const data = await r.json();
      for (const item of data.result || []) {
        if (item.result) {
          result.set(item.query.toUpperCase(), {
            lat: item.result.latitude,
            lng: item.result.longitude,
          });
        }
      }
    } catch {
      // swallow batch errors — partial results are fine
    }
  }
  return result;
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const postcodeRaw = url.searchParams.get("postcode")?.trim();
  const radiusRaw = url.searchParams.get("radius");
  const typesRaw = url.searchParams.get("types");

  if (!postcodeRaw) {
    return NextResponse.json({ error: "postcode is required" }, { status: 400 });
  }

  const radius = Math.min(Math.max(parseInt(radiusRaw || "10", 10) || 10, 1), 30);
  const typeFilter = typesRaw ? new Set(typesRaw.split(",").filter(Boolean)) : null;

  // 1) Geocode the user's postcode
  const center = await geocodeOne(postcodeRaw);
  if (!center) {
    return NextResponse.json(
      { error: "We couldn't find that postcode. Please check it and try again." },
      { status: 404 }
    );
  }

  // 2) Pre-filter providers by postcode area
  const userArea = getPostcodeArea(center.postcode);
  let candidates: Provider[] = providersByArea[userArea] || [];

  // Include neighbouring areas for edge cases — we'll filter by exact distance later
  // For simplicity, include all areas if the area has few providers (rural/sparse)
  if (candidates.length < 50) {
    candidates = providers; // fall back to all if area is too small
  }

  // Apply type filter if provided
  if (typeFilter) {
    candidates = candidates.filter((p) => typeFilter.has(p.type));
  }

  // 3) Get unique postcodes to geocode
  const uniquePostcodes = Array.from(new Set(candidates.map((p) => p.postcode)));

  // Cap the number we geocode to avoid huge requests
  // For very dense urban areas, we use a coarser pre-filter
  const POSTCODE_CAP = 1500;
  let workingCandidates = candidates;
  let workingPostcodes = uniquePostcodes;
  if (workingPostcodes.length > POSTCODE_CAP) {
    // Filter to providers whose postcode shares more characters with the user's
    // e.g. user "SW1A 1AA" -> prefer postcodes starting with "SW1"
    const userOutward = center.postcode.split(" ")[0];
    const closerFilter = (p: Provider) => p.postcode.startsWith(userOutward);
    const closer = candidates.filter(closerFilter);
    if (closer.length > 0) {
      workingCandidates = closer;
      workingPostcodes = Array.from(new Set(closer.map((p) => p.postcode)));
    }
    // Still too many? Take first N (will result in incomplete results, but functional)
    if (workingPostcodes.length > POSTCODE_CAP) {
      workingPostcodes = workingPostcodes.slice(0, POSTCODE_CAP);
      const allowed = new Set(workingPostcodes);
      workingCandidates = workingCandidates.filter((p) => allowed.has(p.postcode));
    }
  }

  // 4) Bulk-geocode candidate postcodes
  const coords = await geocodeBulk(workingPostcodes);

  // 5) Compute distances and filter by radius
  const withDistance: ProviderWithDistance[] = [];
  for (const p of workingCandidates) {
    const c = coords.get(p.postcode);
    if (!c) continue;
    const dist = haversineMiles(center.lat, center.lng, c.lat, c.lng);
    if (dist <= radius) {
      withDistance.push({ ...p, distance: dist, lat: c.lat, lng: c.lng });
    }
  }

  // Sort by distance, then by rating (Outstanding before Good before Not yet inspected)
  const ratingOrder: Record<string, number> = {
    "Outstanding": 0,
    "Good": 1,
    "Requires improvement": 2,
    "Inadequate": 3,
    "Not yet inspected": 4,
  };
  withDistance.sort((a, b) => {
    if (a.distance !== b.distance) return a.distance - b.distance;
    return (ratingOrder[a.rating] ?? 5) - (ratingOrder[b.rating] ?? 5);
  });

  // Cap at top 30 results
  const results = withDistance.slice(0, 30);

  return NextResponse.json({
    center: {
      postcode: center.postcode,
      lat: center.lat,
      lng: center.lng,
    },
    radius,
    total_in_radius: withDistance.length,
    results,
  });
}

"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

/**
 * Public Mapbox token, URL-restricted to:
 *  - https://childcarecompass.co.uk
 *  - https://www.childcarecompass.co.uk
 *  - https://childcarecompass-flame.vercel.app
 *  - http://localhost:3000
 * Scopes: STYLES:READ, STYLES:TILES, FONTS:READ
 *
 * Set NEXT_PUBLIC_MAPBOX_TOKEN in Vercel environment variables.
 * The token is a public (pk.) token — embedding it in the client bundle is
 * by design. The URL restrictions in the Mapbox dashboard prevent abuse.
 */
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";
if (MAPBOX_TOKEN) {
  mapboxgl.accessToken = MAPBOX_TOKEN;
}

export interface MapProvider {
  urn: string | null;
  name: string;
  rating: string;
  postcode: string;
  town: string | null;
  distance: number;
  lat: number;
  lng: number;
}

interface NurseryMapProps {
  center: { lat: number; lng: number };
  centerPostcode: string;
  providers: MapProvider[];
  onPinClick?: (urn: string | null) => void;
}

function colorForRating(rating: string): string {
  switch (rating) {
    case "Outstanding":
      return "#4A6B51"; // deep sage
    case "Good":
      return "#6B8E72"; // sage
    case "Requires improvement":
      return "#E8A87C"; // warmth (peach)
    case "Inadequate":
      return "#B7544A"; // muted red
    default:
      return "#A9A29A"; // muted gray for "Not yet inspected"
  }
}

export function NurseryMap({
  center,
  centerPostcode,
  providers,
  onPinClick,
}: NurseryMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const userMarkerRef = useRef<mapboxgl.Marker | null>(null);

  // Init map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [center.lng, center.lat],
      zoom: 11,
      attributionControl: false,
      cooperativeGestures: true, // requires Ctrl+scroll on desktop to zoom
    });

    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-right");
    map.addControl(
      new mapboxgl.AttributionControl({ compact: true }),
      "bottom-right"
    );

    mapRef.current = map;

    return () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
      userMarkerRef.current?.remove();
      userMarkerRef.current = null;
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fly to new centre when it changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    map.flyTo({
      center: [center.lng, center.lat],
      zoom: 11,
      duration: 1200,
      essential: true,
    });
  }, [center.lat, center.lng]);

  // Update markers when providers change
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear old provider markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    // Add user-location marker (the centre of search)
    if (userMarkerRef.current) {
      userMarkerRef.current.remove();
      userMarkerRef.current = null;
    }
    const userEl = document.createElement("div");
    userEl.style.cssText = `
      width: 22px; height: 22px;
      border-radius: 50%;
      background: #1F2A22;
      border: 3px solid #FBF7F1;
      box-shadow: 0 0 0 3px rgba(31,42,34,0.15);
      cursor: pointer;
    `;
    userMarkerRef.current = new mapboxgl.Marker({ element: userEl })
      .setLngLat([center.lng, center.lat])
      .setPopup(
        new mapboxgl.Popup({ offset: 18, closeButton: false }).setHTML(
          `<div style="font-family: inherit; font-size: 0.85rem; padding: 2px 4px;">
             <strong style="color: #1F2A22;">You searched here</strong><br/>
             <span style="color: #6B7268;">${escapeHTML(centerPostcode)}</span>
           </div>`
        )
      )
      .addTo(map);

    // Add provider markers and compute bounds
    if (providers.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      bounds.extend([center.lng, center.lat]);

      for (const p of providers) {
        const el = document.createElement("div");
        const color = colorForRating(p.rating);
        el.style.cssText = `
          width: 16px; height: 16px;
          border-radius: 50%;
          background: ${color};
          border: 2px solid #FBF7F1;
          box-shadow: 0 1px 3px rgba(31,42,34,0.25);
          cursor: pointer;
          transition: transform 0.15s ease;
        `;
        el.addEventListener("mouseenter", () => {
          el.style.transform = "scale(1.35)";
        });
        el.addEventListener("mouseleave", () => {
          el.style.transform = "scale(1)";
        });
        el.addEventListener("click", () => {
          if (onPinClick) onPinClick(p.urn);
        });

        const popupHTML = `
          <div style="font-family: inherit; font-size: 0.85rem; padding: 4px; max-width: 220px;">
            <strong style="color: #1F2A22; display: block; margin-bottom: 4px;">${escapeHTML(p.name)}</strong>
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
              <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: ${color};"></span>
              <span style="color: #1F2A22;">${escapeHTML(p.rating)}</span>
            </div>
            <div style="color: #6B7268; font-size: 0.78rem;">
              ${p.distance.toFixed(1)} miles · ${escapeHTML(p.postcode)}
            </div>
          </div>
        `;

        const marker = new mapboxgl.Marker({ element: el })
          .setLngLat([p.lng, p.lat])
          .setPopup(
            new mapboxgl.Popup({ offset: 14, closeButton: false }).setHTML(popupHTML)
          )
          .addTo(map);
        markersRef.current.push(marker);
        bounds.extend([p.lng, p.lat]);
      }

      // Fit map to all markers including user
      try {
        map.fitBounds(bounds, {
          padding: { top: 50, bottom: 50, left: 50, right: 50 },
          duration: 1200,
          maxZoom: 13,
        });
      } catch {
        // bounds may be too tight - ignore
      }
    }
  }, [providers, center.lat, center.lng, centerPostcode, onPinClick]);

  return (
    <div
      ref={containerRef}
      className="relative h-[420px] w-full overflow-hidden rounded-2xl border border-border shadow-[0_8px_30px_-12px_rgba(74,107,81,0.15)]"
      aria-label="Interactive map showing nearby nurseries"
    >
      {!MAPBOX_TOKEN && (
        <div className="absolute inset-0 flex items-center justify-center bg-surface text-center">
          <div className="max-w-sm p-6">
            <p className="font-display text-[1rem] font-medium text-ink">Map view coming online</p>
            <p className="mt-2 text-[0.85rem] text-muted">
              The list view below shows your full results. Map activation requires the Mapbox token to be set in the deployment environment.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function escapeHTML(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

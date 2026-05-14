/**
 * SAMPLE NURSERY DATA
 *
 * This is placeholder data used while we build the integration with the
 * live Ofsted register (which is published monthly as a CSV under the
 * Open Government Licence at gov.uk).
 *
 * Each entry contains only PUBLIC information that would appear in the
 * Ofsted register. We do not store phone numbers or contact details —
 * users find those themselves via Google when they click through.
 *
 * Real names have been replaced with plausible placeholders so users
 * understand this is sample data until the integration is live.
 */

export type OfstedRating =
  | "Outstanding"
  | "Good"
  | "Requires improvement"
  | "Inadequate"
  | "Not yet inspected";

export interface Nursery {
  /** Unique ID — will become Ofsted URN when we integrate real data */
  id: string;
  name: string;
  /** Full street address (line 1) */
  address: string;
  /** Town or city */
  town: string;
  /** UK postcode */
  postcode: string;
  /** Most recent Ofsted overall rating */
  ofstedRating: OfstedRating;
  /** Date of last inspection (ISO YYYY-MM-DD) */
  inspectionDate: string;
  /** Latitude */
  lat: number;
  /** Longitude */
  lng: number;
  /** Provider type */
  type: "Day nursery" | "Childminder" | "Pre-school" | "Out of school care";
}

export const SAMPLE_NURSERIES: Nursery[] = [
  // London
  { id: "s-001", name: "Acorns & Oaks Nursery", address: "14 Lavender Hill", town: "London", postcode: "SW11 5QP", ofstedRating: "Outstanding", inspectionDate: "2025-04-18", lat: 51.4647, lng: -0.1683, type: "Day nursery" },
  { id: "s-002", name: "Little Lanterns Day Nursery", address: "62 Stockwell Road", town: "London", postcode: "SW9 9JP", ofstedRating: "Good", inspectionDate: "2025-06-22", lat: 51.4711, lng: -0.1141, type: "Day nursery" },
  { id: "s-003", name: "Bumblebee Pre-School", address: "9 Mountview Road", town: "London", postcode: "N4 4SS", ofstedRating: "Outstanding", inspectionDate: "2024-11-05", lat: 51.5780, lng: -0.1132, type: "Pre-school" },
  { id: "s-004", name: "Willow Tree Nursery", address: "47 High Road", town: "London", postcode: "N22 6BH", ofstedRating: "Good", inspectionDate: "2025-02-14", lat: 51.5980, lng: -0.1090, type: "Day nursery" },
  { id: "s-005", name: "Cygnet Childcare", address: "120 Greenwich High Road", town: "London", postcode: "SE10 8JA", ofstedRating: "Good", inspectionDate: "2025-09-11", lat: 51.4769, lng: -0.0142, type: "Day nursery" },

  // Oxford
  { id: "s-010", name: "Magdalen Bridge Nursery", address: "3 Iffley Road", town: "Oxford", postcode: "OX4 1EA", ofstedRating: "Outstanding", inspectionDate: "2025-03-08", lat: 51.7497, lng: -1.2456, type: "Day nursery" },
  { id: "s-011", name: "Cherwell Pre-School", address: "22 Banbury Road", town: "Oxford", postcode: "OX2 6NN", ofstedRating: "Good", inspectionDate: "2024-10-30", lat: 51.7642, lng: -1.2620, type: "Pre-school" },
  { id: "s-012", name: "The Old Vicarage Day Nursery", address: "8 Norham Road", town: "Oxford", postcode: "OX2 6SF", ofstedRating: "Good", inspectionDate: "2025-07-14", lat: 51.7672, lng: -1.2630, type: "Day nursery" },

  // Cambridge
  { id: "s-020", name: "Cam Riverside Nursery", address: "44 Mill Road", town: "Cambridge", postcode: "CB1 2AD", ofstedRating: "Outstanding", inspectionDate: "2025-05-20", lat: 52.2014, lng: 0.1356, type: "Day nursery" },
  { id: "s-021", name: "Granta Pre-School", address: "11 Trumpington Street", town: "Cambridge", postcode: "CB2 1QA", ofstedRating: "Good", inspectionDate: "2025-01-15", lat: 52.2014, lng: 0.1167, type: "Pre-school" },

  // Bristol
  { id: "s-030", name: "Clifton Village Day Nursery", address: "18 The Mall", town: "Bristol", postcode: "BS8 4DR", ofstedRating: "Outstanding", inspectionDate: "2025-08-09", lat: 51.4543, lng: -2.6213, type: "Day nursery" },
  { id: "s-031", name: "Bedminster Bumblebees", address: "55 North Street", town: "Bristol", postcode: "BS3 1ES", ofstedRating: "Good", inspectionDate: "2025-04-02", lat: 51.4421, lng: -2.6028, type: "Day nursery" },
  { id: "s-032", name: "Redland Children's Centre", address: "9 Cotham Hill", town: "Bristol", postcode: "BS6 6JR", ofstedRating: "Good", inspectionDate: "2024-12-12", lat: 51.4663, lng: -2.6051, type: "Day nursery" },

  // Manchester
  { id: "s-040", name: "Didsbury Day Nursery", address: "112 School Lane", town: "Manchester", postcode: "M20 6RD", ofstedRating: "Outstanding", inspectionDate: "2025-06-04", lat: 53.4153, lng: -2.2317, type: "Day nursery" },
  { id: "s-041", name: "Chorlton Tots Pre-School", address: "33 Beech Road", town: "Manchester", postcode: "M21 9EQ", ofstedRating: "Good", inspectionDate: "2025-02-28", lat: 53.4421, lng: -2.2768, type: "Pre-school" },
  { id: "s-042", name: "Northern Quarter Childcare", address: "71 Oldham Street", town: "Manchester", postcode: "M4 1LE", ofstedRating: "Good", inspectionDate: "2025-09-25", lat: 53.4830, lng: -2.2351, type: "Day nursery" },

  // Birmingham
  { id: "s-050", name: "Moseley Village Nursery", address: "8 Alcester Road", town: "Birmingham", postcode: "B13 8BG", ofstedRating: "Good", inspectionDate: "2025-05-15", lat: 52.4471, lng: -1.8843, type: "Day nursery" },
  { id: "s-051", name: "Edgbaston Early Years", address: "29 Hagley Road", town: "Birmingham", postcode: "B16 8PE", ofstedRating: "Outstanding", inspectionDate: "2024-11-20", lat: 52.4710, lng: -1.9388, type: "Day nursery" },

  // Leeds
  { id: "s-060", name: "Headingley Hideaway Nursery", address: "18 Cardigan Road", town: "Leeds", postcode: "LS6 3AB", ofstedRating: "Good", inspectionDate: "2025-03-19", lat: 53.8158, lng: -1.5790, type: "Day nursery" },
  { id: "s-061", name: "Roundhay Pre-School", address: "5 Street Lane", town: "Leeds", postcode: "LS8 2DS", ofstedRating: "Good", inspectionDate: "2025-07-30", lat: 53.8327, lng: -1.5184, type: "Pre-school" },

  // Brighton
  { id: "s-070", name: "Seaside Children's Nursery", address: "112 Lewes Road", town: "Brighton", postcode: "BN2 3LG", ofstedRating: "Outstanding", inspectionDate: "2025-04-25", lat: 50.8311, lng: -0.1245, type: "Day nursery" },
  { id: "s-071", name: "Hove Lawns Day Nursery", address: "44 Church Road", town: "Hove", postcode: "BN3 2FN", ofstedRating: "Good", inspectionDate: "2025-08-18", lat: 50.8281, lng: -0.1701, type: "Day nursery" },

  // Edinburgh
  { id: "s-080", name: "Stockbridge Children's House", address: "27 Raeburn Place", town: "Edinburgh", postcode: "EH4 1HX", ofstedRating: "Good", inspectionDate: "2025-06-14", lat: 55.9583, lng: -3.2087, type: "Day nursery" },

  // Cardiff
  { id: "s-090", name: "Roath Park Pre-School", address: "18 Albany Road", town: "Cardiff", postcode: "CF24 3RR", ofstedRating: "Good", inspectionDate: "2025-05-08", lat: 51.4936, lng: -3.1612, type: "Pre-school" },
];

/**
 * Haversine distance between two lat/lng points (in miles)
 */
export function distanceMiles(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const R = 3958.8; // earth radius in miles
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Find nurseries within a given radius (miles) of a coordinate.
 * Returns them sorted by distance.
 */
export function findNurseriesNear(
  centerLat: number,
  centerLng: number,
  radiusMiles: number,
  filterType?: Nursery["type"][]
): Array<Nursery & { distance: number }> {
  return SAMPLE_NURSERIES
    .map((n) => ({
      ...n,
      distance: distanceMiles(centerLat, centerLng, n.lat, n.lng),
    }))
    .filter((n) => n.distance <= radiusMiles)
    .filter((n) => !filterType || filterType.length === 0 || filterType.includes(n.type))
    .sort((a, b) => a.distance - b.distance);
}

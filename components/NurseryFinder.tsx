"use client";

import { useState } from "react";

type ProviderType = "Day nursery" | "Childcare setting";

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
  distance: number;
  lat: number;
  lng: number;
}

interface SearchResponse {
  center: { postcode: string; lat: number; lng: number };
  radius: number;
  total_in_radius: number;
  results: Provider[];
}

export function NurseryFinder() {
  const [postcodeInput, setPostcodeInput] = useState("");
  const [radius, setRadius] = useState(10);
  const [typeFilters, setTypeFilters] = useState<ProviderType[]>([]);
  const [response, setResponse] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const cleaned = postcodeInput.trim();
    if (cleaned.length < 5 || cleaned.length > 8) {
      setError("Please enter a valid UK postcode (e.g. OX1 2JD).");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        postcode: cleaned,
        radius: String(radius),
      });
      if (typeFilters.length > 0) {
        params.set("types", typeFilters.join(","));
      }
      const res = await fetch(`/api/find?${params.toString()}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong with that search. Please try again.");
        setLoading(false);
        return;
      }
      setResponse(data);
    } catch {
      setError("Something went wrong looking up that postcode. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function toggleType(type: ProviderType) {
    setTypeFilters((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  }

  return (
    <div className="space-y-10">
      {/* Search form */}
      <form
        onSubmit={handleSearch}
        className="rounded-2xl border border-border bg-surface p-7 shadow-[0_8px_30px_-12px_rgba(74,107,81,0.12)] lg:p-9"
      >
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5">
            <label
              htmlFor="postcode"
              className="block font-display text-[1.15rem] font-medium tracking-tight-display text-ink"
            >
              Your postcode
            </label>
            <p className="mt-1 text-[0.88rem] text-muted">
              We use it only to find your area. We don&apos;t store it.
            </p>
            <input
              id="postcode"
              type="text"
              autoComplete="postal-code"
              value={postcodeInput}
              onChange={(e) => setPostcodeInput(e.target.value)}
              placeholder="e.g. OX1 2JD"
              className="mt-3 w-full rounded-lg border border-border bg-bg px-4 py-3 text-[1.02rem] uppercase tracking-wide focus:border-accent focus:outline-none"
            />
          </div>

          <div className="lg:col-span-4">
            <label className="block font-display text-[1.15rem] font-medium tracking-tight-display text-ink">
              Search radius
            </label>
            <p className="mt-1 text-[0.88rem] text-muted">
              {radius} miles from your postcode
            </p>
            <div className="mt-3 grid grid-cols-4 gap-1.5">
              {[5, 10, 15, 20].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRadius(r)}
                  className={`rounded-lg border py-2.5 text-[0.92rem] transition-all ${
                    radius === r
                      ? "border-accent bg-accent-soft text-ink"
                      : "border-border bg-surface text-muted hover:border-ink/30 hover:text-ink"
                  }`}
                >
                  {r} mi
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <button
              type="submit"
              disabled={loading || !postcodeInput.trim()}
              className="w-full rounded-full bg-accent px-6 py-3.5 text-[0.98rem] font-medium text-bg transition-all hover:bg-accent-deep disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Searching…" : "Find nurseries →"}
            </button>
          </div>
        </div>

        {/* Type filters */}
        <div className="mt-7 border-t border-border pt-6">
          <p className="text-[0.85rem] font-medium text-muted">
            Filter by provider type (optional)
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {(["Day nursery", "Childcare setting"] as ProviderType[]).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => toggleType(type)}
                className={`rounded-full border px-4 py-1.5 text-[0.85rem] transition-all ${
                  typeFilters.includes(type)
                    ? "border-accent bg-accent text-bg"
                    : "border-border bg-surface text-muted hover:border-ink/30 hover:text-ink"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <p className="mt-5 rounded-lg border border-warmth/40 bg-warmth-soft px-4 py-3 text-[0.92rem] text-ink">
            {error}
          </p>
        )}
      </form>

      {/* Results */}
      {response && (
        <div>
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-4">
            <p className="font-display text-[1.3rem] font-medium tracking-tight-display text-ink">
              {response.total_in_radius === 0
                ? "No nurseries found within this radius"
                : `${response.total_in_radius.toLocaleString()} ${
                    response.total_in_radius === 1 ? "nursery" : "nurseries"
                  } within ${response.radius} miles of ${response.center.postcode}`}
            </p>
            {response.results.length > 0 && (
              <p className="text-[0.85rem] text-muted">
                {response.total_in_radius > response.results.length
                  ? `Showing the ${response.results.length} closest`
                  : "Sorted by distance"}
              </p>
            )}
          </div>

          {response.total_in_radius === 0 ? (
            <div className="rounded-2xl border border-border bg-surface p-8 text-center">
              <p className="text-[1rem] text-ink">
                Try widening your search radius, or removing provider-type filters.
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {response.results.map((n) => (
                <li
                  key={n.urn || `${n.name}-${n.postcode}`}
                  className="group rounded-2xl border border-border bg-surface p-6 transition-all hover:border-accent/40 hover:shadow-[0_8px_30px_-12px_rgba(74,107,81,0.18)] lg:p-7"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-baseline gap-3">
                        <h3 className="font-display text-[1.3rem] font-medium tracking-tight-display text-ink">
                          {n.name}
                        </h3>
                        <span className="text-[0.85rem] text-muted">
                          {n.subtype || n.type}
                        </span>
                      </div>
                      <p className="mt-1.5 text-[0.92rem] text-muted">
                        {[n.address, n.town, n.postcode].filter(Boolean).join(", ")}
                      </p>
                      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.88rem]">
                        <span className="inline-flex items-center gap-2">
                          <RatingDot rating={n.rating} />
                          <span className="text-ink">{n.rating}</span>
                        </span>
                        {n.inspection_date && (
                          <span className="text-muted">
                            Inspected {formatDate(n.inspection_date)}
                          </span>
                        )}
                        {n.places && (
                          <span className="text-muted">
                            {n.places} places
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-3 sm:min-w-[140px]">
                      <div className="text-right">
                        <p className="font-display text-[1.6rem] font-light tracking-tight-display text-ink tabular-nums">
                          {n.distance.toFixed(1)}
                        </p>
                        <p className="text-[0.78rem] uppercase tracking-[0.1em] text-muted">
                          miles away
                        </p>
                      </div>
                      <a
                        href={`https://www.google.com/search?q=${encodeURIComponent(
                          `${n.name} ${n.postcode}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-bg px-4 py-2 text-[0.85rem] font-medium text-ink transition-all hover:border-accent hover:text-accent"
                      >
                        Find on Google ↗
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Empty state — no search yet */}
      {!response && !loading && (
        <div className="rounded-2xl border border-dashed border-border bg-surface/40 p-10 text-center">
          <p className="font-display text-[1.2rem] font-medium tracking-tight-display text-ink">
            Enter your postcode to see nurseries near you.
          </p>
          <p className="mt-2 text-[0.92rem] text-muted">
            We search 27,000+ Ofsted-registered providers across England.
          </p>
        </div>
      )}
    </div>
  );
}

function RatingDot({ rating }: { rating: string }) {
  const color =
    rating === "Outstanding"
      ? "bg-accent"
      : rating === "Good"
      ? "bg-sky"
      : rating === "Requires improvement"
      ? "bg-warmth"
      : rating === "Inadequate"
      ? "bg-warmth"
      : "bg-border";
  return <span className={`inline-block h-2 w-2 rounded-full ${color}`} aria-hidden />;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { month: "short", year: "numeric" });
}

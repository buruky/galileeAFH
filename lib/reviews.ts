import { cacheLife } from "next/cache";

export type Review = {
  author: string;
  authorUrl?: string;
  photo?: string;
  rating: number;
  when: string;
  text: string;
};

export type Reviews = { rating: number; count: number; url: string; reviews: Review[] };

// Google Places API (New) returns the place's 5 most relevant reviews; refetched every hour.
export async function getReviews(): Promise<Reviews | null> {
  "use cache";
  cacheLife("hours");

  const key = process.env.GOOGLE_PLACES_API_KEY;
  const place = process.env.GOOGLE_PLACE_ID;
  if (!key || !place) return null;

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${place}`, {
      headers: {
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": "rating,userRatingCount,googleMapsUri,reviews",
      },
    });
    if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
    const p = await res.json();
    return {
      rating: p.rating ?? 0,
      count: p.userRatingCount ?? 0,
      url: p.googleMapsUri,
      reviews: (p.reviews ?? [])
        .filter((r: any) => r.text?.text)
        .map((r: any) => ({
          author: r.authorAttribution?.displayName ?? "Google user",
          authorUrl: r.authorAttribution?.uri,
          photo: r.authorAttribution?.photoUri,
          rating: r.rating,
          when: r.relativePublishTimeDescription,
          text: r.text.text,
        })),
    };
  } catch (e) {
    console.error("Google reviews fetch failed", e);
    return null;
  }
}

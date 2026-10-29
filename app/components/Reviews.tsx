import { ArrowRight, Star } from "@phosphor-icons/react/dist/ssr";
import { getReviews } from "@/lib/reviews";

function Stars({ n, size = 18 }: { n: number; size?: number }) {
  return (
    <span role="img" aria-label={`${n} out of 5 stars`} className="flex text-accent">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} aria-hidden size={size} weight={i <= Math.round(n) ? "fill" : "regular"} />
      ))}
    </span>
  );
}

// Renders nothing until GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID are set, or if Google is unreachable.
// With no reviews yet, it invites families to write the first one.
export async function Reviews() {
  const data = await getReviews();
  if (!data) return null;

  return (
    <section id="reviews" className="reveal mx-auto max-w-6xl px-4 pb-28 sm:px-6 lg:pb-40">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-bold md:text-5xl">What families say</h2>
          {data.count > 0 && (
            <p className="mt-5 flex flex-wrap items-center gap-3 text-muted">
              <span className="text-2xl font-semibold text-ink">{data.rating.toFixed(1)}</span>
              <Stars n={data.rating} size={22} />
              <span>{data.count} reviews on Google</span>
            </p>
          )}
        </div>
        {data.reviews.length > 0 && (
        <a href={data.url} target="_blank" rel="noopener" className="inline-flex items-center gap-2 font-semibold text-accent underline underline-offset-4">
          Read all reviews on Google <ArrowRight aria-hidden size={16} weight="bold" />
        </a>
        )}
      </div>
      {data.reviews.length === 0 ? (
        <div className="mt-12 flex flex-col items-start gap-5 rounded-3xl bg-card p-8 shadow-soft ring-1 ring-line sm:p-10">
          <p className="max-w-[46ch] text-lg">
            Has your family been cared for at Galilee? Your words help other families find a home they can trust.
          </p>
          <a href={data.writeUrl} target="_blank" rel="noopener" className="inline-flex min-h-12 items-center gap-3 rounded-full bg-accent px-6 text-lg font-semibold text-on-accent transition hover:bg-accent-hover">
            Write a review on Google <ArrowRight aria-hidden size={18} weight="bold" />
          </a>
        </div>
      ) : (
      <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.reviews.map((r) => (
          <li key={r.author + r.when} className="flex flex-col gap-4 rounded-3xl bg-card p-7 shadow-soft ring-1 ring-line">
            <Stars n={r.rating} />
            <p className="line-clamp-[8] text-base">{r.text}</p>
            <p className="mt-auto flex items-center gap-3 text-base">
              {r.photo && <img src={r.photo} alt="" width={36} height={36} referrerPolicy="no-referrer" className="size-9 rounded-full" />}
              <span>
                {r.authorUrl ? (
                  <a href={r.authorUrl} target="_blank" rel="noopener" className="font-semibold underline">{r.author}</a>
                ) : (
                  <span className="font-semibold">{r.author}</span>
                )}
                <span className="block text-muted">{r.when} on Google</span>
              </span>
            </p>
          </li>
        ))}
      </ul>
      )}
    </section>
  );
}

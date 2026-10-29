import { ArrowLeft, Phone } from "@phosphor-icons/react/dist/ssr";
import { site, tel } from "@/lib/site";

export default function NotFound() {
  return (
    <main id="main" className="mx-auto max-w-3xl px-4 pt-36 pb-28 sm:px-6 sm:pt-44">
      <h1 className="text-5xl font-bold md:text-6xl">We couldn&apos;t find that page.</h1>
      <p className="mt-6 max-w-[46ch] text-xl text-muted">
        The link may be old. Everything about the home, our care and how to visit is on the home page.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
        <a href="/" className="press inline-flex min-h-12 items-center gap-3 rounded-full bg-accent px-6 text-lg font-semibold text-on-accent hover:bg-accent-hover">
          <ArrowLeft aria-hidden size={18} weight="bold" /> Back to the home page
        </a>
        <a href={tel(site.phones.office)} className="inline-flex min-h-12 items-center gap-2 text-lg font-semibold underline underline-offset-8">
          <Phone aria-hidden size={20} weight="light" /> {site.phones.office}
        </a>
      </div>
    </main>
  );
}

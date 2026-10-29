import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChatText, Check, Phone } from "@phosphor-icons/react/dist/ssr";
import { services, type ServiceSlug } from "@/lib/care";
import { site, tel, fullAddress } from "@/lib/site";

export const generateStaticParams = () => Object.keys(services).map((slug) => ({ slug }));

const find = (slug: string) => (slug in services ? services[slug as ServiceSlug] : undefined);

export async function generateMetadata({ params }: PageProps<"/care/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = find(slug);
  if (!s) return {};
  return { title: `${s.title} in Mountlake Terrace, WA`, description: s.description, alternates: { canonical: `/care/${slug}` } };
}

export default async function Service({ params }: PageProps<"/care/[slug]">) {
  const { slug } = await params;
  const s = find(slug);
  if (!s) notFound();

  return (
    <main id="main" className="mx-auto max-w-3xl px-4 pt-32 pb-28 sm:px-6 sm:pt-40">
      <h1 className="text-4xl font-bold md:text-5xl">{s.title}</h1>
      <p className="mt-6 text-xl text-muted">{s.intro}</p>

      <h2 className="mt-14 text-2xl font-bold">What&apos;s included</h2>
      <ul className="mt-6 grid gap-4 text-lg">
        {s.included.map((i) => (
          <li key={i} className="flex gap-3">
            <Check aria-hidden size={20} weight="bold" className="mt-1 shrink-0 text-accent" /> {i}
          </li>
        ))}
      </ul>
      <p className="mt-10 text-muted">{s.closing}</p>

      <div className="mt-14 rounded-3xl bg-card p-7 ring-1 ring-line">
        <p className="font-display text-2xl font-semibold tracking-tight">Come see the home</p>
        <p className="mt-2 text-muted">{fullAddress}</p>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a href={tel(site.phones.office)} className="inline-flex min-h-12 items-center gap-3 rounded-full bg-accent px-6 text-lg font-semibold text-on-accent transition hover:bg-accent-hover">
            <Phone aria-hidden size={20} weight="bold" /> Call {site.phones.office}
          </a>
          <a href={`sms:+1${site.phones.text.replace(/\D/g, "")}`} className="inline-flex min-h-12 items-center gap-2 text-lg font-semibold underline underline-offset-8">
            <ChatText aria-hidden size={20} weight="light" /> Text {site.phones.text}
          </a>
        </div>
      </div>
    </main>
  );
}

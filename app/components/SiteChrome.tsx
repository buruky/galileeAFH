import Image from "next/image";
import { Phone } from "@phosphor-icons/react/dist/ssr";
import { MobileMenu } from "@/app/components/MobileMenu";
import { Year } from "@/app/components/Year";
import { services } from "@/lib/care";
import { site, tel, fullAddress } from "@/lib/site";
import logo from "@/public/images/logo.webp";

function Logo({ className }: { className: string }) {
  return <Image src={logo} alt={site.name} className={className} preload />;
}

const links = [["Care", "/#care"], ["Our home", "/#home"], ["FAQ", "/#faq"], ["Contact", "/#contact"]];

// Shared by every page, so hash links point at the home page ("/#care").
export function SiteHeader() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-card focus:px-4 focus:py-2">
        Skip to content
      </a>

      {/* Floating island nav */}
      <header className="fixed inset-x-0 top-[max(0.75rem,env(safe-area-inset-top))] z-40 px-3 sm:top-[max(1.25rem,env(safe-area-inset-top))]">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-3 rounded-full bg-card/85 py-2 pr-2 pl-5 shadow-soft ring-1 ring-line backdrop-blur-xl">
          <a href="/" aria-label={`${site.name}, home`} className="shrink-0">
            <Logo className="h-9 w-auto sm:h-11" />
          </a>
          <nav aria-label="Main" className="hidden items-center gap-8 text-base lg:flex">
            {links.map(([l, h]) => (
              <a key={h} href={h} className="text-muted transition-colors hover:text-ink">{l}</a>
            ))}
          </nav>
          <div className="flex items-center gap-1.5">
            <a href={tel(site.phones.office)} className="press inline-flex h-12 items-center gap-2 rounded-full px-3.5 text-base font-semibold whitespace-nowrap hover:bg-shell sm:px-4">
              <Phone aria-hidden size={20} weight="light" />
              <span className="sr-only md:not-sr-only">{site.phones.office}</span>
            </a>
            {/* Below sm the tour link lives in the menu, so the island fits a 360px phone. */}
            <a href="/#tour" className="press hidden h-12 items-center rounded-full bg-accent px-5 text-base font-semibold whitespace-nowrap text-on-accent hover:bg-accent-hover sm:inline-flex">
              Schedule a tour
            </a>
            <MobileMenu links={links} />
          </div>
        </div>
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 text-base sm:px-6 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo className="h-14 w-auto" />
        </div>
        <address className="grid content-start text-muted not-italic md:col-span-5">
          <span className="text-ink">{fullAddress}</span>
          <span>Office <a href={tel(site.phones.office)} className="inline-block py-1 underline">{site.phones.office}</a></span>
          <span>Cell <a href={tel(site.phones.cell)} className="inline-block py-1 underline">{site.phones.cell}</a></span>
          <span>Text/Zoom {site.phones.text}</span>
          <span>Fax {site.phones.fax}</span>
          {site.licenseNumber && <span>WA AFH License #{site.licenseNumber}</span>}
        </address>
        <div className="grid content-start text-muted md:col-span-3 md:justify-items-end">
          <a href="/#tour" className="py-1 underline">Schedule a tour</a>
          {Object.entries(services).map(([slug, { title }]) => (
            <a key={slug} href={`/care/${slug}`} className="py-1 underline">{title}</a>
          ))}
          <a href="/privacy" className="py-1 underline">Privacy</a>
        </div>
      </div>

      {/* BK Web Studios credit, inline style (copyright left, credit right) */}
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-5 text-sm text-muted sm:px-6">
          <span>
            © <Year /> {site.name}. All rights reserved.
          </span>
          <span className="text-[0.8em] opacity-70 transition-opacity duration-200 hover:opacity-100">
            Site by{" "}
            <a href="https://www.bkwebstudios.com" target="_blank" rel="noopener nofollow" className="underline underline-offset-2">
              BK Web Studios
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

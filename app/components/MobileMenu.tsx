"use client";

import { List } from "@phosphor-icons/react/dist/ssr";
import { site, tel } from "@/lib/site";

// Native popover: light-dismiss, Esc and focus return come from the browser.
export function MobileMenu({ links }: { links: string[][] }) {
  return (
    <>
      <button
        type="button"
        popoverTarget="menu"
        className="press grid size-12 place-items-center rounded-full hover:bg-shell lg:hidden"
      >
        <List aria-hidden size={24} weight="light" />
        <span className="sr-only">Menu</span>
      </button>
      <nav
        id="menu"
        popover="auto"
        aria-label="Menu"
        // Hash links scroll the page underneath, so close the menu on any link tap.
        onClick={(e) => (e.target as HTMLElement).closest("a") && e.currentTarget.hidePopover()}
        className="menu rounded-3xl bg-card p-3 text-lg shadow-lift ring-1 ring-line"
      >
        <ul className="grid">
          {links.map(([l, h]) => (
            <li key={h}>
              <a href={h} className="block rounded-2xl px-4 py-3 font-display font-semibold tracking-tight hover:bg-shell">{l}</a>
            </li>
          ))}
        </ul>
        <div className="mt-2 grid gap-2 border-t border-line pt-3">
          <a href="/#tour" className="press inline-flex h-12 items-center justify-center rounded-full bg-accent px-5 font-semibold text-on-accent hover:bg-accent-hover">
            Schedule a tour
          </a>
          <a href={tel(site.phones.office)} className="inline-flex h-12 items-center justify-center rounded-full font-semibold underline underline-offset-4">
            Call {site.phones.office}
          </a>
        </div>
      </nav>
    </>
  );
}

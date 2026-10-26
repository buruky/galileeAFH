"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef, useState } from "react";
import type { Icon } from "@phosphor-icons/react";
import { CookingPot, Pill, ShieldCheck, Stethoscope, UsersThree } from "@phosphor-icons/react/dist/ssr";

export type CareItem = {
  id: string;
  title: string;
  text: string;
  photo: StaticImageData;
  alt: string;
};

const icons: Record<string, Icon> = {
  safety: ShieldCheck,
  medication: Pill,
  activities: UsersThree,
  coordinated: Stethoscope,
  meals: CookingPot,
};

export function CareTabs({ items }: { items: CareItem[] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const item = items[active];

  // Roving focus per the WAI-ARIA tabs pattern.
  const onKey = (e: React.KeyboardEvent) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    const next = (active + step + items.length) % items.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
      <div
        role="tablist"
        aria-label="Daily care"
        aria-orientation="vertical"
        onKeyDown={onKey}
        className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:col-span-5 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0"
      >
        {items.map((it, i) => {
          const Icon = icons[it.id];
          const on = i === active;
          return (
            <button
              key={it.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              id={`tab-${it.id}`}
              aria-selected={on}
              aria-controls={`panel-${it.id}`}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              className={`group flex shrink-0 items-center gap-4 rounded-full px-5 py-3 text-left whitespace-nowrap transition duration-500 ease-out-expo lg:rounded-3xl lg:px-6 lg:py-5 lg:whitespace-normal ${
                on ? "bg-card text-ink shadow-soft ring-1 ring-line" : "text-muted hover:bg-shell hover:text-ink"
              }`}
            >
              <Icon aria-hidden size={26} weight={on ? "regular" : "light"} className={on ? "text-accent" : ""} />
              <span className="font-display text-lg font-semibold tracking-tight lg:text-2xl">{it.title}</span>
            </button>
          );
        })}
      </div>

      <div
        key={item.id}
        role="tabpanel"
        id={`panel-${item.id}`}
        aria-labelledby={`tab-${item.id}`}
        className="tab-in lg:col-span-7"
      >
        <div className="rounded-4xl bg-shell p-2 ring-1 ring-line">
          <Image
            src={item.photo}
            alt={item.alt}
            placeholder="blur"
            sizes="(min-width: 1024px) 640px, 100vw"
            className="aspect-4/3 w-full rounded-3xl object-cover"
          />
        </div>
        <h3 className="mt-8 text-3xl font-semibold md:text-4xl">{item.title}</h3>
        <p className="mt-3 max-w-[48ch] text-lg text-muted">{item.text}</p>
      </div>
    </div>
  );
}

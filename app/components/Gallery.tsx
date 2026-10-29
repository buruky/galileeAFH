"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";

export type Photo = { src: StaticImageData; alt: string; label: string };

// Room viewer: one large photo, labeled thumbnails to switch rooms.
export function Gallery({ photos }: { photos: Photo[] }) {
  const [i, setI] = useState(0);
  const p = photos[i];
  const go = (d: number) => setI((i + d + photos.length) % photos.length);

  const arrow =
    "grid size-12 place-items-center rounded-full bg-card/90 text-ink shadow-lift press hover:bg-card";

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Rooms in the home"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
    >
      <figure className="rounded-4xl bg-shell p-2 ring-1 ring-line">
        <div className="relative aspect-4/3 overflow-hidden rounded-3xl bg-[#e9e4dc] sm:aspect-16/10">
          <Image
            key={p.label}
            src={p.src}
            alt={p.alt}
            fill
            placeholder="blur"
            sizes="(min-width: 1152px) 1120px, 100vw"
            className={`tab-in ${p.src.height > p.src.width ? "object-contain" : "object-cover"}`}
          />
          <div className="absolute right-4 bottom-4 flex gap-2">
            <button type="button" onClick={() => go(-1)} className={arrow}>
              <ArrowLeft aria-hidden size={20} weight="bold" />
              <span className="sr-only">Previous room</span>
            </button>
            <button type="button" onClick={() => go(1)} className={arrow}>
              <ArrowRight aria-hidden size={20} weight="bold" />
              <span className="sr-only">Next room</span>
            </button>
          </div>
        </div>
        <figcaption aria-live="polite" className="flex flex-col gap-1 px-4 pt-4 pb-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
          <span className="font-display text-xl font-semibold tracking-tight">{p.label}</span>
          <span className="text-base text-muted">{p.alt}</span>
        </figcaption>
      </figure>

      <ul className="no-scrollbar mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-2">
        {photos.map((t, k) => (
          <li key={t.label} className="shrink-0 snap-start">
            <button
              type="button"
              onClick={() => setI(k)}
              aria-pressed={k === i}
              className={`block w-36 text-left transition duration-500 ease-out-expo sm:w-44 ${k === i ? "" : "opacity-60 hover:opacity-100"}`}
            >
              <Image
                src={t.src}
                alt=""
                placeholder="blur"
                sizes="176px"
                className={`aspect-4/3 w-full rounded-2xl object-cover ring-2 transition ${k === i ? "ring-accent" : "ring-transparent"}`}
              />
              <span className="mt-2 block text-base font-semibold">{t.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

import type { Metadata } from "next";
import { site, tel } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy", alternates: { canonical: "/privacy" } };

export default function Privacy() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <a href="/" className="font-semibold text-accent underline">Back to home</a>
      <h1 className="mt-8 text-4xl font-bold">Privacy</h1>
      <div className="mt-8 grid gap-5 text-muted [&_h2]:mt-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-ink">
        <p>
          {site.name} respects your privacy. This page explains what we collect through this website and how we use it.
        </p>
        <h2>What we collect</h2>
        <p>
          This website has no forms and does not ask for your personal information. If you call, text or email us, we
          use what you share only to talk with you about a visit or about care at our home. We do not sell or share it
          with marketers.
        </p>
        <h2>Google reviews</h2>
        <p>
          The reviews shown on our home page come from Google. Reviewer names, photos and text are provided by Google
          and are subject to the <a href="https://policies.google.com/privacy" className="underline">Google Privacy Policy</a>.
        </p>
        <h2>Contact</h2>
        <p>
          Questions about privacy? Call{" "}
          <a href={tel(site.phones.office)} className="underline">{site.phones.office}</a> or email{" "}
          <a href={`mailto:${site.emails[0]}`} className="underline">{site.emails[0]}</a>.
        </p>
      </div>
    </main>
  );
}

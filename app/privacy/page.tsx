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
          When you use the tour request form, we receive the details you enter: your name, phone number, and optionally
          your email, who the care is for, a preferred day, and your message.
        </p>
        <h2>How we use it</h2>
        <p>
          We use this information only to contact you about a visit or about care at our home. We do not sell or share
          it with marketers. Form messages are delivered to our email through a secure email service.
        </p>
        <h2>Health information</h2>
        <p>
          Please don't include detailed medical information in the form. We are happy to discuss care needs by phone or
          in person.
        </p>
        <h2>Contact</h2>
        <p>
          To ask about or remove information you've sent us, call{" "}
          <a href={tel(site.phones.office)} className="underline">{site.phones.office}</a> or email{" "}
          <a href={`mailto:${site.emails[0]}`} className="underline">{site.emails[0]}</a>.
        </p>
      </div>
    </main>
  );
}

"use client";

import { useActionState } from "react";
import { ArrowRight, CheckCircle, WarningCircle } from "@phosphor-icons/react/dist/ssr";
import { requestTour, type TourState } from "@/app/actions";
import { relationships, type TourFields } from "@/lib/tour";
import { site, tel } from "@/lib/site";

const input =
  "w-full rounded-2xl border border-line bg-bg px-4 py-3.5 text-ink placeholder:text-muted/80 transition-colors duration-300 ease-out-expo hover:border-ink/25 focus:border-accent focus:outline-none focus-visible:outline-3 focus-visible:outline-accent aria-invalid:border-red-700";

function Field({
  name,
  label,
  hint,
  error,
  children,
}: {
  name: keyof TourFields;
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <label htmlFor={name} className="font-semibold">
        {label}
        {hint && <span className="font-normal text-muted"> {hint}</span>}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} className="flex items-start gap-1.5 text-base text-red-800">
          <WarningCircle aria-hidden className="mt-1 shrink-0" size={18} weight="bold" />
          {error}
        </p>
      )}
    </div>
  );
}

export function TourForm() {
  const [state, action, pending] = useActionState<TourState, FormData>(requestTour, { status: "idle" });
  const e = state.errors ?? {};
  const v = state.fields;
  const aria = (n: keyof TourFields) =>
    e[n] ? { "aria-invalid": true as const, "aria-describedby": `${n}-error` } : {};

  if (state.status === "sent") {
    return (
      <div role="status" className="rounded-4xl bg-shell p-2 ring-1 ring-line">
        <div className="rounded-3xl bg-card p-8 shadow-soft sm:p-10">
        <CheckCircle aria-hidden size={40} weight="light" className="text-accent" />
        <h3 className="mt-4 text-2xl font-bold">Thank you. We'll call you soon.</h3>
        <p className="mt-2 text-muted">
          We usually reply within one business day. If it's urgent, call{" "}
          <a className="font-semibold text-accent underline" href={tel(site.phones.office)}>
            {site.phones.office}
          </a>
          .
        </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-4xl bg-shell p-2 ring-1 ring-line">
    <form action={action} noValidate className="relative grid gap-5 rounded-3xl bg-card p-6 shadow-soft sm:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="name" label="Your name" error={e.name}>
          <input id="name" name="name" autoComplete="name" required defaultValue={v?.name} className={input} {...aria("name")} />
        </Field>
        <Field name="phone" label="Phone" error={e.phone}>
          <input id="phone" name="phone" type="tel" autoComplete="tel" required defaultValue={v?.phone} className={input} {...aria("phone")} />
        </Field>
      </div>
      <Field name="email" label="Email" hint="(optional)" error={e.email}>
        <input id="email" name="email" type="email" autoComplete="email" defaultValue={v?.email} className={input} {...aria("email")} />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="relationship" label="Who is the care for?">
          <select id="relationship" name="relationship" defaultValue={v?.relationship ?? ""} className={input}>
            <option value="">Choose one</option>
            {relationships.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </Field>
        <Field name="day" label="Preferred day" hint="(optional)">
          <input id="day" name="day" type="date" defaultValue={v?.day} className={input} />
        </Field>
      </div>
      <Field name="message" label="Anything we should know?" hint="(optional)">
        <textarea id="message" name="message" rows={4} defaultValue={v?.message} className={input} />
      </Field>

      {/* Honeypot for bots, hidden from people and screen readers */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label>
          Company <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {state.message && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-red-900">
          {state.message}
        </p>
      )}

      <button
        disabled={pending}
        className="group inline-flex min-h-14 items-center justify-between gap-4 rounded-full bg-accent py-2 pr-2 pl-7 text-lg font-semibold text-on-accent transition duration-500 ease-out-expo hover:bg-accent-hover active:scale-[0.98] disabled:opacity-60"
      >
        {pending ? "Sending..." : "Schedule a tour"}
        <span className="grid size-10 place-items-center rounded-full bg-on-accent/15 transition duration-500 ease-out-expo group-hover:translate-x-1 group-hover:scale-105">
          <ArrowRight aria-hidden size={18} weight="bold" />
        </span>
      </button>
      <p className="text-base text-muted">
        We only use this to contact you about your visit. See our{" "}
        <a href="/privacy" className="underline">
          privacy policy
        </a>
        .
      </p>
    </form>
    </div>
  );
}

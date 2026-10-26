"use server";

import { Resend } from "resend";
import { parseTour, type TourErrors, type TourFields } from "@/lib/tour";
import { site } from "@/lib/site";

// fields are echoed back on error so the form can refill after React resets it.
export type TourState = {
  status: "idle" | "sent" | "error";
  errors?: TourErrors;
  message?: string;
  fields?: TourFields;
};

export async function requestTour(_prev: TourState, form: FormData): Promise<TourState> {
  // Honeypot: real visitors never see or fill this field.
  if (form.get("company")) return { status: "sent" };

  const { fields, errors } = parseTour(form);
  if (Object.keys(errors).length) return { status: "error", errors, fields };

  const text = [
    `Name: ${fields.name}`,
    `Phone: ${fields.phone}`,
    `Email: ${fields.email || "(not given)"}`,
    `Care is for: ${fields.relationship || "(not given)"}`,
    `Preferred day: ${fields.day || "(not given)"}`,
    "",
    fields.message || "(no message)",
  ].join("\n");

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[tour request, RESEND_API_KEY not set]\n" + text);
      return { status: "sent" };
    }
    return failed(fields);
  }

  const { error } = await new Resend(key).emails.send({
    from: process.env.TOUR_EMAIL_FROM ?? "Galilee AFH Website <onboarding@resend.dev>",
    to: process.env.TOUR_EMAIL_TO ?? site.emails[0],
    replyTo: fields.email || undefined,
    subject: `Tour request from ${fields.name}`,
    text,
  });
  if (error) {
    console.error("Resend error", error);
    return failed(fields);
  }
  return { status: "sent" };
}

const failed = (fields: TourFields): TourState => ({
  status: "error",
  fields,
  message: `Sorry, your request didn't go through. Please call us at ${site.phones.office}.`,
});

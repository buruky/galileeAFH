export type TourFields = {
  name: string;
  phone: string;
  email: string;
  relationship: string;
  day: string;
  message: string;
};

export type TourErrors = Partial<Record<keyof TourFields, string>>;

export const relationships = [
  "My parent",
  "My spouse or partner",
  "Myself",
  "A client or patient",
  "Someone else",
];

const str = (v: FormDataEntryValue | null, max: number) =>
  (typeof v === "string" ? v.trim() : "").slice(0, max);

export function parseTour(form: FormData): { fields: TourFields; errors: TourErrors } {
  const fields: TourFields = {
    name: str(form.get("name"), 100),
    phone: str(form.get("phone"), 30),
    email: str(form.get("email"), 200),
    relationship: str(form.get("relationship"), 50),
    day: str(form.get("day"), 40),
    message: str(form.get("message"), 2000),
  };
  const errors: TourErrors = {};
  if (!fields.name) errors.name = "Please enter your name.";
  if (fields.phone.replace(/\D/g, "").length < 10)
    errors.phone = "Please enter a phone number with area code, like 425-555-0123.";
  if (fields.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
    errors.email = "That email doesn't look right. Check it, or leave it blank.";
  if (fields.relationship && !relationships.includes(fields.relationship))
    fields.relationship = "";
  return { fields, errors };
}

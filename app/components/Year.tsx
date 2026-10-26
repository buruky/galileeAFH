"use client";

import { useEffect, useState } from "react";

// Static fallback for the prerendered HTML, then the visitor's current year.
export function Year() {
  const [year, setYear] = useState(2026);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return <>{year}</>;
}

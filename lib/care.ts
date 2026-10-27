// Service pages at /care/[slug]. Only claims the client has made (old site, Word doc); no invented numbers.
export const services = {
  "memory-care": {
    title: "Memory care",
    description:
      "Memory care for Alzheimer's and dementia in a small adult family home in Mountlake Terrace, WA. Familiar caregivers, calm surroundings, 24/7 staff.",
    intro:
      "A large facility can be overwhelming for someone living with Alzheimer's or dementia. Our home is small and calm, and your loved one sees the same familiar faces every day.",
    included: [
      "Caregivers with dementia experience, on site around the clock",
      "The same caregivers day to day, so routines and faces stay familiar",
      "Calm, home-like surroundings and a round-the-clock security system",
      "Help with bathing, dressing, incontinence care and moving around",
      "Medication given on time and tracked carefully",
      "Home-cooked meals made with each resident's preferences in mind",
    ],
    closing:
      "Every resident has a personalized care plan, reviewed regularly so support keeps pace as memory needs change.",
  },
  "hospice-care": {
    title: "Hospice and end-of-life care",
    description:
      "Hospice and end-of-life care in a warm adult family home in Mountlake Terrace, WA. Comfort, dignity and 24/7 caregivers alongside your hospice team.",
    intro:
      "When the focus turns to comfort, your loved one can spend this time in a real home, with caregivers who know them and family welcome to be close.",
    included: [
      "Caregivers on site 24/7, so no one is alone",
      "We work alongside the resident's hospice team and physicians",
      "Regular turning and repositioning for comfort",
      "Medication management with careful attention",
      "Private and semi-private furnished rooms, with call buttons",
      "Family involvement and regular communication",
    ],
    closing: "We keep families informed and involved, and we focus on comfort and dignity every day.",
  },
  "respite-care": {
    title: "Respite care",
    description:
      "Short-term respite stays in Mountlake Terrace, WA. Your loved one gets 24/7 care in a small adult family home while you rest, travel or recover.",
    intro:
      "Caring for a parent or spouse at home is a lot. A respite stay gives your loved one full care in our home while you take the break you need.",
    included: [
      "Short-term stays with the same 24/7 care our long-term residents receive",
      "Help with bathing, dressing, transfers and getting around",
      "Medication given on time while you're away",
      "Home-cooked meals and daily activities",
      "A furnished room, with housekeeping included",
      "A chance to get to know the home if longer-term care is ahead",
    ],
    closing: "Call us to check availability for the dates you need.",
  },
} as const;

export type ServiceSlug = keyof typeof services;

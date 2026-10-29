import Image from "next/image";
import { ArrowRight, ChatText, Check, Envelope, ForkKnife, Gift, MapPin, NavigationArrow, Phone } from "@phosphor-icons/react/dist/ssr";
import { CareTabs } from "@/app/components/CareTabs";
import { Gallery } from "@/app/components/Gallery";
import { Reviews } from "@/app/components/Reviews";
import { site, tel, fullAddress, directionsUrl } from "@/lib/site";
// Hero mood photo of the region, not the home: Alex Stone on Unsplash (Unsplash License),
// Kingston, WA, https://unsplash.com/photos/hbhabbRFSBU
import heroLake from "@/public/images/hero-lake.webp";
import bathroom from "@/public/images/bathroom-accessible-1600.webp";
import bedroom6 from "@/public/images/bedroom-6-1600.webp";
import bedroom4 from "@/public/images/bedroom-4-800.webp";
import diningKitchen from "@/public/images/dining-kitchen-1600.webp";
import diningLiving from "@/public/images/dining-living-1600.webp";

const care = [
  {
    id: "safety",
    title: "Safety and supervision",
    text: "Round-the-clock caregiving staff, so your loved one is never alone. The home is set up for safety, with call buttons, a round-the-clock security system, a curbless shower, grab bars and wide doorways.",
    photo: bathroom,
    alt: "Accessible bathroom with a curbless shower, shower chair and grab bars",
  },
  {
    id: "medication",
    title: "Medication management",
    text: "We handle every prescription with precision and careful attention, so doses are given on time and nothing is missed.",
    photo: bedroom4,
    alt: "Bedroom with an adjustable bed, overbed table and TV",
  },
  {
    id: "activities",
    title: "Activities and connection",
    text: "Daily programs keep residents engaged, active, and socially connected in shared living spaces, from cards and chess to social and wellness activities.",
    photo: diningLiving,
    alt: "Dining area and living room with recliners and sofas",
  },
  {
    id: "coordinated",
    title: "Coordinated care",
    text: "We work with physicians and specialists for continuity of care and proper health management.",
    photo: bedroom6,
    alt: "A bright bedroom with fresh flowers and a view of the garden",
  },
  {
    id: "meals",
    title: "Home-cooked meals",
    text: "Nutritious food made fresh in our kitchen every day, with each resident's preferences in mind. And every weekend, residents choose a meal from their favorite American restaurants.",
    photo: diningKitchen,
    alt: "Dining table set with colorful plates in front of the open kitchen",
  },
];

const levels = [
  { title: "Personal care", text: "Help with bathing, dressing, incontinence care, transfers and getting around." },
  { title: "Memory care", text: "Calm surroundings and the same familiar caregivers for residents living with Alzheimer's or dementia.", href: "/care/memory-care" },
  { title: "Hospice and end-of-life care", text: "Comfort, dignity and company in the final chapter, alongside the resident's hospice team.", href: "/care/hospice-care" },
  { title: "Mental health care", text: "Steady routines and attentive supervision for residents with mental health needs." },
  { title: "Turning and repositioning", text: "Regular, gentle repositioning for residents who spend much of the day in bed or a chair." },
  { title: "Respite stays", text: "Short-term stays that give family caregivers time to rest, travel, or recover.", href: "/care/respite-care" },
] as { title: string; text: string; href?: string }[];

const rooms = [
  { src: bedroom6, label: "Bedroom", alt: "Garden view and fresh flowers" },
  { src: diningKitchen, label: "Kitchen and dining", alt: "Where meals are made fresh daily" },
  { src: diningLiving, label: "Living room", alt: "Space to relax together" },
  { src: bathroom, label: "Bathroom", alt: "Curbless shower and grab bars" },
  { src: bedroom4, label: "Second bedroom", alt: "Adjustable bed and overbed table" },
];

const faqs = [
  {
    q: "Can I tour the home before deciding?",
    a: "Absolutely. We encourage future residents and their families to schedule a private tour, sample a meal, and meet our care team to see daily life here firsthand.",
  },
  {
    q: "What levels of care do you provide?",
    a: "Personal care, memory care for Alzheimer's and dementia, hospice and end-of-life care, mental health care, turning and repositioning care, and short-term respite stays. Every resident has a personalized care plan that we review regularly, so the support changes as their needs change.",
  },
  {
    q: "How do I schedule a tour?",
    a: `Call us at ${site.phones.office}, or text or Zoom us at ${site.phones.text}. We'll find a time that works for your family.`,
  },
];

const shell = "rounded-4xl bg-shell p-2 ring-1 ring-line";
const delay = (d: number) => ({ "--d": d }) as React.CSSProperties;

function PrimaryCta() {
  return (
    <a
      href="#tour"
      className="group inline-flex min-h-14 items-center gap-4 rounded-full bg-accent py-2 pr-2 pl-7 text-lg font-semibold whitespace-nowrap text-on-accent press hover:bg-accent-hover"
    >
      Schedule a tour
      <span className="grid size-10 place-items-center rounded-full bg-on-accent/15 transition duration-500 ease-out-expo group-hover:translate-x-1 group-hover:scale-105">
        <ArrowRight aria-hidden size={18} weight="bold" />
      </span>
    </a>
  );
}

export default function Home() {
  return (
    <>
      <div aria-hidden className="scroll-progress" />
      <main id="main">
        {/* Hero: oversized headline on the page, photo framed below as a window, visit card docked on it */}
        <section className="pt-28 sm:pt-36">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h1 className="enter text-[clamp(2.75rem,7vw,6rem)] leading-[0.95] font-bold">
              Comfort and care,<br className="hidden md:block" /> <span className="text-accent">right at home.</span>
            </h1>
            <div className="enter mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between" style={delay(1)}>
              <p className="max-w-[38ch] text-xl text-muted">
                A small adult family home in Mountlake Terrace where your loved one is known, safe, and cared for.
              </p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <PrimaryCta />
                <a href={tel(site.phones.office)} className="inline-flex min-h-12 items-center gap-2 text-lg font-semibold underline decoration-line underline-offset-8 transition-colors hover:decoration-ink">
                  <Phone aria-hidden size={20} weight="light" /> {site.phones.office}
                </a>
              </div>
            </div>
          </div>

          <div className="relative mx-auto mt-14 max-w-[1400px] px-3 sm:px-6">
            <div className="enter relative h-[min(52vh,30rem)] min-h-80 overflow-hidden rounded-4xl sm:rounded-[2.75rem] lg:h-[620px]" style={delay(2)}>
              <Image
                src={heroLake}
                alt="Homes among tall evergreens beside a calm lake in western Washington"
                fill
                preload
                placeholder="blur"
                sizes="(min-width: 1400px) 1352px, 100vw"
                className="hero-photo object-cover object-[60%_50%] brightness-[1.12] saturate-[1.08]"
              />
            </div>
            <aside
              className="enter relative mx-1 -mt-10 rounded-3xl bg-card p-6 shadow-lift ring-1 ring-line sm:mx-6 sm:p-7 lg:absolute lg:right-14 lg:bottom-10 lg:mx-0 lg:mt-0 lg:w-[360px]"
              style={delay(3)}
            >
              <p className="font-display text-xl font-semibold tracking-tight">Visit us in Mountlake Terrace</p>
              <p className="mt-1 text-base text-muted">{site.address.street}</p>
              <ul className="mt-5 grid gap-2.5 text-base">
                {["Caregivers on site 24/7", "Over four years of care", "Memory and mental health care"].map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <Check aria-hidden size={18} weight="bold" className="shrink-0 text-accent" /> {f}
                  </li>
                ))}
                {site.licenseNumber && (
                  <li className="flex items-center gap-3">
                    <Check aria-hidden size={18} weight="bold" className="shrink-0 text-accent" /> WA AFH #{site.licenseNumber}
                  </li>
                )}
              </ul>
              <a href={directionsUrl} className="mt-6 inline-flex items-center gap-2 font-semibold text-accent underline underline-offset-4">
                <NavigationArrow aria-hidden size={18} weight="bold" /> Get directions
              </a>
            </aside>
          </div>
        </section>

        {/* About: centered statement, then a descending strip of real photos */}
        <section className="reveal mx-auto max-w-6xl px-4 py-28 sm:px-6 lg:py-40">
          <h2 className="sr-only">About Galilee</h2>
          <p className="ink-in mx-auto max-w-[26ch] text-center font-display text-3xl leading-[1.2] font-medium tracking-[-0.02em] md:text-5xl">
            For over four years, we&apos;ve cared for people the way family would.
          </p>
          <p className="mx-auto mt-8 max-w-[58ch] text-center text-lg text-muted">
            Compassionate caregivers, proven care practices, nutritious meals, and daily activities that support healthy
            aging. We partner with healthcare providers who are available 24/7, and our caregivers are on site around
            the clock. Private and semi-private rooms are furnished, and housekeeping is included.
          </p>
          <div className="mt-16 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-12 md:items-start">
            <div className={`${shell} parallax col-span-2 md:col-span-5`} style={{ "--y": "20px" } as React.CSSProperties}>
              <Image src={bedroom6} alt="A bright bedroom with fresh flowers and a garden view" placeholder="blur" sizes="(min-width: 768px) 460px, 100vw" className="aspect-4/5 w-full rounded-3xl object-cover" />
            </div>
            <div className={`${shell} parallax md:col-span-4 md:mt-20`} style={{ "--y": "60px" } as React.CSSProperties}>
              <Image src={diningLiving} alt="The shared dining and living room" placeholder="blur" sizes="(min-width: 768px) 370px, 50vw" className="aspect-3/4 w-full rounded-3xl object-cover" />
            </div>
            <div className={`${shell} parallax md:col-span-3 md:mt-40`} style={{ "--y": "100px" } as React.CSSProperties}>
              <Image src={diningKitchen} alt="The open kitchen with the table set for a meal" placeholder="blur" sizes="(min-width: 768px) 280px, 50vw" className="aspect-3/4 w-full rounded-3xl object-cover md:aspect-square" />
            </div>
          </div>
        </section>

        {/* Services: tabs with a photo panel */}
        <section id="care" className="reveal mx-auto max-w-6xl px-4 pb-28 sm:px-6 lg:pb-40">
          <h2 className="max-w-[18ch] text-4xl font-bold md:text-5xl">Everything daily care should include</h2>
          <p className="mt-5 mb-12 max-w-[52ch] text-muted">Each resident gets a personalized care plan, reviewed regularly as needs change.</p>
          <CareTabs items={care} />
        </section>

        {/* Levels of care: two-column index */}
        <section className="reveal mx-auto max-w-6xl px-4 pb-28 sm:px-6 lg:pb-40">
          <h2 className="text-4xl font-bold md:text-5xl">Levels of care</h2>
          <ul className="mt-14 grid gap-x-16 md:grid-cols-2">
            {levels.map(({ title, text, href }) => (
              <li key={title} className="reveal flex flex-col gap-3 border-t border-line py-9">
                <h3 className="text-2xl font-semibold md:text-3xl">{title}</h3>
                <p className="max-w-[46ch] text-muted">{text}</p>
                {href && (
                  <a href={href} className="mt-1 inline-flex w-fit items-center gap-2 font-semibold text-accent underline underline-offset-4">
                    Learn more <span className="sr-only">about {title.toLowerCase()}</span> <ArrowRight aria-hidden size={16} weight="bold" />
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* Weekend meals: the one evergreen feature band on the page */}
        <section className="reveal mx-auto max-w-[1400px] px-3 pb-28 sm:px-6 lg:pb-40">
          <div className="relative isolate overflow-hidden rounded-4xl px-6 py-20 text-on-accent sm:rounded-[2.75rem] sm:px-12 lg:py-28">
            <Image
              src={diningKitchen}
              alt=""
              fill
              placeholder="blur"
              sizes="(min-width: 1400px) 1352px, 100vw"
              className="parallax -z-10 scale-110 object-cover"
              style={{ "--y": "30px" } as React.CSSProperties}
            />
            <div aria-hidden className="absolute inset-0 -z-10 bg-accent/80" />
            <div className="mx-auto max-w-3xl text-center">
              <ForkKnife aria-hidden size={36} weight="light" className="mx-auto" />
              <h2 className="mt-6 text-4xl font-bold md:text-6xl">Every weekend, residents pick the restaurant.</h2>
              <p className="mx-auto mt-6 max-w-[48ch] text-lg text-on-accent/90">
                Home-cooked meals all week, made with each resident&apos;s preferences in mind. On weekends, everyone
                chooses a meal from their favorite American restaurant.
              </p>
            </div>
          </div>
        </section>

        {/* Room viewer */}
        <section id="home" className="reveal mx-auto max-w-6xl px-4 pb-28 sm:px-6 lg:pb-40">
          <h2 className="text-4xl font-bold md:text-5xl">Take a look inside</h2>
          <p className="mt-5 mb-10 max-w-[52ch] text-muted">Pick a room to see it larger.</p>
          <Gallery photos={rooms} />
        </section>

        {/* FAQ: answers shown openly, no accordion */}
        <section id="faq" className="reveal mx-auto grid max-w-6xl gap-10 px-4 pb-28 sm:px-6 lg:grid-cols-12 lg:pb-40">
          <h2 className="text-4xl font-bold md:text-5xl lg:sticky lg:top-28 lg:col-span-4 lg:self-start">Questions families ask</h2>
          <dl className="grid gap-12 lg:col-span-7 lg:col-start-6">
            {faqs.map(({ q, a }) => (
              <div key={q} className="reveal">
                <dt className="font-display text-2xl font-semibold tracking-tight md:text-3xl">{q}</dt>
                <dd className="mt-4 max-w-[60ch] text-muted">{a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Tour + contact */}
        <section id="tour" className="reveal mx-auto grid max-w-6xl gap-10 px-4 pb-28 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:pb-40">
          <div id="contact" className="lg:col-span-5">
            <h2 className="text-4xl font-bold md:text-5xl">Come see the home for yourself</h2>
            <p className="mt-5 max-w-[42ch] text-muted">
              Ready to explore a caring, supportive home for yourself or a loved one? Call or text us and we&apos;ll set
              up a visit.
            </p>
            <a
              href={tel(site.phones.office)}
              className="group mt-8 inline-flex min-h-14 items-center gap-4 rounded-full bg-accent py-2 pr-2 pl-7 text-lg font-semibold whitespace-nowrap text-on-accent press hover:bg-accent-hover"
            >
              Call {site.phones.office}
              <span className="grid size-10 place-items-center rounded-full bg-on-accent/15 transition duration-500 ease-out-expo group-hover:scale-105">
                <Phone aria-hidden size={18} weight="bold" />
              </span>
            </a>
          </div>
          <div className="rounded-4xl bg-shell p-2 ring-1 ring-line lg:col-span-7">
           <div className="rounded-3xl bg-card p-6 shadow-soft sm:p-10">
            <ul className="grid gap-6 text-lg">
              <li className="flex gap-4">
                <MapPin aria-hidden size={26} weight="light" className="mt-0.5 shrink-0 text-accent" />
                <span>
                  {fullAddress}
                  <br />
                  <a href={directionsUrl} className="text-muted underline">Get directions</a>
                </span>
              </li>
              <li className="flex gap-4">
                <Phone aria-hidden size={26} weight="light" className="mt-0.5 shrink-0 text-accent" />
                <span>
                  <a href={tel(site.phones.office)} className="font-semibold underline">{site.phones.office}</a>
                  <span className="block text-muted">Cell <a href={tel(site.phones.cell)} className="underline">{site.phones.cell}</a></span>
                </span>
              </li>
              <li className="flex gap-4">
                <ChatText aria-hidden size={26} weight="light" className="mt-0.5 shrink-0 text-accent" />
                <span>Text or Zoom <a href={`sms:+1${site.phones.text.replace(/\D/g, "")}`} className="underline">{site.phones.text}</a></span>
              </li>
              <li className="flex gap-4">
                <Envelope aria-hidden size={26} weight="light" className="mt-0.5 shrink-0 text-accent" />
                <span className="grid">
                  {site.emails.map((m) => (
                    <a key={m} href={`mailto:${m}`} className="break-all underline">{m}</a>
                  ))}
                </span>
              </li>
            </ul>
            <p className="mt-8 flex gap-4 border-t border-line pt-6 text-base text-muted">
              <Gift aria-hidden size={26} weight="light" className="shrink-0 text-accent" />
              <span>
                <strong className="text-ink">$500 referral bonus.</strong> Past families and staff who refer a new resident
                receive $500 as a thank-you.
              </span>
            </p>
           </div>
          </div>
        </section>

        <Reviews />
      </main>

    </>
  );
}

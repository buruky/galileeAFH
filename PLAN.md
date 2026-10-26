# Galilee AFH Website Plan

Goal: a fast, warm, trustworthy one-page site for galileeafh.com. Its main job is to get families to **schedule a tour**, and the fallback is a phone call to **425-678-6584**.

## 1. Who it's for

- **Main visitor:** an adult child (40 to 65) looking for care for a parent. They are often stressed and in a hurry, read on a phone, and compare 3 to 5 homes in one evening.
- **Other visitors:** hospital and social-work discharge planners and case managers, who need levels of care, location, contact and fax quickly. Older adults also visit, so text must be large and high-contrast.
- **What success looks like:** within about 10 seconds the visitor knows this is a real, licensed, clean home in Mountlake Terrace, sees which care it provides, and can tap Call or Schedule a tour.

**Design read:** a local care-home marketing site for worried families. It should feel warm, calm and trust-first, closer to a well-kept family home than a hospital or a luxury resort.

**Design settings** (from the frontend design skill): how far the layout departs from a plain grid is **4 of 10**, motion is **3 of 10**, and density is **4 of 10**. Trust and accessibility matter more than flashy design here.

## 2. Brand: neutral page, evergreen as the accent (v2)

Green is only an accent. It's used for buttons, links, one highlighted phrase per view, and one feature card. Every page surface is neutral.

The site is **light only** (no dark mode), with soft warm surfaces.

| Token | Value | Use |
|---|---|---|
| Background | `#F6F3EE` | Page (soft warm bone) |
| Card | `#FFFDFA` | Content plates |
| Ink | `#1D1B18` | Text |
| Muted | `#5F5A53` | Secondary text |
| Accent | `#1E4B43` | CTAs, links, one feature card |

- **Hero:** a full-width photo of the region, a calm Pacific Northwest lake with homes among evergreens ([Alex Stone on Unsplash](https://unsplash.com/photos/hbhabbRFSBU), Kingston, WA). The headline sits bottom-left over a light overlay. It's a photo of the area, not the home; the real photos start right below it.

- **Type:** Bricolage Grotesque for headings, and Atkinson Hyperlegible Next for body text (built for low-vision readers). Body text is 18px.
- **Surfaces:** each card has a soft frame (a hairline tray around the content plate): 2rem outer radius and 1.5rem inner. Buttons are pill-shaped, and the main button has an arrow in its own circle. Shadows are very soft.
- **Icons:** Phosphor Light.
- **Photos:** real photos of the home everywhere except the hero's regional photo. No AI renders.
- **Dark mode:** supported, using the same tokens with dark values.
- **Copy rule:** plain, warm sentences with no "elevate" or "seamless" marketing filler.

## 3. Tech

- Next.js (App Router) + Tailwind v4 + TypeScript, deployed on Vercel with the galileeafh.com domain pointed there.
- Images go through `next/image`. They are already pre-sized as WebP in `public/images/`.
- **Tour form:** a Next.js route that emails galileeafh@gmail.com using Resend (free tier). It has inline errors, a success state, and a honeypot field to block spam bots. Every visitor field is checked again on the server.
- **SEO:** page title and description, Open Graph image, and `LocalBusiness` structured data (schema.org) with the address and phone numbers. Also claim or update the Google Business Profile, since most families find AFHs through Maps.
- **Analytics:** Vercel Analytics, or none.

## 4. Page structure (one page with anchors, plus a /privacy page)

1. **Header** (sticky, 64px): logo, then Care · Our Home · FAQ · Contact, then a "Call 425-678-6584" button and a primary **Schedule a tour** button. On mobile it collapses to the logo, a call icon and a menu.
2. **Hero:** text on the left and a photo on the right.
   - Headline: *Comfort and Care, Right at Home*
   - Subtext: *A licensed adult family home in Mountlake Terrace, where your loved one is known, safe, and cared for every day.*
   - Buttons: **Schedule a tour** and **Call 425-678-6584**
   - Photo: `exterior-front` (the front of the home at dusk with the lights on). It's the most welcoming image and matches the real home's star and front windows. It's 855px wide, which is enough for the half-width hero; get a larger copy if you have one.
3. **Trust row** (just under the hero, not inside it): Licensed WA AFH #____ · 4+ years of care · Caregivers on site 24/7 · Mountlake Terrace, WA.
4. **About:** a short paragraph rewritten from your intro (see Copy fixes), with the `dining-living` photo.
5. **What's included:** your 5 services (Safety & supervision, Medication management, Activities & connection, Coordinated care, Home-cooked meals). They're laid out as an uneven grid of 5 cells rather than identical cards, with one cell holding the `bathroom-accessible` photo to show safety: walk-in shower and grab bars.
6. **Levels of care:** Memory care · Mental health care · Turning & repositioning · Respite stays. Short chips or rows, each with one plain sentence.
7. **Tour our home:** a 5-photo gallery (bedroom-6, bedroom-4, bathroom, dining-kitchen, dining-living). Each photo enlarges when tapped and has descriptive alt text.
8. **Weekend restaurant meals:** one wide band. *Every weekend, residents choose a meal from their favorite local restaurant.*
9. **What families say:** **hidden until there are real reviews** (see Questions). We never invent testimonials.
10. **FAQ:** an accordion with your 2 questions plus suggested ones: cost and payment (Medicaid/private pay), visiting hours, what to bring, how move-in works.
11. **Schedule a tour:** the form (Name, Phone, Email, Relationship to resident, Preferred day, Message) on one side. On the other: the address, a map, all phone numbers, and the $500 referral note.
12. **Footer:** address, Office 425-678-6584 · Cell 206-883-3743 · Text/Zoom 425-412-6484 · Fax 425-361-1949, both emails, license #, and a privacy link.

The "Schedule a tour" label is the same everywhere it appears.

## 5. Motion (kept small)

Sections fade and rise gently into view (a CSS scroll-driven animation or IntersectionObserver), buttons respond when pressed, the FAQ opens and closes smoothly, and the gallery photos enlarge. All of it turns off when the visitor's device asks for reduced motion. No sliders, autoplay or slideshows.

## 6. Accessibility (required)

WCAG AA contrast, 18px+ body text, 44px+ tap targets, visible focus rings, form labels above inputs, error messages tied to their fields, full keyboard navigation, and real alt text on every photo. Phone numbers are `tel:` links.

## 7. Assets: what was done

- Originals moved to `_source/photos` and `_source/docs`. `word format for web page.docx` is still in the project root because it was open in Word when I moved the others.
- Web copies are in `public/images/` as WebP at 800px and 1600px: 12 MB of originals became about 1.2 MB.
- `logo.png` / `logo.webp`: the cream background was removed, the logo trimmed and recolored to Evergreen. `logo-light.webp` is a version for dark mode and dark footers. The original purple logo is still in `_source/photos`.
- **Used:** the dusk front photo (`Front angle AFH.png`, saved as `exterior-front.webp`), as you asked.
- **Left out:** `Side angle AFH.png` (its "1234" house number is clearly not real) and the Street View-style `Galilee AFH front.jpg` (low-resolution, with a car in the driveway). Both originals are still in `_source`.

**Photos that should be retaken** (a phone in daylight is fine):
- Exterior: a real photo of the entry ramp and the side of the house, to replace the side render.
- `bedroom-4` is only 640×480, so it's used as a small tile only.
- Nice to have: a common area with activities, a meal on the table, the backyard, and caregivers if they agree to it.
- Logo as a vector file (SVG/AI/PDF), if the designer has one.

## 8. Copy fixes I'll make (tell me if you object)

- "What Our Client Say" becomes **"What Families Say."**
- "We are contracted with providers that respond a 24/7" becomes **"We partner with healthcare providers who are available 24/7, and our caregivers are on site around the clock."** Please confirm this is accurate.
- "independent living" is removed from levels of care, since it is not something an AFH typically provides. Confirm, or tell me to keep it.
- The email-signup line ("you'll receive a discount from…") is cut off. It's left out until you give me the full offer.

## 9. Questions still open

1. **WA AFH license number.** Families and planners look for it, so I'd like it in the trust row and footer.
2. **Capacity.** How many residents (usually 6 or 8)? Are private rooms available? Is there an opening now?
3. **Reviews.** Do you have real family quotes I may use (first name plus relationship, e.g. "Meron, daughter of a resident")? Or a Google reviews link to pull from?
4. **Payment.** Do you accept Medicaid/COPES, private pay, or long-term care insurance? This is the #1 question families ask.
5. **Languages** spoken by staff (for example Amharic or Tigrinya). This is a real differentiator if so.
6. **Email discount offer.** What's the full offer, or should I drop it?
7. **Domain.** - it is not live
8. **Which email gets tour requests:** galileeafh@gmail.com or galileecare@galileeafh.net?

## 10. Build order

1. Set up Next.js + Tailwind, add the tokens, font and logo.
2. Build the sections in the order above using real copy and photos.
3. Build the tour form with the email route, error and success states, and spam protection.
4. Add SEO metadata, structured data and the Open Graph image, and test that `/privacy` loads.
5. Run Lighthouse and an accessibility check, and review on mobile and desktop in light and dark mode.
6. Deploy to Vercel and point the domain.

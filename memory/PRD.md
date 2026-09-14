# Property Perfect — PRD

## Original Problem Statement
Build Property Perfect, a Florida property services company serving property management companies, HOAs, commercial property owners, and homeowners, with a strong focus on completing work orders and being a dependable one-stop property care partner. Feature Tree Removal and Trimming, HOA Work Orders, Concrete, Property Maintenance and Repairs, Cleanup and Landscaping, General Property Improvements, plus broader service categories that can be easily edited later. Create a responsive Home page with a strong quote and work-order call-to-action, services overview, customer-type sections, trust and reliability messaging, testimonials area, and Florida service-area messaging; include detailed Services, About, Gallery/Projects, Testimonials, and Contact/Request a Quote pages with a form for submitting quotes or work orders. Visual direction: bright Florida atmosphere, teal and deep green foundations, coral accents, mint highlights, warm white backgrounds, bold friendly typography, tropical imagery, clean service icons, polished modern layouts. Mobile-friendly, SEO-friendly, easy to expand, brand around "one call, one crew, property handled."

## Architecture
- Frontend: React 19 (CRA/craco) + Tailwind + framer-motion + lenis smooth scroll. Pages: Home, Services (detailed, anchor sections), About, Gallery (filterable), Testimonials, Contact (quote/work-order form). Components in src/components; all site content data-driven from `src/data/site.js` (single editable source: services, extras, customer types, testimonials, projects, cities, company info).
- Backend: FastAPI (server.py) with `/api/quote-requests` POST (validates, stores in MongoDB `quote_requests`) and GET (latest 100 for review). PyObjectId pattern, ISO timestamps.
- SEO: per-page PageMeta titles/descriptions, index.html meta + JSON-LD LocalBusiness.
- Motion: masked line-by-line hero reveal, lenis momentum scroll, rotating Build•Maintain•Renew badge, slow editorial marquee, parallax hero image, numbered manifesto chapters, scroll reveals throughout.

## User Personas
- Property Managers (portfolio coverage, one vendor, photo close-outs)
- HOAs & Community Boards (violation cures, board-ready reporting)
- Commercial Property Owners (grounds, concrete, canopies)
- Homeowners (fix-it list to improvements)

## Core Requirements (static)
1. Responsive Home with quote/work-order CTA, services overview, customer types, trust messaging, testimonials, Florida service-area messaging
2. Detailed Services, About, Gallery/Projects, Testimonials, Contact pages
3. Quote + work-order submission form persisting to database
4. Services easily editable later (data file)

## Implemented (2026-09-11)
- All 6 pages + 404, full design system (deep green/teal/coral/mint/cream, Bricolage Grotesque + Nunito Sans + Caveat)
- Backend quote/work-order API (POST/GET) verified with curl; E2E form submit verified in browser (success panel + reference ID)
- Marquee, manifesto, parallax hero, rotating badge, gallery filters, service-area city chips
- Mobile 390px and desktop 1440px verified, no horizontal overflow

## Placeholder content (clearly sample, swap in real data)
- Phone (407) 555-3600, email hello@propertyperfect.com, social links (#)
- Testimonials beyond the 3 in the reference mock, gallery projects, city list, dispatch hours
- Photography is representative stock imagery

## Implemented (2026-09-11, round 3)
- Status notifications: moving a request to Scheduled or Completed emails the customer automatically (fixed template, no duplicates on re-save, non-blocking)
- Heart glyph removed from all script annotations (quote band, footer, home story/hero/service-area, About) per user preference
- Real contact details site-wide: (402) 606-7011, admin@propertyperfect.net

## Implemented (2026-09-11, round 4 — visual edits)
- Navbar logo: house icon replaces leaf; "Property" in pine green; pink icon chips now green; hero photo swapped to a Florida house shot; rotating badge removed; manifesto descriptions enlarged

## Implemented (2026-09-11, round 5)
- Dedicated /request page from hero CTA: name/company, property address, photo upload (client-side downscaled, stored server-side, link included in owner email), problem description, urgency — emails admin@propertyperfect.net on send
- "360" branding confirmed as app-only; site stays "Property Perfect"

## Implemented (2026-09-11, round 6 — logo theme)
- Palette aligned to the logo: headings/bands now the logo's sea-green teal (pine #127B68, deep #0A5F52, lagoon #189887), coral accents kept, blue tints replaced with teal tints site-wide

## Backlog
- P1: Real business details (phone, address), reviews with real names, project photos
- P2: Per-service detail pages (/services/:slug), zip-code service-area checker, before/after gallery slider
- P2: Storm/emergency line banner during hurricane season

## Implemented (2026-09-11, round 2)
- Admin Quote Inbox at /admin: JWT login (bcrypt, httpOnly cookies, brute-force lockout), all submissions with quote/work-order badges, persistent status tracking (new/contacted/scheduled/completed via PATCH /api/quote-requests/{id}/status)
- Email alerts: every submission emails the owner (admin@propertyperfect.net) through the managed Resend proxy, with guardrail gate + server-side template
- P2: Per-service detail pages (/services/:slug), zip-code service-area checker, before/after gallery slider
- P2: Storm/emergency line banner during hurricane season

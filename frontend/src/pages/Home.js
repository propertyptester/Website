import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ShieldCheck, Clock, Camera, Leaf } from "lucide-react";
import PageMeta from "../components/PageMeta";
import Marquee from "../components/Marquee";
import ServiceIcon from "../components/ServiceIcon";
import QuoteBand from "../components/QuoteBand";
import { Reveal, MaskLine, EASE } from "../components/anim";
import { COMPANY, IMG, SERVICES, EXTRA_SERVICES, CUSTOMER_TYPES, TESTIMONIALS, CITIES } from "../data/site";

const MARQUEE_ITEMS = [
  "One call, one crew, property handled",
  "Build",
  "Maintain",
  "Renew",
  "Serving all of Florida",
  "Tree • Concrete • Landscape • HOA",
];

const TRUST = [
  { icon: ShieldCheck, title: "Licensed & insured", copy: "Vetted crews, full coverage, every job." },
  { icon: Camera, title: "Photo-proof close-outs", copy: "Every work order documented, start to finish." },
  { icon: Clock, title: "Fast turnaround", copy: "Same-day dispatch on urgent property issues." },
  { icon: Leaf, title: "One point of contact", copy: "A coordinator who knows your property by name." },
];

const MANIFESTO = [
  {
    num: "01",
    title: "One Call",
    copy: "Skip the vendor juggling. One number reaches a coordinator who knows your property and dispatches the right crew — fast.",
  },
  {
    num: "02",
    title: "One Crew",
    copy: "Licensed, insured professionals covering tree, concrete, landscape and repairs — arriving with the right equipment and a plan.",
  },
  {
    num: "03",
    title: "Property Handled",
    copy: "From first quote to photo-documented close-out, we own the outcome. You get updates, not excuses — and a property that shows it.",
  },
];

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-cream pt-28 md:pt-36" data-testid="hero">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full bg-mint/50 blur-3xl" />
      <div className="pointer-events-none absolute -left-52 top-72 h-[420px] w-[420px] rounded-full bg-[#DCEFF7]/60 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 md:px-8 lg:grid-cols-12 lg:gap-8 lg:pb-28">
        <div className="lg:col-span-6">
          <MaskLine delay={0.05}>
            <p className="font-script text-2xl text-coral md:text-3xl">
              Your partner for perfect property management
            </p>
          </MaskLine>
          <h1 className="mt-4 font-display text-[2.9rem] font-extrabold leading-[0.95] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            <MaskLine delay={0.15}>One call.</MaskLine>
            <MaskLine delay={0.27}>One crew.</MaskLine>
            <MaskLine delay={0.39}>
              <span className="relative inline-block text-pine">
                Property handled.
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 9 C 60 3, 240 3, 298 8"
                    stroke="#F4503A"
                    strokeWidth="5"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </MaskLine>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7, ease: EASE }}
            className="mt-6 max-w-lg text-lg leading-relaxed text-moss"
          >
            Tree work, concrete, repairs, landscaping and everything between — one licensed,
            insured crew handling your whole property, from the first quote to a photo-proof
            close-out.
            <span className="mt-3 block font-bold text-ink">Build. Maintain. Renew.</span>
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.7, ease: EASE }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/contact"
              data-testid="hero-quote-cta"
              className="group inline-flex items-center gap-2 rounded-full bg-coral px-8 py-4 text-base font-extrabold text-white shadow-[0_14px_30px_-10px_rgba(244,80,58,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral-dark"
            >
              Get a Free Quote
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-10 flex flex-wrap gap-x-8 gap-y-3"
          >
            {[
              [ShieldCheck, "Reliable Service"],
              [Leaf, "360° Maintenance"],
              [Camera, "Cleaner, Healthier Properties"],
            ].map(([Icon, label]) => (
              <span key={label} className="flex items-center gap-2 text-sm font-bold text-ink">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-mint text-pine">
                  <Icon className="h-4 w-4" />
                </span>
                {label}
              </span>
            ))}
          </motion.div>
        </div>

        <div className="relative lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 1.1, ease: EASE }}
            style={{ y }}
            className="relative mx-auto max-w-md lg:ml-auto"
          >
            <div className="absolute -inset-4 -rotate-3 rounded-t-full rounded-b-[2.5rem] bg-mint" aria-hidden="true" />
            <img
              src={IMG.hero}
              alt="Florida home with manicured tropical landscaping and palm trees"
              data-testid="hero-image"
              className="relative aspect-[3/4] w-full rounded-t-full rounded-b-[2rem] object-cover shadow-[0_40px_80px_-40px_rgba(27,74,92,0.5)]"
              loading="eager"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ServicesOverview() {
  return (
    <section className="relative py-20 md:py-24" data-testid="services-overview">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-script text-3xl text-coral">Complete property care</p>
          <h2 className="mt-1 font-display text-3xl font-extrabold text-ink sm:text-4xl lg:text-5xl">
            Our Services
          </h2>
          <p className="mt-4 text-lg text-moss">All in one place. All handled by one crew.</p>
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} delay={0.07 * i}>
              <Link
                to={`/services#${s.slug}`}
                data-testid={`service-card-${s.slug}`}
                className="group flex h-full flex-col items-center rounded-3xl border border-ink/5 bg-white p-8 text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-24px_rgba(27,74,92,0.35)]"
              >
                <ServiceIcon name={s.icon} chip={s.chip} size="lg" />
                <h3 className="mt-5 font-display text-xl font-extrabold text-ink">{s.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-moss">{s.tagline}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-extrabold text-lagoon opacity-0 transition-all duration-300 group-hover:opacity-100">
                  Explore <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <span className="text-sm font-bold text-moss">Plus everything else:</span>
          {EXTRA_SERVICES.map((s) => (
            <Link
              key={s.slug}
              to={`/services#extras`}
              data-testid={`extra-service-chip-${s.slug}`}
              className="rounded-full border border-pine/15 bg-mintsoft px-4 py-2 text-xs font-extrabold text-pine transition-all duration-300 hover:-translate-y-0.5 hover:bg-mint"
            >
              {s.name}
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function CustomerTypes() {
  return (
    <section className="relative bg-sand py-20 md:py-24" data-testid="customer-types">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-script text-3xl text-coral">who we serve</p>
          <h2 className="mt-1 font-display text-3xl font-extrabold text-ink sm:text-4xl lg:text-5xl">
            360° maintenance for every kind of property
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CUSTOMER_TYPES.map((c, i) => (
            <Reveal key={c.slug} delay={0.08 * i} className="h-full">
              <div
                data-testid={`customer-card-${c.slug}`}
                className="flex h-full flex-col rounded-3xl border border-ink/5 bg-cream p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-24px_rgba(27,74,92,0.3)]"
              >
                <ServiceIcon name={c.icon} chip={c.chip} />
                <h3 className="mt-5 font-display text-lg font-extrabold leading-snug text-ink">{c.name}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-moss">{c.copy}</p>
                <Link
                  to="/request"
                  data-testid={`customer-cta-${c.slug}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-extrabold text-coral transition-all duration-300 hover:gap-2.5"
                >
                  Start a request <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section className="grain relative overflow-hidden bg-deep py-20 text-cream md:py-28" data-testid="manifesto">
      <div className="palm-dots absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="font-script text-3xl text-mint">the perfect way</p>
          <h2 className="mt-1 max-w-2xl font-display text-3xl font-extrabold sm:text-4xl lg:text-5xl">
            Work orders in. Excuses out.
          </h2>
        </Reveal>
        <div className="mt-14">
          {MANIFESTO.map((m, i) => (
            <Reveal key={m.num} delay={0.08 * i}>
              <div
                data-testid={`manifesto-chapter-${m.num}`}
                className={`grid gap-4 border-t border-white/10 py-10 md:grid-cols-[140px_1fr_2fr] md:items-baseline md:gap-10 ${
                  i === MANIFESTO.length - 1 ? "border-b" : ""
                }`}
              >
                <span className="font-display text-5xl font-extrabold text-coral/90 md:text-6xl">{m.num}</span>
                <h3 className="font-display text-2xl font-extrabold md:text-3xl">{m.title}</h3>
                <p className="max-w-xl text-lg leading-relaxed text-cream/80 md:text-xl">{m.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function StorySplit() {
  return (
    <section className="py-20 md:py-24" data-testid="home-story">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-2">
        <Reveal>
          <div className="relative">
            <img
              src={IMG.sunset}
              alt="Florida palm trees silhouetted against a sunset skyline"
              data-testid="home-story-image"
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-[0_32px_64px_-32px_rgba(27,74,92,0.5)]"
              loading="lazy"
            />
          </div>
        </Reveal>
        <div>
          <Reveal>
            <p className="font-script text-3xl text-coral">our story</p>
            <h2 className="mt-1 font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
              Built on integrity. Driven by a brighter tomorrow.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 leading-relaxed text-moss">
              Property Perfect was founded in Florida with a simple belief — every property
              deserves to look its best, be well cared for, and bring out the full potential of the
              people who live and work in it.
            </p>
            <p className="mt-4 leading-relaxed text-moss">
              We&apos;ve seen firsthand how a well-maintained property creates happier homes,
              stronger communities, and brighter futures. That&apos;s why we go beyond quick fixes
              — we take a full-service approach to build, maintain, and renew properties for the
              long term.
            </p>
            <Link
              to="/about"
              data-testid="home-story-link"
              className="mt-7 inline-flex items-center gap-2 text-base font-extrabold text-pine transition-all duration-300 hover:gap-3.5"
            >
              Read our story <ArrowRight className="h-5 w-5" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function TrustBand() {
  return (
    <section className="pb-20 md:pb-24" data-testid="trust-band">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-6 rounded-[2.5rem] bg-mintsoft p-8 md:grid-cols-2 md:p-12 lg:grid-cols-4">
          {TRUST.map((t, i) => (
            <Reveal key={t.title} delay={0.07 * i}>
              <div data-testid={`trust-item-${i + 1}`} className="flex gap-4">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-pine shadow-sm">
                  <t.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-base font-extrabold text-ink">{t.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-moss">{t.copy}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsPreview() {
  const featured = TESTIMONIALS.slice(0, 3);
  return (
    <section className="bg-mintsoft/60 py-20 md:py-24" data-testid="home-testimonials">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-script text-3xl text-coral">real people. real results.</p>
          <h2 className="mt-1 font-display text-3xl font-extrabold text-ink sm:text-4xl lg:text-5xl">
            What our clients say
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {featured.map((t, i) => (
            <Reveal key={t.name} delay={0.08 * i} className="h-full">
              <figure
                data-testid={`home-testimonial-card-${i + 1}`}
                className="flex h-full flex-col rounded-3xl border border-ink/5 bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-24px_rgba(27,74,92,0.3)]"
              >
                <div className="flex gap-1 text-coral" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <svg key={s} viewBox="0 0 20 20" className="h-4 w-4 fill-current">
                      <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9 4.8 17.6l1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 leading-relaxed text-ink">“{t.quote}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-11 w-11 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div>
                    <p className="text-sm font-extrabold text-ink">— {t.name}</p>
                    <p className="text-xs text-moss">
                      {t.role} · {t.city}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 text-center">
          <Link
            to="/testimonials"
            data-testid="home-testimonials-link"
            className="inline-flex items-center gap-2 rounded-full border-2 border-pine/20 px-8 py-3.5 text-sm font-extrabold text-pine transition-all duration-300 hover:border-pine hover:bg-pine hover:text-cream"
          >
            Read all testimonials <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function ServiceArea() {
  return (
    <section className="py-20 md:py-24" data-testid="service-area">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-2">
        <div>
          <Reveal>
            <p className="font-script text-3xl text-coral">from the Panhandle to the Keys</p>
            <h2 className="mt-1 font-display text-3xl font-extrabold text-ink sm:text-4xl lg:text-5xl">
              Proudly serving all of Florida
            </h2>
            <p className="mt-5 max-w-lg leading-relaxed text-moss">
              From single-family homes to multi-community HOA portfolios and commercial grounds —
              one call covers the whole state. Not sure if you&apos;re in range? You are.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {CITIES.map((c) => (
                <span
                  key={c}
                  data-testid={`service-area-city-${c.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                  className="rounded-full border border-pine/15 bg-white px-4 py-2 text-xs font-extrabold text-pine"
                >
                  {c}
                </span>
              ))}
            </div>
            <a
              href={COMPANY.phoneHref}
              data-testid="service-area-call"
              className="mt-8 inline-flex items-center gap-2 text-base font-extrabold text-coral transition-all duration-300 hover:gap-3.5"
            >
              Check your area — call {COMPANY.phone} <ArrowRight className="h-5 w-5" />
            </a>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <div className="relative">
            <div className="absolute -inset-4 rotate-2 rounded-[2.5rem] bg-[#DCEFF7]" aria-hidden="true" />
            <img
              src={IMG.palmDrive}
              alt="Palm tree lined Florida community driveway"
              data-testid="service-area-image"
              className="relative aspect-[4/3] w-full rounded-[2.5rem] object-cover shadow-[0_32px_64px_-32px_rgba(27,74,92,0.5)]"
              loading="lazy"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main data-testid="page-home">
      <PageMeta
        title="Property Perfect | One Call, One Crew, Property Handled — Florida Property Services"
        description="Florida's one-call property care partner: tree removal & trimming, HOA work orders, concrete, maintenance, cleanup & landscaping. Get a free quote today."
      />
      <Hero />
      <Marquee items={MARQUEE_ITEMS} />
      <ServicesOverview />
      <CustomerTypes />
      <Manifesto />
      <StorySplit />
      <TrustBand />
      <TestimonialsPreview />
      <ServiceArea />
      <QuoteBand />
    </main>
  );
}

import { Link } from "react-router-dom";
import { ArrowRight, Clock, Hammer, MessageCircle, HeartHandshake } from "lucide-react";
import PageMeta from "../components/PageMeta";
import QuoteBand from "../components/QuoteBand";
import { Reveal } from "../components/anim";
import { IMG, COMPANY, CITIES } from "../data/site";

const VALUES = [
  { icon: Clock, title: "Dependability", copy: "We show up when we say, and we finish what we start." },
  { icon: Hammer, title: "Craftsmanship", copy: "Details make the property — we sweat every single one." },
  { icon: MessageCircle, title: "Communication", copy: "Photo updates and straight answers at every step." },
  { icon: HeartHandshake, title: "Care", copy: "Your property, treated like it's our own address." },
];

const MANIFESTO = [
  { num: "01", title: "Build", copy: "New features, repairs and improvements that raise what your property can be — done properly, the first time." },
  { num: "02", title: "Maintain", copy: "Recurring care and fast work orders that keep it looking its best, season after season." },
  { num: "03", title: "Renew", copy: "Refreshes and restorations that bring the spark back — and protect the value underneath." },
];

export default function About() {
  return (
    <main data-testid="page-about" className="pt-16 md:pt-20">
      <PageMeta
        title="About | Property Perfect — Florida's One-Crew Property Care Partner"
        description="Property Perfect was founded in Florida on a simple belief: every property deserves to look its best. Build. Maintain. Renew — one call, one crew."
      />

      <section className="relative overflow-hidden bg-cream pb-14 pt-14 md:pb-20 md:pt-20">
        <div className="pointer-events-none absolute -left-40 -top-32 h-[420px] w-[420px] rounded-full bg-mint/50 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <Reveal className="max-w-3xl">
            <p className="font-script text-3xl text-coral">our story</p>
            <h1 className="mt-1 font-display text-4xl font-extrabold leading-[0.98] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              A Florida crew that treats property like it&apos;s personal.
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="pb-16 md:pb-20" data-testid="about-story">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-2">
          <div>
            <Reveal>
              <p className="leading-relaxed text-moss">
                Property Perfect was founded in Florida with a simple belief — every property
                deserves to look its best, be well cared for, and bring out the full potential of
                the people who live and work in it.
              </p>
              <p className="mt-4 leading-relaxed text-moss">
                What started as a local team with a passion for property care has grown into a
                trusted partner for property managers, community boards, business owners and
                homeowners across Florida. We&apos;ve seen firsthand how a well-maintained property
                creates happier homes, stronger communities, and brighter futures.
              </p>
              <p className="mt-4 leading-relaxed text-moss">
                That&apos;s why we go beyond quick fixes — we take a 360° approach to build,
                maintain, and renew properties for the long term. We&apos;re not just maintaining
                properties — we&apos;re helping build a brighter Florida, one property at a time.
              </p>
              <p className="mt-6 font-script text-3xl text-coral">Same properties. A brighter tomorrow...</p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="relative">
              <div className="absolute -inset-3 rotate-2 rounded-[2.5rem] bg-mint" aria-hidden="true" />
              <img
                src={IMG.community}
                alt="Palm trees in front of a well-kept Florida community building"
                data-testid="about-story-image"
                className="relative aspect-[4/3] w-full rounded-[2.5rem] object-cover shadow-[0_32px_64px_-32px_rgba(5,55,44,0.45)]"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-sand py-20 md:py-24" data-testid="about-values">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="font-script text-3xl text-coral">what we stand on</p>
            <h2 className="mt-1 font-display text-3xl font-extrabold text-ink sm:text-4xl lg:text-5xl">
              Values that show up on every job
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={0.08 * i} className="h-full">
                <div
                  data-testid={`about-value-${i + 1}`}
                  className="flex h-full flex-col rounded-3xl border border-ink/5 bg-cream p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-24px_rgba(5,55,44,0.3)]"
                >
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-mint text-pine">
                    <v.icon className="h-7 w-7" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-extrabold text-ink">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-moss">{v.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="grain relative overflow-hidden bg-deep py-20 text-cream md:py-28" data-testid="about-manifesto">
        <div className="palm-dots absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <p className="font-script text-3xl text-mint">build • maintain • renew</p>
            <h2 className="mt-1 max-w-2xl font-display text-3xl font-extrabold sm:text-4xl lg:text-5xl">
              The whole property lifecycle, on one number.
            </h2>
          </Reveal>
          <div className="mt-14">
            {MANIFESTO.map((m, i) => (
              <Reveal key={m.num} delay={0.08 * i}>
                <div
                  data-testid={`about-manifesto-${m.num}`}
                  className={`grid gap-4 border-t border-white/10 py-10 md:grid-cols-[140px_1fr_2fr] md:items-baseline md:gap-10 ${
                    i === MANIFESTO.length - 1 ? "border-b" : ""
                  }`}
                >
                  <span className="font-display text-5xl font-extrabold text-coral/90 md:text-6xl">{m.num}</span>
                  <h3 className="font-display text-2xl font-extrabold md:text-3xl">{m.title}</h3>
                  <p className="max-w-xl leading-relaxed text-cream/70">{m.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24" data-testid="about-crew">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-3 -rotate-2 rounded-[2.5rem] bg-[#DCEFF7]" aria-hidden="true" />
              <img
                src={IMG.crew}
                alt="Property Perfect crew member on a Florida work site"
                data-testid="about-crew-image"
                className="relative aspect-[4/3] w-full rounded-[2.5rem] object-cover shadow-[0_32px_64px_-32px_rgba(5,55,44,0.45)]"
                loading="lazy"
              />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <p className="font-script text-3xl text-coral">one crew, no roulette</p>
              <h2 className="mt-1 font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
                No subcontractor merry-go-round.
              </h2>
              <p className="mt-5 leading-relaxed text-moss">
                When you call Property Perfect, the same coordinated crew handles the tree, the
                concrete, the cleanup and the repair. One schedule, one standard, one invoice — and
                a coordinator who answers the phone.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Licensed & insured Florida crews",
                  "Background-checked technicians",
                  "Photo-documented close-outs on every order",
                  `Dispatch hours: ${COMPANY.hours} — storm line for emergencies`,
                ].map((li) => (
                  <li key={li} className="flex items-start gap-3 text-sm font-semibold text-ink">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mint text-pine">
                      <ArrowRight className="h-3 w-3" />
                    </span>
                    {li}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm font-bold text-pine">
                {COMPANY.area} — {CITIES.slice(0, 4).join(", ")} and everywhere between.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <QuoteBand />
    </main>
  );
}

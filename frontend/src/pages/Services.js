import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import PageMeta from "../components/PageMeta";
import ServiceIcon from "../components/ServiceIcon";
import QuoteBand from "../components/QuoteBand";
import { Reveal } from "../components/anim";
import { COMPANY, SERVICES, EXTRA_SERVICES } from "../data/site";

function scrollToId(id) {
  if (window.__lenis) window.__lenis.scrollTo(`#${id}`, { offset: -90 });
  else document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Services() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const t = setTimeout(() => scrollToId(id), 120);
      return () => clearTimeout(t);
    }
  }, [hash]);

  return (
    <main data-testid="page-services" className="pt-16 md:pt-20">
      <PageMeta
        title="Services | Property Perfect — Florida Tree, Concrete, Maintenance & Landscaping"
        description="Detailed Florida property services: tree removal & trimming, HOA work orders, concrete, property maintenance & repairs, cleanup & landscaping, and general property improvements."
      />

      <section className="relative overflow-hidden bg-cream pb-14 pt-14 md:pb-20 md:pt-20">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-mint/50 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <Reveal className="max-w-3xl">
            <p className="font-script text-3xl text-coral">what we handle</p>
            <h1 className="mt-1 font-display text-4xl font-extrabold leading-[0.98] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Every property need. One dependable crew.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-moss">
              Six core service lines — plus all the work orders in between — quoted clearly and
              closed out with photo proof, anywhere in Florida.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="mt-8 flex flex-wrap gap-2.5">
            {SERVICES.map((s) => (
              <button
                key={s.slug}
                onClick={() => scrollToId(s.slug)}
                data-testid={`services-anchor-${s.slug}`}
                className="rounded-full border border-pine/15 bg-white px-4 py-2 text-xs font-extrabold text-pine transition-all duration-300 hover:-translate-y-0.5 hover:bg-mint"
              >
                {s.name}
              </button>
            ))}
          </Reveal>
        </div>
      </section>

      {SERVICES.map((s, i) => (
        <section
          key={s.slug}
          id={s.slug}
          data-testid={`service-section-${s.slug}`}
          className={`scroll-mt-24 py-16 md:py-20 ${i % 2 === 1 ? "bg-sand" : "bg-cream"}`}
        >
          <div
            className={`mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-2 ${
              i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
            }`}
          >
            <Reveal>
              <div className="relative">
                <div
                  className={`absolute -inset-3 rounded-[2.5rem] ${
                    i % 2 === 0 ? "-rotate-2 bg-mint" : "rotate-2 bg-[#DCF3EE]"
                  }`}
                  aria-hidden="true"
                />
                <img
                  src={s.image}
                  alt={s.name}
                  data-testid={`service-image-${s.slug}`}
                  className="relative aspect-[4/3] w-full rounded-[2.5rem] object-cover shadow-[0_32px_64px_-32px_rgba(5,55,44,0.45)]"
                  loading="lazy"
                />
              </div>
            </Reveal>
            <div>
              <Reveal>
                <ServiceIcon name={s.icon} chip={s.chip} />
                <h2 className="mt-5 font-display text-3xl font-extrabold text-ink sm:text-4xl">{s.name}</h2>
                <p className="mt-2 font-script text-2xl text-coral">{s.tagline}</p>
                <p className="mt-4 leading-relaxed text-moss">{s.desc}</p>
              </Reveal>
              <Reveal delay={0.1}>
                <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                  {s.includes.map((inc) => (
                    <li key={inc} className="flex items-start gap-2.5 text-sm font-semibold text-ink">
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mint text-pine">
                        <Check className="h-3 w-3" />
                      </span>
                      {inc}
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/contact?service=${s.slug}`}
                  data-testid={`service-cta-${s.slug}`}
                  className="group mt-8 inline-flex items-center gap-2 rounded-full bg-coral px-7 py-3.5 text-sm font-extrabold text-white shadow-[0_14px_30px_-10px_rgba(255,107,92,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral-dark"
                >
                  Request {s.name.toLowerCase()}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      <section id="extras" className="scroll-mt-24 bg-cream py-16 md:py-20" data-testid="extra-services">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal className="max-w-2xl">
            <p className="font-script text-3xl text-coral">and everything else</p>
            <h2 className="mt-1 font-display text-3xl font-extrabold text-ink sm:text-4xl">
              Broader categories, same one-call promise
            </h2>
            <p className="mt-4 leading-relaxed text-moss">
              Our service catalog is built to grow — if your property needs it, ask. New categories
              are added every season.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {EXTRA_SERVICES.map((s, i) => (
              <Reveal key={s.slug} delay={0.06 * i} className="h-full">
                <div
                  data-testid={`extra-service-card-${s.slug}`}
                  className="flex h-full flex-col rounded-3xl border border-ink/5 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgba(5,55,44,0.3)]"
                >
                  <ServiceIcon name={s.icon} chip={s.chip} size="sm" />
                  <h3 className="mt-4 font-display text-lg font-extrabold text-ink">{s.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-moss">{s.line}</p>
                  <Link
                    to={`/contact?service=${s.slug}`}
                    data-testid={`extra-service-cta-${s.slug}`}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-extrabold text-coral transition-all duration-300 hover:gap-2.5"
                  >
                    Request it <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12 rounded-[2.5rem] bg-mintsoft p-8 text-center md:p-12">
            <p className="font-script text-3xl text-pine">don&apos;t see your service listed?</p>
            <h3 className="mt-2 font-display text-2xl font-extrabold text-ink sm:text-3xl">
              Call {COMPANY.phone} — if it&apos;s on the property, we can handle it.
            </h3>
          </Reveal>
        </div>
      </section>

      <QuoteBand />
    </main>
  );
}

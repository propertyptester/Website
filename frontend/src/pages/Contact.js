import { Phone, Mail, MapPin, Clock, Check } from "lucide-react";
import PageMeta from "../components/PageMeta";
import QuoteForm from "../components/QuoteForm";
import { Reveal } from "../components/anim";
import { COMPANY, CITIES } from "../data/site";

export default function Contact() {
  return (
    <main data-testid="page-contact" className="pt-16 md:pt-20">
      <PageMeta
        title="Request a Quote or Work Order | Property Perfect — Florida"
        description="Get a free quote or send a work order to Property Perfect. Tree removal, HOA work orders, concrete, maintenance and landscaping across Florida — one call, one crew."
      />

      <section className="relative overflow-hidden bg-cream pb-16 pt-14 md:pb-24 md:pt-20">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[460px] w-[460px] rounded-full bg-mint/50 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <Reveal className="max-w-3xl">
            <p className="font-script text-3xl text-coral">one call, one crew, property handled</p>
            <h1 className="mt-1 font-display text-4xl font-extrabold leading-[0.98] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Tell us what needs handling.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-moss">
              Request a free quote or dispatch a work order — we reply within one business day, and
              urgent property issues get a same-day callback.
            </p>
          </Reveal>

          <div className="mt-14 grid items-start gap-10 lg:grid-cols-[1fr_1.25fr]">
            <div className="space-y-5">
              <Reveal>
                <a
                  href={COMPANY.phoneHref}
                  data-testid="contact-info-phone"
                  className="group flex items-center gap-4 rounded-3xl border border-ink/5 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgba(5,55,44,0.3)]"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#FFE4DE] text-coral">
                    <Phone className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-moss">Call or text</p>
                    <p className="font-display text-lg font-extrabold text-ink">{COMPANY.phone}</p>
                  </div>
                </a>
              </Reveal>
              <Reveal delay={0.05}>
                <a
                  href={`mailto:${COMPANY.email}`}
                  data-testid="contact-info-email"
                  className="group flex items-center gap-4 rounded-3xl border border-ink/5 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgba(5,55,44,0.3)]"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#DCF3EE] text-lagoon">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-moss">Email</p>
                    <p className="font-display text-lg font-extrabold text-ink">{COMPANY.email}</p>
                  </div>
                </a>
              </Reveal>
              <Reveal delay={0.1}>
                <div
                  data-testid="contact-info-hours"
                  className="flex items-center gap-4 rounded-3xl border border-ink/5 bg-white p-6"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-mint text-pine">
                    <Clock className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-moss">Dispatch hours</p>
                    <p className="font-display text-lg font-extrabold text-ink">{COMPANY.hours}</p>
                    <p className="text-xs text-moss">Emergency storm line answered around the clock during hurricane events.</p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.15}>
                <div
                  data-testid="contact-info-area"
                  className="rounded-3xl border border-ink/5 bg-white p-6"
                >
                  <div className="flex items-center gap-4">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#FFE4DE] text-coral">
                      <MapPin className="h-5 w-5" />
                    </span>
                    <p className="font-display text-lg font-extrabold text-ink">{COMPANY.area}</p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {CITIES.map((c) => (
                      <span
                        key={c}
                        data-testid={`contact-area-city-${c.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                        className="rounded-full bg-mintsoft px-3 py-1.5 text-xs font-extrabold text-pine"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <ul className="space-y-2.5 rounded-3xl bg-pine p-6 text-cream" data-testid="contact-why-list">
                  <li className="font-script text-2xl text-mint">why one call?</li>
                  {[
                    "One crew for every trade — no vendor chasing",
                    "Photo-documented close-outs on every order",
                    "Same point of contact, job after job",
                  ].map((li) => (
                    <li key={li} className="flex items-start gap-2.5 text-sm font-semibold">
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-coral text-white">
                        <Check className="h-3 w-3" />
                      </span>
                      {li}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <QuoteForm />
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}

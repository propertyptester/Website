import PageMeta from "../components/PageMeta";
import QuoteBand from "../components/QuoteBand";
import { Reveal } from "../components/anim";
import { TESTIMONIALS } from "../data/site";

function Stars() {
  return (
    <div className="flex gap-1 text-coral" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, s) => (
        <svg key={s} viewBox="0 0 20 20" className="h-4 w-4 fill-current">
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9 4.8 17.6l1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <main data-testid="page-testimonials" className="pt-16 md:pt-20">
      <PageMeta
        title="Testimonials | Property Perfect — Trusted Across Florida"
        description="See what property managers, HOA boards, commercial owners and homeowners across Florida say about Property Perfect."
      />

      <section className="relative overflow-hidden bg-cream pb-12 pt-14 md:pt-20">
        <div className="pointer-events-none absolute -left-40 -top-32 h-[420px] w-[420px] rounded-full bg-mint/50 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <Reveal className="max-w-3xl">
            <p className="font-script text-3xl text-coral">kind words, real properties</p>
            <h1 className="mt-1 font-display text-4xl font-extrabold leading-[0.98] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Real people. Real results.
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <div
              data-testid="testimonials-summary"
              className="mt-8 flex flex-wrap items-center gap-5 rounded-[2rem] bg-mintsoft p-6 md:p-8"
            >
              <span className="flex gap-1 text-coral">
                {Array.from({ length: 5 }).map((_, s) => (
                  <svg key={s} viewBox="0 0 20 20" className="h-7 w-7 fill-current">
                    <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9 4.8 17.6l1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
                  </svg>
                ))}
              </span>
              <div>
                <p className="font-display text-lg font-extrabold text-ink">
                  Trusted by property managers, boards, owners & homeowners
                </p>
                <p className="text-sm text-moss">
                  From Orlando to Miami — the same dependable crew, the same photo-proof close-outs.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-20 md:pb-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={0.06 * i} className="h-full">
                <figure
                  data-testid={`testimonial-card-${t.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                  className="flex h-full flex-col rounded-3xl border border-ink/5 bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-24px_rgba(5,55,44,0.3)]"
                >
                  <Stars />
                  <blockquote className="mt-4 flex-1 leading-relaxed text-ink">“{t.quote}”</blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    {t.avatar ? (
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="h-11 w-11 rounded-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-pine font-display text-sm font-extrabold text-cream">
                        {t.initials}
                      </span>
                    )}
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
        </div>
      </section>

      <QuoteBand />
    </main>
  );
}

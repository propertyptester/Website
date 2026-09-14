import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PageMeta from "../components/PageMeta";
import QuoteBand from "../components/QuoteBand";
import BeforeAfter from "../components/BeforeAfter";
import { Reveal, EASE } from "../components/anim";
import { PROJECTS, BEFORE_AFTER } from "../data/site";

const CATEGORIES = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.category)))];

export default function Gallery() {
  const [cat, setCat] = useState("All");
  const filtered = cat === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === cat);

  return (
    <main data-testid="page-gallery" className="pt-16 md:pt-20">
      <PageMeta
        title="Gallery & Projects | Property Perfect — Florida Property Work, Documented"
        description="Browse Property Perfect projects across Florida — tree work, concrete, landscaping, HOA common areas and commercial grounds care."
      />

      <section className="relative overflow-hidden bg-cream pb-12 pt-14 md:pt-20">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-mint/50 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <Reveal className="max-w-3xl">
            <p className="font-script text-3xl text-coral">proof, not promises</p>
            <h1 className="mt-1 font-display text-4xl font-extrabold leading-[0.98] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Projects we&apos;ve handled.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-moss">
              Tree work, concrete, landscaping and common-area care across Florida — every job
              quoted, scheduled and closed out the same dependable way.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-16 md:pb-20" data-testid="before-after-section">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="font-script text-3xl text-coral">drag the handle</p>
            <h2 className="mt-1 font-display text-3xl font-extrabold text-ink sm:text-4xl">
              Watch the transformation
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {BEFORE_AFTER.map((p, i) => (
              <Reveal key={p.slug} delay={0.08 * i}>
                <BeforeAfter before={p.before} after={p.after} title={p.title} slug={p.slug} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal className="flex flex-wrap gap-2.5">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                data-testid={`gallery-filter-${c.toLowerCase().replace(/\s+/g, "-")}`}
                className={`rounded-full px-5 py-2.5 text-sm font-extrabold transition-all duration-300 ${
                  cat === c
                    ? "bg-pine text-cream shadow-[0_10px_24px_-10px_rgba(5,55,44,0.6)]"
                    : "border border-pine/15 bg-white text-pine hover:-translate-y-0.5 hover:bg-mint"
                }`}
              >
                {c}
              </button>
            ))}
          </Reveal>

          <motion.div layout className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <motion.figure
                  layout
                  key={p.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.5, delay: 0.04 * i, ease: EASE }}
                  data-testid={`gallery-item-${p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                  className="group relative overflow-hidden rounded-3xl bg-deep shadow-[0_24px_48px_-24px_rgba(5,55,44,0.4)]"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-deep/90 via-deep/50 to-transparent p-5 pt-12">
                    <span className="font-display text-base font-extrabold text-cream">{p.title}</span>
                    <span className="shrink-0 rounded-full bg-coral px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wide text-white">
                      {p.category}
                    </span>
                  </figcaption>
                </motion.figure>
              ))}
            </AnimatePresence>
          </motion.div>
          <Reveal className="mt-10 text-center">
            <p className="text-sm text-moss/80">
              Representative project photography — ask us for references and before-and-afters in
              your neighborhood.
            </p>
          </Reveal>
        </div>
      </section>

      <QuoteBand />
    </main>
  );
}

import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { Reveal } from "./anim";
import { COMPANY } from "../data/site";

export default function QuoteBand() {
  return (
    <section className="grain relative overflow-hidden bg-deep text-cream" data-testid="quote-band">
      <div className="palm-dots absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-24">
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <Reveal>
              <p className="font-script text-3xl text-mint">A brighter tomorrow...</p>
              <h2 className="mt-2 font-display text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                Let&apos;s make your property perfect.
              </h2>
              <p className="mt-4 text-cream/70">
                Send a quote request or a work order today — we reply within one business day and
                treat your property like our own.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.15} className="flex flex-wrap items-center gap-4">
            <Link
              to="/contact"
              data-testid="band-quote-cta"
              className="group inline-flex items-center gap-2 rounded-full bg-coral px-8 py-4 text-base font-extrabold text-white shadow-[0_14px_30px_-10px_rgba(255,107,92,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral-dark"
            >
              Get a Free Quote
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <a
              href={COMPANY.phoneHref}
              data-testid="band-call-cta"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-8 py-4 text-base font-bold text-cream transition-all duration-300 hover:border-mint hover:bg-white/5"
            >
              <Phone className="h-5 w-5 text-mint" /> {COMPANY.phone}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

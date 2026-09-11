import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { CheckCircle2, Send, Loader2 } from "lucide-react";
import { COMPANY, ALL_SERVICES, CUSTOMER_TYPES } from "../data/site";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const inputCls =
  "w-full rounded-xl border border-ink/10 bg-cream/70 px-4 py-3 text-sm text-ink placeholder:text-moss/50 focus:border-lagoon focus:outline-none focus:ring-2 focus:ring-lagoon/30 transition";

export default function QuoteForm() {
  const [params] = useSearchParams();
  const typeParam = params.get("type");
  const svcParam = params.get("service");

  const [requestType, setRequestType] = useState(
    typeParam === "work-order" ? "work-order" : "quote"
  );
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    customer_type: "",
    service: svcParam && ALL_SERVICES.some((s) => s.slug === svcParam) ? svcParam : "",
    city: "",
    urgency: "flexible",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [ref, setRef] = useState(null);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await axios.post(`${API}/quote-requests`, {
        ...form,
        request_type: requestType,
        customer_type: form.customer_type || "Homeowner",
        service: form.service || "other",
      });
      setRef(`PP-${res.data.id.slice(-6).toUpperCase()}`);
      toast.success("Request sent — we'll be in touch within one business day!");
    } catch {
      toast.error("Something went wrong. Please call us instead.");
    } finally {
      setSending(false);
    }
  };

  const reset = () => {
    setRef(null);
    setForm({
      name: "",
      email: "",
      phone: "",
      customer_type: "",
      service: "",
      city: "",
      urgency: "flexible",
      message: "",
    });
  };

  if (ref) {
    return (
      <div
        data-testid="quote-success"
        className="flex h-full flex-col items-center justify-center rounded-3xl border border-pine/15 bg-white p-10 text-center shadow-[0_24px_60px_-30px_rgba(5,55,44,0.35)]"
      >
        <CheckCircle2 className="h-14 w-14 text-pine" />
        <h3 className="mt-4 font-display text-2xl font-extrabold text-ink">Request received!</h3>
        <p className="mt-2 text-sm text-moss">
          Reference <span className="font-bold text-pine">{ref}</span> — our crew coordinator will
          reach out within one business day.
        </p>
        <button
          onClick={reset}
          data-testid="quote-success-reset"
          className="mt-6 rounded-full border border-pine/20 px-6 py-3 text-sm font-bold text-pine transition hover:bg-mintsoft"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      data-testid="quote-form"
      className="rounded-3xl border border-ink/5 bg-white p-6 shadow-[0_24px_60px_-30px_rgba(5,55,44,0.35)] md:p-8"
    >
      <div className="mb-6 flex rounded-full bg-sand p-1.5">
        {[
          ["quote", "Request a Quote"],
          ["work-order", "Send a Work Order"],
        ].map(([val, label]) => (
          <button
            key={val}
            type="button"
            data-testid={`quote-form-request-type-${val}`}
            onClick={() => setRequestType(val)}
            className={`flex-1 rounded-full px-4 py-2.5 text-sm font-extrabold transition-all duration-300 ${
              requestType === val ? "bg-pine text-cream shadow" : "text-moss hover:text-pine"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <input
          required
          placeholder="Full name *"
          data-testid="quote-form-name"
          className={inputCls}
          value={form.name}
          onChange={set("name")}
        />
        <input
          required
          type="email"
          placeholder="Email *"
          data-testid="quote-form-email"
          className={inputCls}
          value={form.email}
          onChange={set("email")}
        />
        <input
          required
          type="tel"
          placeholder="Phone *"
          data-testid="quote-form-phone"
          className={inputCls}
          value={form.phone}
          onChange={set("phone")}
        />
        <input
          placeholder="City / property address"
          data-testid="quote-form-city"
          className={inputCls}
          value={form.city}
          onChange={set("city")}
        />
        <select
          required
          data-testid="quote-form-customer-type"
          className={`${inputCls} ${form.customer_type ? "" : "text-moss/50"}`}
          value={form.customer_type}
          onChange={set("customer_type")}
        >
          <option value="" disabled>
            I am a…
          </option>
          {CUSTOMER_TYPES.map((c) => (
            <option key={c.slug} value={c.name}>
              {c.name}
            </option>
          ))}
          <option value="Other">Other</option>
        </select>
        <select
          required
          data-testid="quote-form-service"
          className={`${inputCls} ${form.service ? "" : "text-moss/50"}`}
          value={form.service}
          onChange={set("service")}
        >
          <option value="" disabled>
            Service needed *
          </option>
          <optgroup label="Core services">
            {ALL_SERVICES.slice(0, 6).map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
          </optgroup>
          <optgroup label="More services">
            {ALL_SERVICES.slice(6).map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
            <option value="other">Something else</option>
          </optgroup>
        </select>
        <select
          data-testid="quote-form-urgency"
          className={inputCls}
          value={form.urgency}
          onChange={set("urgency")}
        >
          <option value="flexible">Timeline: flexible</option>
          <option value="this-week">This week</option>
          <option value="asap">ASAP</option>
          <option value="emergency">Emergency / storm damage</option>
        </select>
        <textarea
          required
          rows={4}
          placeholder="Tell us about the property and what needs handling *"
          data-testid="quote-form-message"
          className={`${inputCls} sm:col-span-2`}
          value={form.message}
          onChange={set("message")}
        />
      </div>

      <button
        type="submit"
        disabled={sending}
        data-testid="quote-form-submit"
        className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-coral px-8 py-4 text-base font-extrabold text-white shadow-[0_14px_30px_-10px_rgba(255,107,92,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral-dark disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {sending ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Send className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
        )}
        {sending ? "Sending…" : requestType === "quote" ? "Request my free quote" : "Dispatch this work order"}
      </button>
      <p className="mt-4 text-xs leading-relaxed text-moss/70">
        Prefer to talk? Call{" "}
        <a href={COMPANY.phoneHref} className="font-bold text-pine" data-testid="quote-form-phone-link">
          {COMPANY.phone}
        </a>{" "}
        — {COMPANY.hours}. We never share your details.
      </p>
    </form>
  );
}

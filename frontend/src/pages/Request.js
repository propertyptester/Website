import { useRef, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { CheckCircle2, Send, Loader2, Camera, Phone, ClipboardCheck, Truck } from "lucide-react";
import PageMeta from "../components/PageMeta";
import { COMPANY } from "../data/site";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const inputCls =
  "w-full rounded-xl border border-ink/10 bg-cream/70 px-4 py-3 text-sm text-ink placeholder:text-moss/50 focus:border-lagoon focus:outline-none focus:ring-2 focus:ring-lagoon/30 transition";

const shrink = (file) =>
  new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const scale = Math.min(1, 1600 / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(url);
          resolve(blob ? new File([blob], "photo.jpg", { type: "image/jpeg" }) : file);
        },
        "image/jpeg",
        0.85
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(file);
    };
    img.src = url;
  });

export default function Request() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", urgency: "flexible", message: "" });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [busy, setBusy] = useState(false);
  const [ref, setRef] = useState(null);
  const fileRef = useRef(null);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const pick = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      toast.error("Please choose an image file.");
      return;
    }
    if (f.size > 8 * 1024 * 1024) {
      toast.error("Photo must be under 8MB.");
      return;
    }
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      let photoUrl = "";
      if (file) {
        const small = await shrink(file);
        const fd = new FormData();
        fd.append("file", small);
        const up = await axios.post(`${API}/uploads`, fd);
        photoUrl = up.data.url;
      }
      const res = await axios.post(`${API}/quote-requests`, {
        ...form,
        request_type: "work-order",
        customer_type: "Work order request",
        service: "Work order",
        photo_url: photoUrl,
      });
      setRef(`PP-${res.data.id.slice(-6).toUpperCase()}`);
      toast.success("Work order sent — we'll be in touch!");
    } catch {
      toast.error("Something went wrong. Please call us instead.");
    } finally {
      setBusy(false);
    }
  };

  const reset = () => {
    setRef(null);
    clearFile();
    setForm({ name: "", email: "", phone: "", address: "", urgency: "flexible", message: "" });
  };

  return (
    <main data-testid="page-request" className="pt-16 md:pt-20">
      <PageMeta
        title="Send a Work Order | Property Perfect — Florida"
        description="Send Property Perfect a work order: name, property address, a photo of the problem and a short description — our crew takes it from there."
      />
      <section className="relative overflow-hidden bg-cream pb-20 pt-14 md:pb-24 md:pt-20">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[460px] w-[460px] rounded-full bg-mint/50 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <div className="max-w-3xl">
            <p className="font-script text-3xl text-coral">send a work order</p>
            <h1 className="mt-1 font-display text-4xl font-extrabold leading-[0.98] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Snap it. Send it. Handled.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-moss">
              Fill in the details, add a picture of the problem, and push send — it goes straight
              to our crew coordinator&apos;s inbox.
            </p>
          </div>

          <div className="mt-12 grid items-start gap-10 lg:grid-cols-[1.25fr_1fr]">
            {ref ? (
              <div
                data-testid="request-success"
                className="flex flex-col items-center justify-center rounded-3xl border border-pine/15 bg-white p-10 text-center shadow-[0_24px_60px_-30px_rgba(5,55,44,0.35)]"
              >
                <CheckCircle2 className="h-14 w-14 text-pine" />
                <h3 className="mt-4 font-display text-2xl font-extrabold text-ink">Work order sent!</h3>
                <p className="mt-2 text-sm text-moss">
                  Reference <span className="font-bold text-pine">{ref}</span> — our crew coordinator
                  will reach out within one business day.
                </p>
                <button
                  onClick={reset}
                  data-testid="request-success-reset"
                  className="mt-6 rounded-full border border-pine/20 px-6 py-3 text-sm font-bold text-pine transition hover:bg-mintsoft"
                >
                  Send another work order
                </button>
              </div>
            ) : (
              <form
                onSubmit={submit}
                data-testid="request-form"
                className="rounded-3xl border border-ink/5 bg-white p-6 shadow-[0_24px_60px_-30px_rgba(5,55,44,0.35)] md:p-8"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    required
                    placeholder="Name or company name *"
                    data-testid="request-form-name"
                    className={`${inputCls} sm:col-span-2`}
                    value={form.name}
                    onChange={set("name")}
                  />
                  <input
                    required
                    type="email"
                    placeholder="Email *"
                    data-testid="request-form-email"
                    className={inputCls}
                    value={form.email}
                    onChange={set("email")}
                  />
                  <input
                    required
                    type="tel"
                    placeholder="Phone *"
                    data-testid="request-form-phone"
                    className={inputCls}
                    value={form.phone}
                    onChange={set("phone")}
                  />
                  <input
                    required
                    placeholder="Property address *"
                    data-testid="request-form-address"
                    className={`${inputCls} sm:col-span-2`}
                    value={form.address}
                    onChange={set("address")}
                  />
                </div>

                <label
                  data-testid="request-form-photo"
                  className="mt-4 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-pine/25 bg-mintsoft/50 px-4 py-8 text-center transition hover:border-lagoon hover:bg-mintsoft"
                >
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    data-testid="request-form-photo-input"
                    className="hidden"
                    onChange={pick}
                  />
                  {preview ? (
                    <span className="flex items-center gap-4">
                      <img
                        src={preview}
                        alt="Selected problem photo"
                        data-testid="request-form-photo-preview"
                        className="h-20 w-20 rounded-xl object-cover"
                      />
                      <span className="text-sm font-bold text-pine">
                        Photo attached — tap to change
                      </span>
                    </span>
                  ) : (
                    <>
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-pine shadow-sm">
                        <Camera className="h-5 w-5" />
                      </span>
                      <span className="text-sm font-extrabold text-pine">
                        Add a picture of the problem
                      </span>
                      <span className="text-xs text-moss">JPG, PNG or WebP — under 8MB (optional)</span>
                    </>
                  )}
                </label>
                {preview && (
                  <button
                    type="button"
                    onClick={clearFile}
                    data-testid="request-form-photo-remove"
                    className="mt-2 text-xs font-bold text-coral-dark hover:underline"
                  >
                    Remove photo
                  </button>
                )}

                <textarea
                  required
                  rows={5}
                  placeholder="Describe the problem — what's wrong, where on the property, and anything our crew should know *"
                  data-testid="request-form-message"
                  className={`${inputCls} mt-4`}
                  value={form.message}
                  onChange={set("message")}
                />

                <select
                  data-testid="request-form-urgency"
                  className={`${inputCls} mt-4`}
                  value={form.urgency}
                  onChange={set("urgency")}
                >
                  <option value="flexible">Timeline: flexible</option>
                  <option value="this-week">This week</option>
                  <option value="asap">ASAP</option>
                  <option value="emergency">Emergency / storm damage</option>
                </select>

                <button
                  type="submit"
                  disabled={busy}
                  data-testid="request-form-submit"
                  className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-coral px-8 py-4 text-base font-extrabold text-white shadow-[0_14px_30px_-10px_rgba(255,107,92,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral-dark disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {busy ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                  )}
                  {busy ? "Sending…" : "Send work order"}
                </button>
                <p className="mt-4 text-xs leading-relaxed text-moss/70">
                  Goes straight to {COMPANY.email} — or call{" "}
                  <a href={COMPANY.phoneHref} className="font-bold text-pine" data-testid="request-phone-link">
                    {COMPANY.phone}
                  </a>{" "}
                  ({COMPANY.hours}).
                </p>
              </form>
            )}

            <div className="space-y-5">
              {[
                {
                  icon: ClipboardCheck,
                  title: "1. We review it",
                  copy: "Your photo and description go straight to our crew coordinator, who confirms scope and pricing.",
                },
                {
                  icon: Phone,
                  title: "2. We call you",
                  copy: "Within one business day you get a clear quote — no surprises, no vague ranges.",
                },
                {
                  icon: Truck,
                  title: "3. The crew handles it",
                  copy: "One crew arrives with the right equipment and closes out with photo proof.",
                },
              ].map((s, i) => (
                <div
                  key={s.title}
                  data-testid={`request-step-${i + 1}`}
                  className="flex gap-4 rounded-3xl border border-ink/5 bg-white p-6"
                >
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-mint text-pine">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-extrabold text-ink">{s.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-moss">{s.copy}</p>
                  </div>
                </div>
              ))}
              <div className="rounded-3xl bg-pine p-6 text-cream" data-testid="request-side-note">
                <p className="font-script text-2xl text-mint">prefer to talk it through?</p>
                <p className="mt-2 text-sm leading-relaxed text-cream/80">
                  Call {COMPANY.phone} — {COMPANY.hours}. Emergency storm line is answered around
                  the clock during hurricane events.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

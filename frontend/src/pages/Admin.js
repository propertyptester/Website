import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  Lock, LogOut, RefreshCw, Inbox, Phone, Mail, MapPin, Loader2, Leaf,
} from "lucide-react";
import PageMeta from "../components/PageMeta";
import { COMPANY } from "../data/site";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const api = axios.create({ baseURL: API, withCredentials: true });

function formatApiErrorDetail(detail) {
  if (detail == null) return "Something went wrong. Please try again.";
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail))
    return detail
      .map((e) => (e && typeof e.msg === "string" ? e.msg : JSON.stringify(e)))
      .filter(Boolean)
      .join(" ");
  if (detail && typeof detail.msg === "string") return detail.msg;
  return String(detail);
}

const STATUSES = [
  ["new", "New"],
  ["contacted", "Contacted"],
  ["scheduled", "Scheduled"],
  ["completed", "Completed"],
];

const URGENCY_STYLES = {
  emergency: "bg-[#FFE4DE] text-coral-dark",
  asap: "bg-[#DCF2F6] text-lagoon",
};

function LoginCard({ onAuthed }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const { data } = await api.post("/auth/login", { email, password });
      onAuthed(data);
      toast.success("Welcome back!");
    } catch (err) {
      setError(formatApiErrorDetail(err.response?.data?.detail));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-5 pt-24">
      <form
        onSubmit={submit}
        data-testid="admin-login-form"
        className="w-full max-w-md rounded-3xl border border-ink/5 bg-white p-8 shadow-[0_24px_60px_-30px_rgba(5,55,44,0.35)] md:p-10"
      >
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-mint text-pine">
          <Lock className="h-5 w-5" />
        </span>
        <h1 className="mt-5 font-display text-2xl font-extrabold text-ink">Crew Coordinator Login</h1>
        <p className="mt-2 text-sm text-moss">
          Sign in to review quotes and work orders submitted through the site.
        </p>
        <input
          type="email"
          required
          placeholder="Email"
          data-testid="admin-login-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-6 w-full rounded-xl border border-ink/10 bg-cream/70 px-4 py-3 text-sm focus:border-lagoon focus:outline-none focus:ring-2 focus:ring-lagoon/30"
        />
        <input
          type="password"
          required
          placeholder="Password"
          data-testid="admin-login-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-3 w-full rounded-xl border border-ink/10 bg-cream/70 px-4 py-3 text-sm focus:border-lagoon focus:outline-none focus:ring-2 focus:ring-lagoon/30"
        />
        {error && (
          <p data-testid="admin-login-error" className="mt-3 rounded-xl bg-[#FFE4DE] px-4 py-3 text-sm font-bold text-coral-dark">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={busy}
          data-testid="admin-login-submit"
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-coral px-6 py-3.5 text-base font-extrabold text-white transition-all duration-300 hover:bg-coral-dark disabled:opacity-60"
        >
          {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : <Lock className="h-4 w-4" />}
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}

function RequestCard({ req, onStatus }) {
  const when = new Date(req.created_at).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });
  const isWO = req.request_type === "work-order";
  return (
    <div
      data-testid="admin-request-card"
      className="rounded-3xl border border-ink/5 bg-white p-6 transition-shadow duration-300 hover:shadow-[0_20px_40px_-24px_rgba(5,55,44,0.3)] md:p-7"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-white ${isWO ? "bg-coral" : "bg-lagoon"}`}>
              {isWO ? "Work order" : "Quote"}
            </span>
            {URGENCY_STYLES[req.urgency] && (
              <span className={`rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide ${URGENCY_STYLES[req.urgency]}`}>
                {req.urgency}
              </span>
            )}
            <span className="text-xs font-bold text-moss">Ref PP-{req.id.slice(-6).toUpperCase()}</span>
          </div>
          <h3 className="mt-2 font-display text-lg font-extrabold text-ink">{req.name}</h3>
          <p className="text-sm font-bold text-pine">{req.service}</p>
        </div>
        <select
          value={req.status || "new"}
          onChange={(e) => onStatus(req.id, e.target.value)}
          data-testid={`admin-status-select-${req.id}`}
          className="rounded-full border border-pine/15 bg-mintsoft px-4 py-2 text-xs font-extrabold text-pine focus:outline-none"
        >
          {STATUSES.map(([v, label]) => (
            <option key={v} value={v}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <p className="mt-4 rounded-2xl bg-cream p-4 text-sm leading-relaxed text-ink">{req.message}</p>
      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-moss">
        <a href={`tel:${req.phone}`} data-testid={`admin-request-phone-${req.id}`} className="flex items-center gap-2 font-bold text-pine hover:text-coral">
          <Phone className="h-4 w-4 text-coral" /> {req.phone}
        </a>
        <a href={`mailto:${req.email}`} data-testid={`admin-request-email-${req.id}`} className="flex items-center gap-2 hover:text-coral">
          <Mail className="h-4 w-4 text-coral" /> {req.email}
        </a>
        {req.city && (
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-coral" /> {req.city}
          </span>
        )}
        <span className="flex items-center gap-2">
          <Inbox className="h-4 w-4 text-coral" /> {req.customer_type}
        </span>
        <span className="ml-auto text-xs text-moss/70">{when}</span>
      </div>
    </div>
  );
}

export default function Admin() {
  const [authed, setAuthed] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api
      .get("/auth/me")
      .then((r) => setAuthed(r.data))
      .catch(() => setAuthed(false));
  }, []);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/quote-requests");
      setRequests(data);
    } catch (err) {
      if (err.response?.status === 401) setAuthed(false);
      else toast.error(formatApiErrorDetail(err.response?.data?.detail));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authed) load();
  }, [authed]);

  const onStatus = async (id, status) => {
    setRequests((rs) => rs.map((r) => (r.id === id ? { ...r, status } : r)));
    try {
      await api.patch(`/quote-requests/${id}/status`, { status });
      toast.success(
        status === "scheduled" || status === "completed"
          ? `Marked ${status} — customer notified by email`
          : `Marked ${status}`
      );
    } catch (err) {
      toast.error(formatApiErrorDetail(err.response?.data?.detail));
      load();
    }
  };

  const logout = async () => {
    await api.post("/auth/logout");
    setAuthed(false);
    setRequests([]);
  };

  return (
    <main data-testid="page-admin" className="min-h-screen bg-cream">
      <PageMeta title="Crew Coordinator Inbox | Property Perfect" description="Admin inbox for quote and work-order requests." />
      {authed === null ? (
        <div className="flex min-h-[70vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-pine" />
        </div>
      ) : authed === false ? (
        <LoginCard onAuthed={setAuthed} />
      ) : (
        <section className="mx-auto max-w-5xl px-5 pb-20 pt-28 md:px-8 md:pt-32">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-pine text-cream">
                <Leaf className="h-5 w-5" />
              </span>
              <div>
                <h1 className="font-display text-2xl font-extrabold text-ink md:text-3xl">Request Inbox</h1>
                <p className="text-sm text-moss">Quotes &amp; work orders from the website</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={load}
                data-testid="admin-refresh-button"
                className="inline-flex items-center gap-2 rounded-full border-2 border-pine/20 px-5 py-2.5 text-sm font-extrabold text-pine transition-all duration-300 hover:border-pine hover:bg-pine hover:text-cream"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Refresh
              </button>
              <button
                onClick={logout}
                data-testid="admin-logout-button"
                className="inline-flex items-center gap-2 rounded-full border-2 border-coral/30 px-5 py-2.5 text-sm font-extrabold text-coral-dark transition-all duration-300 hover:bg-coral hover:text-white"
              >
                <LogOut className="h-4 w-4" /> Log out
              </button>
            </div>
          </div>

          {loading && requests.length === 0 ? (
            <div className="mt-12 flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-pine" />
            </div>
          ) : requests.length === 0 ? (
            <div
              data-testid="admin-empty-state"
              className="mt-12 rounded-[2.5rem] border-2 border-dashed border-pine/20 bg-mintsoft/50 p-12 text-center"
            >
              <Inbox className="mx-auto h-10 w-10 text-pine" />
              <p className="mt-4 font-display text-xl font-extrabold text-ink">No requests yet</p>
              <p className="mt-2 text-sm text-moss">
                They&apos;ll appear here the moment a customer submits one — and you&apos;ll get an
                email alert at {COMPANY.email}.
              </p>
            </div>
          ) : (
            <div className="mt-8 space-y-5">
              {requests.map((r) => (
                <RequestCard key={r.id} req={r} onStatus={onStatus} />
              ))}
            </div>
          )}
        </section>
      )}
    </main>
  );
}

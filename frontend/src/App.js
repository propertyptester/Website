import { Component, useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation, Link } from "react-router-dom";
import Lenis from "lenis";
import { Toaster } from "./components/ui/sonner";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { err: false };
  }
  static getDerivedStateFromError() {
    return { err: true };
  }
  render() {
    if (this.state.err) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-cream p-8 text-center font-body text-ink">
          <div>
            <p className="font-display text-2xl font-extrabold">Something went sideways.</p>
            <p className="mt-2 text-moss">Please refresh the page — or call us at (402) 606-7011.</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function LenisSmooth() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    window.__lenis = lenis;
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);
  return null;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center bg-cream px-6 text-center" data-testid="page-not-found">
      <p className="font-script text-4xl text-coral">off the map?</p>
      <h1 className="mt-2 font-display text-4xl font-extrabold text-ink">This page wandered off the property.</h1>
      <Link
        to="/"
        data-testid="not-found-home-link"
        className="mt-8 rounded-full bg-coral px-8 py-4 font-extrabold text-white transition hover:bg-coral-dark"
      >
        Back to Home
      </Link>
    </main>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <LenisSmooth />
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      <Toaster position="top-center" richColors />
    </ErrorBoundary>
  );
}

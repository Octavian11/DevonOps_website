import { lazy, Suspense, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { globalCSS, COLORS, FONTS } from "./constants.js";
import themeCSS from "./theme.css?inline";
import { Nav, Footer } from "./components.jsx";
import LeverExplorer from "./pages/Levers.jsx";
const ServicesPage = lazy(() => import("./pages/Services.jsx"));
const ScorerPage = lazy(() => import("./pages/Scorer.jsx"));
const AboutPage = lazy(() => import("./pages/About.jsx"));
const ResourcesPage = lazy(() => import("./pages/Resources.jsx"));

const VALID_PAGES = ["levers", "services", "scorer", "about", "resources"];
const PAGE_ANNOUNCEMENTS = { levers: "Home", services: "Services and Method", scorer: "Score Your Deal", about: "About", resources: "Resources" };

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const mainRef = useRef(null);
  const initialRoute = useRef(true);

  const pathSegment = location.pathname.replace(/^\/pe\/?/, "") || "levers";
  const page = VALID_PAGES.includes(pathSegment) ? pathSegment : "levers";

  const setPage = (p, section) => {
    const route = p === "levers" ? "/pe/" : `/pe/${p}`;
    const destination = section ? `${route}#${section}` : route;
    if (`${location.pathname}${location.hash}` === destination && section) {
      const target = document.getElementById(section);
      if (target) window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 96, behavior: "smooth" });
      return;
    }
    navigate(destination);
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.setAttribute("data-style-layer", "devonshire-site");
    style.textContent = `${globalCSS}\n${themeCSS}`;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  useEffect(() => {
    const titles = {
      levers: "Devonshire Operations — Operational Diligence & Post-Close Execution for Private Equity",
      services: "Services, Method & Representative Value-Creation Levers — Devonshire Operations",
      scorer: "How Operationally Ready Is Your Deal? — Devonshire Operations",
      about: "About Hassan Tariq — Devonshire Operations",
      resources: "Resources & Tools — Devonshire Operations"
    };
    const descriptions = {
      levers: "Operator-led operational diligence and post-close execution for lower-middle-market PE, independent sponsors, and family offices—from LOI through the first 100 days.",
      services: "Fixed-fee operational diligence, Day-1 readiness, and 100-day execution, supported by a proprietary 355-lever research library and PE-fit rubric.",
      scorer: "A two-minute, six-domain assessment to identify possible operating risk in a private-equity deal and focus the next evidence request.",
      about: "Hassan Tariq applies 15+ years of institutional operating experience to lower-middle-market ownership transitions and post-close execution.",
      resources: "Operational-risk tools, illustrative deliverables, and practical perspectives for private-equity investors."
    };
    document.title = titles[page] || "Devonshire Operations";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement("meta"); meta.name = "description"; document.head.appendChild(meta); }
    meta.content = descriptions[page];
    const routePath = page === "levers" ? "/pe/" : `/pe/${page}`;
    const absoluteUrl = `https://www.devonshireops.com${routePath}`;
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = absoluteUrl;
    const setPropertyMeta = (property, content) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) { tag = document.createElement("meta"); tag.setAttribute("property", property); document.head.appendChild(tag); }
      tag.content = content;
    };
    setPropertyMeta("og:title", titles[page]);
    setPropertyMeta("og:description", descriptions[page]);
    setPropertyMeta("og:url", absoluteUrl);
    setPropertyMeta("og:site_name", "Devonshire Operations");
    setPropertyMeta("og:image", "https://www.devonshireops.com/img/hero-facade.jpg");
    const setNameMeta = (name, content) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) { tag = document.createElement("meta"); tag.name = name; document.head.appendChild(tag); }
      tag.content = content;
    };
    setNameMeta("twitter:title", titles[page]);
    setNameMeta("twitter:description", descriptions[page]);
    setNameMeta("twitter:image", "https://www.devonshireops.com/img/hero-facade.jpg");
  }, [location.pathname, page]);

  useEffect(() => {
    let cancelled = false;
    let retryTimer;
    const correctionTimers = [];
    const shouldMoveFocus = !initialRoute.current;
    initialRoute.current = false;
    const section = location.hash ? decodeURIComponent(location.hash.slice(1)) : "";

    if (!section) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      if (shouldMoveFocus) {
        window.setTimeout(() => mainRef.current?.focus(), 75);
      }
      return undefined;
    }

    let attempts = 0;
    const findAndScroll = () => {
      if (cancelled) return;
      const target = document.getElementById(section);
      if (target) {
        const alignTarget = (behavior = "auto") => {
          if (cancelled || !target.isConnected) return;
          const top = target.getBoundingClientRect().top + window.scrollY - 96;
          window.scrollTo({ top, left: 0, behavior });
        };
        alignTarget(shouldMoveFocus ? "smooth" : "auto");
        correctionTimers.push(window.setTimeout(() => alignTarget("auto"), 250));
        correctionTimers.push(window.setTimeout(() => alignTarget("auto"), 900));
        if (shouldMoveFocus) {
          const heading = target.matches("h1,h2,h3") ? target : target.querySelector("h1,h2,h3");
          if (heading) {
            heading.setAttribute("tabindex", "-1");
            heading.focus({ preventScroll: true });
          }
        }
        return;
      }
      attempts += 1;
      if (attempts < 50) retryTimer = window.setTimeout(findAndScroll, 40);
    };
    findAndScroll();

    return () => {
      cancelled = true;
      window.clearTimeout(retryTimer);
      correctionTimers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [location.pathname, location.hash]);

  const pages = {
    levers: <LeverExplorer setPage={setPage} />,
    services: <ServicesPage setPage={setPage} />,
    scorer: <ScorerPage setPage={setPage} />,
    about: <AboutPage setPage={setPage} />,
    resources: <ResourcesPage setPage={setPage} />,
  };

  return (
    <div style={{ minHeight: "100vh", background: COLORS.offWhite, fontFamily: FONTS.body }}>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Nav page={page} setPage={setPage} />
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{`Loaded ${PAGE_ANNOUNCEMENTS[page]} page`}</div>
      <Suspense fallback={<main id="main-content" tabIndex="-1" className="main-container"><div className="route-loading" role="status">Loading…</div></main>}>
        <main ref={mainRef} id="main-content" tabIndex="-1" className="main-container" style={{ maxWidth: "1200px", margin: "0 auto", paddingTop: "40px", paddingBottom: "80px" }}>
          {pages[page]}
        </main>
        <Footer setPage={setPage} />
      </Suspense>
    </div>
  );
}

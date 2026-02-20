import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { globalCSS, COLORS, FONTS } from "./constants.js";
import { Nav, Footer } from "./components.jsx";
import LeverExplorer from "./pages/Levers.jsx";
import ServicesPage from "./pages/Services.jsx";
import ScorerPage from "./pages/Scorer.jsx";
import AboutPage from "./pages/About.jsx";

const VALID_PAGES = ["levers", "services", "scorer", "about"];

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const pathSegment = location.pathname.replace(/^\/pe\/?/, "") || "levers";
  const page = VALID_PAGES.includes(pathSegment) ? pathSegment : "levers";

  const setPage = (p) => {
    navigate(p === "levers" ? "/pe/" : `/pe/${p}`);
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = globalCSS;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    const titles = {
      levers: "Operational Value Creation Levers — Devonshire Ops",
      services: "Services & Method — Devonshire Ops",
      scorer: "Ops Scorer — Devonshire Ops",
      about: "About — Devonshire Ops"
    };
    document.title = titles[page] || "Devonshire Ops";
  }, [location.pathname, page]);

  const pages = {
    levers: <LeverExplorer setPage={setPage} />,
    services: <ServicesPage />,
    scorer: <ScorerPage />,
    about: <AboutPage />,
  };

  return (
    <div style={{ minHeight: "100vh", background: COLORS.offWhite, fontFamily: FONTS.body }}>
      <Nav page={page} setPage={setPage} />
      <main className="main-container" style={{ maxWidth: "960px", margin: "0 auto", paddingTop: "40px", paddingBottom: "80px" }}>
        {pages[page]}
      </main>
      <Footer setPage={setPage} />
    </div>
  );
}

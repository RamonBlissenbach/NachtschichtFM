import React from "react";

const Footer: React.FC = () => (
  <footer
    className="w-100 mt-auto py-4 px-3 text-center"
    style={{
      background: "rgba(13, 16, 30, 0.85)",
      backdropFilter: "blur(8px)",
      borderTop: "1px solid #222",
      color: "#aaa",
      fontSize: "1rem",
      letterSpacing: "0.02em",
      zIndex: 10,
      position: "relative",
    }}
  >
    <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
      <div>
        <span className="fw-bold" style={{ color: "#fff" }}>
          Nachtschicht FM
        </span>{" "}
        &copy; {new Date().getFullYear()} &ndash; Dein Radio für die Nacht
      </div>
      <div>
        <a
          href="https://github.com/RamonBlissenbach/NachtschichtFM"
          target="_blank"
          rel="noopener noreferrer"
          className="text-decoration-none"
          style={{ color: "#646cff" }}
        >
          <i className="bi bi-github me-1"></i>GitHub
        </a>
        <span className="mx-2 text-muted">|</span>
        <a
          href="/impressum"
          className="text-decoration-none"
          style={{ color: "#aaa" }}
        >
          Impressum
        </a>
        <span className="mx-2 text-muted">|</span>
        <a
          href="/datenschutz"
          className="text-decoration-none"
          style={{ color: "#aaa" }}
        >
          Datenschutz
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
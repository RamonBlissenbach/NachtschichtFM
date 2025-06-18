import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/Header.css"; // Assuming you have a CSS file for styles

const Header: React.FC = () => (
  <div
    className="position-fixed top-0 start-50 translate-middle-x"
    style={{
      zIndex: 1050,
      width: "90%",
      maxWidth: "900px",
      marginTop: "1rem",
      backdropFilter: "blur(5px) ",
      WebkitBackdropFilter: "blur(5px)",
      background: "rgba(31, 38, 135, 0.1)",
      borderRadius: "1.5rem",
      boxShadow: "0 4px 16px 0 rgba(31, 38, 135, 0.37)",
      border: "1px solid rgba(255, 255, 255, 0.18)",
    }}
  >
    <div className="card shadow-lg rounded-4 text-white" style={{
      background: "transparent",
      border: "none",
      boxShadow: "none"
    }}>
      <nav className="navbar navbar-expand-lg navbar-dark px-3">
        <Link className="navbar-brand fw-bold" to="/">
          Nachtschicht FM
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/schedule">
                Programm
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                Über uns
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Kontakt
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
);

export default Header;
import "./AppBar.css";

import { Link } from "react-router-dom";
import { useState } from "react";

const AppBar = ({ logo, links = [], actions }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="appbar">
      <div className="appbar-container">

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link to={logo.to} className="logo">
            {logo.texto}
          </Link>

          <button
            className="appbar-toggle"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((s) => !s)}
          >
            <span className={`bar ${menuOpen ? "open" : ""}`}></span>
            <span className={`bar ${menuOpen ? "open" : ""}`}></span>
            <span className={`bar ${menuOpen ? "open" : ""}`}></span>
          </button>
        </div>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          {links.map((link, index) => (
            <Link key={index} to={link.to} onClick={() => setMenuOpen(false)}>
              {link.icone}
              <span>{link.texto}</span>
            </Link>
          ))}
        </nav>

        <div className="appbar-actions">
          {actions}
        </div>

      </div>
    </header>
  );
};

export default AppBar;
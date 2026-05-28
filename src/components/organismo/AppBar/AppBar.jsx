import "./AppBar.css";

import { Link } from "react-router-dom";

const AppBar = ({ logo, links = [], actions }) => {
  return (
    <header className="appbar">
      <div className="appbar-container">

        <Link to={logo.to} className="logo">
          {logo.texto}
        </Link>

        <nav className="nav-links">
          {links.map((link, index) => (
            <Link key={index} to={link.to}>
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
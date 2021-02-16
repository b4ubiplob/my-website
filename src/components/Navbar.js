import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-logo">
          My Art Gallery
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? "fas fa-times" : "fas fa-bars"} />
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/galleries"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Galleries
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/paintings"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Paintings
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;

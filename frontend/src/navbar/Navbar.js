import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css'; // We'll create this CSS file next
import { CodeIcon, HamburgetMenuClose, HamburgetMenuOpen } from "./Icons";

function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            <span> Agency Aggregator</span>
            {/* <i className="fas fa-code"></i> */}
            
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/login"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/register"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Register
              </NavLink>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            {/* <i className={click ? "fas fa-times" : "fas fa-bars"}></i> */}

            {click ? (
              <span className="icon">
              <HamburgetMenuClose />
            </span>
              
            ) : (
              <span className="icon">
                <HamburgetMenuOpen />{" "}
              </span>
              
            )}
          </div>
        </div>
      </nav>


    </>
    
  );
}


export default Navbar;
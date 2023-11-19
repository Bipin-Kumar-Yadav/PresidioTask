import React, { useState, useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [userId, setUserId] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("githubId");
    setUserId(null);
    window.location.href = "/";
  };

  useEffect(() => {
    const retrievedData = localStorage.getItem("githubId");
    if (retrievedData) {
      setUserId(retrievedData);
    }
  }, [userId]);

  return (
    <div className="nav_main">
      <nav className="navbar">
        {/* logo */}
        <div className="logo">
          <FaGithub />
        </div>

        {/* navitems        */}
        <ul className="links">
          <li>
            <Link className="nav_li" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="nav_li" to="/trending">
              Trending
            </Link>
          </li>
          <li>
            <Link className="nav_li" to="/fetchRepo">
              Repository
            </Link>
          </li>
          {userId && (
            <li>
              <Link className="nav_li" to="/starred">
                Starred
              </Link>
            </li>
          )}
        </ul>
        <ul>
          {userId && (
            <li onClick={handleLogout} to="/logout" className="btn lg_btn">
              <Link className="nav_li">Logout</Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;

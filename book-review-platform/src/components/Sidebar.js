import React from "react";
import "../styles/Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Book Review Platform</h2>
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li>
            <a href="#home" className="nav-link active">
              Home
            </a>
          </li>
          <li>
            <a href="#reviews" className="nav-link">
              All Reviews
            </a>
          </li>
          <li>
            <a href="#books" className="nav-link">
              Books
            </a>
          </li>
          <li>
            <a href="#authors" className="nav-link">
              Authors
            </a>
          </li>
          <li>
            <a href="#genres" className="nav-link">
              Genres
            </a>
          </li>
          <li>
            <a href="#my-reviews" className="nav-link">
              My Reviews
            </a>
          </li>
          <li>
            <a href="#favorites" className="nav-link">
              Favorites
            </a>
          </li>
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="avatar">👤</div>
          <span>Your Profile</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

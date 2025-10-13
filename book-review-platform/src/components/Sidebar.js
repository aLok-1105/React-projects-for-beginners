import React from "react";
import "../styles/Sidebar.css";
import { Home, Heart, TrendingUp, BookOpen, User, Settings } from "lucide-react";

const Sidebar = () => {
  const navItems = [
    { icon: Home, label: "Home", active: true },
    { icon: TrendingUp, label: "All Reviews" },
    { icon: BookOpen, label: "Books" },
    { icon: Heart, label: "Favorites" },
    { icon: User, label: "My Reviews" },
    { icon: Settings, label: "Settings" },
  ];

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-header">
        <div className="logo-container">
          <div className="logo-icon">
            <BookOpen className="book-icon" />
          </div>
          <span className="logo-text">bookr</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <ul>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.label}>
                <button
                  className={`nav-link ${item.active ? "active" : ""}`}
                >
                  <Icon className="nav-icon" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="avatar">
            <User className="avatar-icon" />
          </div>
          <div className="user-info">
            <p className="user-name">BookLover</p>
            <p className="user-handle">@booklover23</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

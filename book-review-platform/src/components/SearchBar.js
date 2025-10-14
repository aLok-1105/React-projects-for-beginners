import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";

export const SearchBar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 4);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`search-bar ${scrolled ? "is-scrolled" : ""}`}>
      <div className="search-container">
        <div className="search-input-container">
          <Search className="search-icon" />
          <input
            type="search"
            placeholder="Search for books, authors, or reviews..."
            className="search-input"
          />
        </div>
      </div>
    </div>
  );
};

import React from "react";
import { Search } from "lucide-react";

export const SearchBar = () => {
  return (
    <div className="search-bar">
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

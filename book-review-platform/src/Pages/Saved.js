import React, { useState, useEffect } from "react";
import { getSavedBooks } from "../utils/savedBooks";
import { BookCard } from "../components/BookCard";

const Saved = () => {
  const [savedBooks, setSavedBooks] = useState([]);

  // Listen for savedBooks:updated event to refresh list
  useEffect(() => {
    const loadBooks = () => setSavedBooks(getSavedBooks());
    loadBooks();
    window.addEventListener("savedBooks:updated", loadBooks);
    return () => window.removeEventListener("savedBooks:updated", loadBooks);
  }, []);

  return (
    <main
      style={{
        padding: "2rem",
        marginLeft: "280px",
        minHeight: "100vh",
        background: "#f8f9fa",
      }}
    >
      <h1>Saved</h1>
      {savedBooks.length === 0 ? (
        <p style={{ marginTop: "2rem", color: "#888" }}>
          You haven't saved any books yet. Click the bookmark icon on a book to
          save it!
        </p>
      ) : (
        <div className="reviews-container">
          {savedBooks.map((book) => (
            <BookCard key={book.id} {...book} />
          ))}
        </div>
      )}
    </main>
  );
};

export default Saved;

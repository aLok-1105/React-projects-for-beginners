import React, { useEffect, useState } from "react";
import { getUser } from "../utils/auth";
import {
  getReviewedBooksForUser,
  upsertReviewedBookForUser,
} from "../utils/reviewedBooks";
import { getAllReviews } from "../utils/reviews";
import { getSavedBooks } from "../utils/savedBooks";
import { getBookById } from "../services/googleBooksApi";
import { BookCard } from "../components/BookCard";

const MyReview = () => {
  const [books, setBooks] = useState([]);

  const load = async () => {
    const user = getUser();
    if (!user) {
      setBooks([]);
      return;
    }

    // Step 1: Ensure previously-reviewed books are included (migration)
    try {
      const all = getAllReviews();
      const userBookIds = Object.keys(all).filter((bookId) =>
        Array.isArray(all[bookId])
          ? all[bookId].some((r) => r?.userName === user.name)
          : false
      );

      if (userBookIds.length > 0) {
        const existing = getReviewedBooksForUser(user.name);
        const existingIds = new Set(existing.map((b) => String(b.id)));

        const saved = getSavedBooks();
        const savedMap = new Map(saved.map((b) => [String(b.id), b]));

        // Fetch details for missing ones (prefer saved, else API)
        const tasks = userBookIds
          .filter((bid) => !existingIds.has(String(bid)))
          .map(async (bid) => {
            let bookObj = savedMap.get(String(bid));
            if (!bookObj) {
              try {
                // Fallback to API to get book details
                const fetched = await getBookById(bid);
                bookObj = fetched;
              } catch (e) {
                // Last resort: minimal placeholder
                bookObj = {
                  id: bid,
                  title: "Book",
                  author: "",
                  cover: "/placeholder-book.jpg",
                  genre: "General",
                  description: "",
                  rating: 0,
                  reviewCount: 0,
                };
              }
            }
            upsertReviewedBookForUser(user.name, bookObj);
          });

        if (tasks.length) {
          await Promise.all(tasks);
        }
      }
    } catch (e) {
      // Non-blocking; continue with what we have
      console.warn("MyReview migration warning:", e);
    }

    // Step 2: Load consolidated list
    setBooks(getReviewedBooksForUser(user.name));
  };

  useEffect(() => {
    // initial load and migration
    load();
    const onUser = () => load();
    const onReviewed = () => load();
    const onReviews = () => load();
    window.addEventListener("user:updated", onUser);
    window.addEventListener("reviewedBooks:updated", onReviewed);
    window.addEventListener("reviews:updated", onReviews);
    return () => {
      window.removeEventListener("user:updated", onUser);
      window.removeEventListener("reviewedBooks:updated", onReviewed);
      window.removeEventListener("reviews:updated", onReviews);
    };
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
      <h1>My Reviews</h1>
      {books.length === 0 ? (
        <p style={{ marginTop: "2rem", color: "#888" }}>
          You haven't reviewed any books yet. Click Review on a book to add your
          rating and text.
        </p>
      ) : (
        <div className="reviews-container">
          {books.map((book) => (
            <BookCard key={book.id} {...book} />
          ))}
        </div>
      )}
    </main>
  );
};

export default MyReview;

import React, { useState, useEffect } from "react";
import "../styles/MainContent.css";
import { SearchBar } from "./SearchBar";
import { BookCard } from "./BookCard";
import {
  getFeaturedBooks,
  searchBooks,
  transformGoogleBooksResponse,
  addMockReviewData,
} from "../services/googleBooksApi";

// Sample book reviews data (fallback)
const sampleBooks = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    cover:
      "https://books.google.com/books/content?id=iJZYAAAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    rating: 4.5,
    reviewCount: 234,
    genre: "Classic Literature",
    review:
      "A masterpiece of American literature. Fitzgerald's prose is beautiful and the story of Jay Gatsby is both tragic and captivating. The themes of love, wealth, and the American Dream are expertly woven throughout.",
    reviewer: "Sarah Johnson",
    reviewerAvatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b765?w=150",
    date: "2024-01-15",
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    cover:
      "https://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    rating: 5,
    reviewCount: 189,
    genre: "Fiction",
    review:
      "An incredible story about justice, morality, and growing up in the American South. Scout's perspective is both innocent and profound. This book tackles difficult subjects with grace and power.",
    reviewer: "Michael Chen",
    reviewerAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    date: "2024-01-10",
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    cover:
      "https://books.google.com/books/content?id=kotPYEqx7kMC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    rating: 4.8,
    reviewCount: 312,
    genre: "Dystopian",
    review:
      "A chilling dystopian novel that feels more relevant than ever. Orwell's vision of a totalitarian society is both terrifying and thought-provoking. The concepts of Big Brother and doublethink are unforgettable.",
    reviewer: "Emma Williams",
    reviewerAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    date: "2024-01-08",
  },
];

const MainContent = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Fetch featured books on component mount
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getFeaturedBooks(12);
        const transformedBooks = transformGoogleBooksResponse(response);
        const booksWithReviews = transformedBooks.map(addMockReviewData);
        setBooks(booksWithReviews);
      } catch (err) {
        setError("Failed to fetch books. Please try again later.");
        console.error("Error fetching books:", err);
        // Fallback to sample data if API fails
        setBooks(sampleBooks);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Handle search functionality
  const handleSearch = async (query) => {
    if (!query.trim()) {
      // If empty query, reload featured books
      setSearchQuery("");
      setIsSearching(false);
      const response = await getFeaturedBooks(12);
      const transformedBooks = transformGoogleBooksResponse(response);
      const booksWithReviews = transformedBooks.map(addMockReviewData);
      setBooks(booksWithReviews);
      return;
    }

    try {
      setIsSearching(true);
      setSearchQuery(query);
      setError(null);

      const response = await searchBooks(query, 15);
      const transformedBooks = transformGoogleBooksResponse(response);
      const booksWithReviews = transformedBooks.map(addMockReviewData);
      setBooks(booksWithReviews);
    } catch (err) {
      setError(`Failed to search for "${query}". Please try again.`);
      console.error("Error searching books:", err);
    } finally {
      setIsSearching(false);
    }
  };

  if (loading) {
    return (
      <div className="main-content">
        <SearchBar />
        <header className="content-header">
          <h1>Discover Your Next Favorite Book</h1>
          <p>Loading amazing books for you...</p>
        </header>
        <div className="reviews-container">
          <div className="loading-message">
            <p>🔍 Searching for great books...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <SearchBar onSearch={handleSearch} />

      <header className="content-header">
        <h1>
          {searchQuery
            ? `Search Results for "${searchQuery}"`
            : "Discover Your Next Favorite Book"}
        </h1>
        <p>
          {searchQuery
            ? `Found ${books.length} book${
                books.length !== 1 ? "s" : ""
              } matching your search`
            : "See what others are reading and share your thoughts"}
          {isSearching && " - Searching..."}
        </p>
        {error && (
          <div className="error-message">
            <p>⚠️ {error}</p>
            <p>Showing available books instead.</p>
          </div>
        )}
      </header>

      <div className="reviews-container">
        {books.map((book) => (
          <BookCard
            key={book.id}
            title={book.title}
            author={book.author}
            cover={book.cover}
            rating={book.rating}
            reviewCount={book.reviewCount}
            genre={book.genre}
            review={book.review}
            reviewer={book.reviewer}
            reviewerAvatar={book.reviewerAvatar}
          />
        ))}
      </div>

      {/* Add more content to demonstrate scrolling */}
      <div className="content-section">
        <h2>Featured Books</h2>
        <div className="featured-books">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="book-card">
              <div className="book-cover">📖</div>
              <h4>Featured Book {i}</h4>
              <p>Author Name</p>
            </div>
          ))}
        </div>
      </div>

      <div className="content-section">
        <h2>Popular Authors</h2>
        <div className="authors-grid">
          {[
            "Jane Austen",
            "George Orwell",
            "Harper Lee",
            "F. Scott Fitzgerald",
            "J.D. Salinger",
            "Charles Dickens",
          ].map((author) => (
            <div key={author} className="author-card">
              <div className="author-avatar">👤</div>
              <h4>{author}</h4>
              <p>Author</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainContent;

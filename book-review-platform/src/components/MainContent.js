import React from "react";
import "../styles/MainContent.css";
import { SearchBar } from "./SearchBar";
import { BookCard } from "./BookCard";

const MainContent = () => {
  // Sample book reviews data
  const reviews = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      cover: "https://covers.openlibrary.org/b/id/8225261-M.jpg",
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
      cover: "https://covers.openlibrary.org/b/id/8228691-M.jpg",
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
      cover: "https://covers.openlibrary.org/b/id/7222246-M.jpg",
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
    {
      id: 4,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      cover: "https://covers.openlibrary.org/b/id/8091016-M.jpg",
      rating: 4.3,
      reviewCount: 156,
      genre: "Romance",
      review:
        "Austen's wit and social commentary shine in this romantic classic. Elizabeth Bennet is a wonderfully strong heroine, and the relationship with Mr. Darcy is perfectly developed.",
      reviewer: "David Rodriguez",
      reviewerAvatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      date: "2024-01-05",
    },
    {
      id: 5,
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      cover: "https://covers.openlibrary.org/b/id/8677531-M.jpg",
      rating: 3.9,
      reviewCount: 98,
      genre: "Coming of Age",
      review:
        "Holden Caulfield's voice is unique and memorable. While some find him annoying, I think Salinger captures the alienation and confusion of adolescence perfectly.",
      reviewer: "Lisa Thompson",
      reviewerAvatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
      date: "2024-01-03",
    },
  ];

  return (
    <div className="main-content">
      <SearchBar />

      <header className="content-header">
        <h1>Latest Book Reviews</h1>
        <p>Discover what others are reading and share your thoughts</p>
      </header>

      <div className="reviews-container">
        {reviews.map((review) => (
          <BookCard
            key={review.id}
            title={review.title}
            author={review.author}
            cover={review.cover}
            rating={review.rating}
            reviewCount={review.reviewCount}
            genre={review.genre}
            review={review.review}
            reviewer={review.reviewer}
            reviewerAvatar={review.reviewerAvatar}
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

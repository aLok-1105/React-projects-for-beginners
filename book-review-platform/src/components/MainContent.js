import React from "react";
import "../styles/MainContent.css";
import { SearchBar } from "./SearchBar";

const MainContent = () => {
  // Sample book reviews data
  const reviews = [
    {
      id: 1,
      bookTitle: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      rating: 4.5,
      reviewText:
        "A masterpiece of American literature. Fitzgerald's prose is beautiful and the story of Jay Gatsby is both tragic and captivating. The themes of love, wealth, and the American Dream are expertly woven throughout.",
      reviewer: "Sarah Johnson",
      date: "2024-01-15",
    },
    {
      id: 2,
      bookTitle: "To Kill a Mockingbird",
      author: "Harper Lee",
      rating: 5,
      reviewText:
        "An incredible story about justice, morality, and growing up in the American South. Scout's perspective is both innocent and profound. This book tackles difficult subjects with grace and power.",
      reviewer: "Michael Chen",
      date: "2024-01-10",
    },
    {
      id: 3,
      bookTitle: "1984",
      author: "George Orwell",
      rating: 4.8,
      reviewText:
        "A chilling dystopian novel that feels more relevant than ever. Orwell's vision of a totalitarian society is both terrifying and thought-provoking. The concepts of Big Brother and doublethink are unforgettable.",
      reviewer: "Emma Williams",
      date: "2024-01-08",
    },
    {
      id: 4,
      bookTitle: "Pride and Prejudice",
      author: "Jane Austen",
      rating: 4.3,
      reviewText:
        "Austen's wit and social commentary shine in this romantic classic. Elizabeth Bennet is a wonderfully strong heroine, and the relationship with Mr. Darcy is perfectly developed.",
      reviewer: "David Rodriguez",
      date: "2024-01-05",
    },
    {
      id: 5,
      bookTitle: "The Catcher in the Rye",
      author: "J.D. Salinger",
      rating: 3.9,
      reviewText:
        "Holden Caulfield's voice is unique and memorable. While some find him annoying, I think Salinger captures the alienation and confusion of adolescence perfectly.",
      reviewer: "Lisa Thompson",
      date: "2024-01-03",
    },
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="star filled">
          ★
        </span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="star half">
          ☆
        </span>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="star empty">
          ☆
        </span>
      );
    }

    return stars;
  };

  return (
    <div className="main-content">
      <SearchBar />

      <header className="content-header">
        <h1>Latest Book Reviews</h1>
        <p>Discover what others are reading and share your thoughts</p>
      </header>

      <div className="reviews-container">
        {reviews.map((review) => (
          <div key={review.id} className="review-card">
            <div className="review-header">
              <div className="book-info">
                <h3 className="book-title">{review.bookTitle}</h3>
                <p className="book-author">by {review.author}</p>
              </div>
              <div className="rating">
                <div className="stars">{renderStars(review.rating)}</div>
                <span className="rating-number">{review.rating}/5</span>
              </div>
            </div>

            <div className="review-body">
              <p className="review-text">{review.reviewText}</p>
            </div>

            <div className="review-footer">
              <div className="reviewer-info">
                <span className="reviewer-name">
                  Reviewed by {review.reviewer}
                </span>
                <span className="review-date">
                  {new Date(review.date).toLocaleDateString()}
                </span>
              </div>
              <div className="review-actions">
                <button className="action-btn">👍 Helpful</button>
                <button className="action-btn">💬 Comment</button>
              </div>
            </div>
          </div>
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

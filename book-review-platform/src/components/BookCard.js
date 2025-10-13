import React, { useState } from "react";
import { Star, Heart, MessageCircle, Bookmark } from "lucide-react";

export const BookCard = ({
  title,
  author,
  cover,
  rating,
  reviewCount,
  genre,
  review,
  reviewer,
  reviewerAvatar,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="book-card-modern">
      <div className="book-card-content">
        {/* Book Cover */}
        <div className="book-cover-container">
          <div className="book-cover-image">
            <img
              src={cover}
              alt={title}
              onError={(e) => {
                e.target.src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='176' viewBox='0 0 128 176'%3E%3Crect width='128' height='176' fill='%23e9ecef'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='40' fill='%236c757d'%3E📖%3C/text%3E%3C/svg%3E";
              }}
            />
          </div>
        </div>

        {/* Book Details */}
        <div className="book-details">
          <div className="book-header">
            <div className="book-main-info">
              <h3 className="book-card-title">{title}</h3>
              <p className="book-card-author">by {author}</p>

              <div className="rating-info">
                <div className="stars-container">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`star-icon ${
                        i < Math.floor(rating) ? "star-filled" : "star-empty"
                      }`}
                    />
                  ))}
                  <span className="rating-text">{rating}</span>
                </div>
                <span className="review-count">{reviewCount} reviews</span>
              </div>

              <div className="genre-badge">{genre}</div>
            </div>
          </div>

          {/* Review Section */}
          <div className="review-section">
            <div className="reviewer-info">
              <div className="reviewer-avatar">
                <img
                  src={reviewerAvatar}
                  alt={reviewer}
                  onError={(e) => {
                    e.target.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='12' r='12' fill='%23e9ecef'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='12' fill='%236c757d'%3E👤%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
              <span className="reviewer-name">{reviewer}</span>
            </div>
            <p className="review-text">{review}</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="book-card-actions">
        <button
          className={`action-button ${isLiked ? "liked" : ""}`}
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart className={`action-icon ${isLiked ? "filled" : ""}`} />
          <span>Like</span>
        </button>
        <button className="action-button">
          <MessageCircle className="action-icon" />
          <span>Comment</span>
        </button>
        <button
          className={`action-button save-button ${isSaved ? "saved" : ""}`}
          onClick={() => setIsSaved(!isSaved)}
        >
          <Bookmark className={`action-icon ${isSaved ? "filled" : ""}`} />
        </button>
      </div>
    </div>
  );
};

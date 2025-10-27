import React, { useState, useEffect } from "react";
import { Star, Heart, Bookmark, MessageCircle } from "lucide-react";
import { saveBook, unsaveBook, isBookSaved } from "../utils/savedBooks";
import { getBookStats, addReview, getUserReview } from "../utils/reviews";
import { getUser } from "../utils/auth";

export const BookCard = ({
  id,
  title,
  author,
  cover,
  rating: initialRating,
  reviewCount: initialReviewCount,
  genre,
  review,
  description,
  reviewer,
  reviewerAvatar,
  showReviewContent = false, // require explicit opt-in to show default reviews
  // ...otherProps
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [rating, setRating] = useState(initialRating || 0);
  const [reviewCount, setReviewCount] = useState(initialReviewCount || 0);
  const [hoverRating, setHoverRating] = useState(0);
  const descriptionText = description ?? review;

  // Initialize isSaved from localStorage and load real-time ratings
  useEffect(() => {
    if (id !== undefined) {
      setIsSaved(isBookSaved(id));

      // Load real ratings from reviews
      const stats = getBookStats(id);
      setRating(stats.rating);
      setReviewCount(stats.reviewCount);
    }
    // eslint-disable-next-line
  }, [id]);

  // Listen for review updates
  useEffect(() => {
    const handleReviewUpdate = (e) => {
      if (e.detail?.bookId === id) {
        const stats = getBookStats(id);
        setRating(stats.rating);
        setReviewCount(stats.reviewCount);
      }
    };

    window.addEventListener("reviews:updated", handleReviewUpdate);
    return () =>
      window.removeEventListener("reviews:updated", handleReviewUpdate);
  }, [id]);

  const handleSaveClick = () => {
    if (isSaved) {
      unsaveBook(id);
      setIsSaved(false);
    } else {
      // Save all book props needed for BookCard
      saveBook({
        id,
        title,
        author,
        cover,
        rating,
        reviewCount,
        genre,
        review,
        description,
        reviewer,
        reviewerAvatar,
      });
      setIsSaved(true);
    }
    // Optionally, dispatch an event to notify sidebar/favorites
    window.dispatchEvent(new Event("savedBooks:updated"));
  };

  const handleStarClick = (starRating) => {
    // Quick rate - add a rating without text review
    const user = getUser();
    if (!user) {
      alert("Please sign in to rate books");
      return;
    }

    const existingReview = getUserReview(id, user.name);

    const success = addReview(id, {
      rating: starRating,
      text: existingReview?.text || "", // Preserve existing review text if any
      userName: user.name,
      userAvatar: user.avatarUrl || "",
    });

    if (success && existingReview) {
      // Optional: Show a brief notification that rating was updated
      console.log(
        "Rating updated from",
        existingReview.rating,
        "to",
        starRating
      );
    }
  };

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
                        i < Math.floor(hoverRating || rating)
                          ? "star-filled"
                          : "star-empty"
                      } star-interactive`}
                      onClick={() => handleStarClick(i + 1)}
                      onMouseEnter={() => setHoverRating(i + 1)}
                      onMouseLeave={() => setHoverRating(0)}
                    />
                  ))}
                  <span className="rating-text">
                    {rating > 0 ? rating : "No ratings yet"}
                  </span>
                </div>
                <span className="review-count">
                  {reviewCount} {reviewCount === 1 ? "review" : "reviews"}
                </span>
              </div>

              <div className="genre-badge">{genre}</div>
            </div>
          </div>

          {/* Book description under title (always show if present) */}
          {descriptionText ? (
            <div className="review-section">
              <p className="review-text">{descriptionText}</p>
            </div>
          ) : null}
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
        <button
          className={`action-button save-button ${isSaved ? "saved" : ""}`}
          onClick={handleSaveClick}
          aria-label={isSaved ? "Unsave book" : "Save book"}
        >
          <Bookmark className={`action-icon ${isSaved ? "filled" : ""}`} />
        </button>
      </div>

      {/* Reviewer / Placeholder - Below Actions */}
      <div className="reviewer-section">
        {showReviewContent && review ? (
          <div className="reviewer-info">
            <span className="reviewer-name">{reviewer}</span>
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
          </div>
        ) : (
          <div className="review-placeholder">
            <div className="review-input-mock">
              <MessageCircle className="review-input-icon" />
              <span className="review-input-text">
                Be the first to review...
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

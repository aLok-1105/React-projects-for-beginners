import React, { useState, useEffect } from "react";
import { Star, X } from "lucide-react";
import { addReview, getUserReview } from "../utils/reviews";
import { getUser } from "../utils/auth";
import "../styles/ReviewModal.css";

export const ReviewModal = ({ bookId, bookTitle, onClose }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Load existing review if user has already reviewed this book
  useEffect(() => {
    const user = getUser();
    if (user) {
      const existingReview = getUserReview(bookId, user.name);
      if (existingReview) {
        setRating(existingReview.rating);
        setReviewText(existingReview.text || "");
        setIsEditing(true);
      }
    }
  }, [bookId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = getUser();
    if (!user) {
      alert("Please sign in to submit a review");
      return;
    }

    if (rating === 0) {
      alert("Please select a rating");
      return;
    }

    setSubmitting(true);

    const success = addReview(bookId, {
      rating,
      text: reviewText.trim(),
      userName: user.name,
      userAvatar: user.avatarUrl || "",
    });

    setSubmitting(false);

    if (success) {
      onClose();
    } else {
      alert("Failed to submit review. Please try again.");
    }
  };

  return (
    <div className="review-modal-overlay" onClick={onClose}>
      <div
        className="review-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="review-modal-header">
          <h2>
            {isEditing ? "Edit Your Review" : "Review"}: {bookTitle}
          </h2>
          <button
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="review-form">
          <div className="form-group">
            <label className="form-label">Your Rating *</label>
            <div className="star-rating-input">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={32}
                  className={`star-input ${
                    star <= (hoverRating || rating)
                      ? "star-filled"
                      : "star-empty"
                  }`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                />
              ))}
              <span className="rating-label">
                {rating > 0
                  ? `${rating} star${rating > 1 ? "s" : ""}`
                  : "Click to rate"}
              </span>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="review-text">
              Your Review (Optional)
            </label>
            <textarea
              id="review-text"
              className="review-textarea"
              rows="5"
              placeholder="Share your thoughts about this book..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              maxLength={1000}
            />
            <div className="char-count">
              {reviewText.length}/1000 characters
            </div>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting || rating === 0}
            >
              {submitting
                ? "Submitting..."
                : isEditing
                ? "Update Review"
                : "Submit Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

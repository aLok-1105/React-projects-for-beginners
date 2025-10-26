import React from 'react'
function BookCard({ book }) {
  return (
    <div className="book-card">
      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Price:</strong> ${book.price}</p>
      <button>Add to Cart</button>
    </div>
  )
}
export default BookCard
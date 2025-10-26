import React from 'react'
import BookCard from './BookCard'
function BookList() {
  const books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price: 10.99 },
    { id: 2, title: '1984', author: 'George Orwell', price: 12.50 },
    { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', price: 9.75 },
  ]
  return (
    <div className="book-list">
      {books.map(book => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  )
}
export default BookList
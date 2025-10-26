import './App.css'
import BookList from './components/BookList'
import ThemeToggle from './components/ThemeToggle'
function App() {
  return (
    <div className="App">
      <header>
        <h1>My Online Bookstore</h1>
        <ThemeToggle />
      </header>
      <BookList />
    </div>
  )
}
export default App
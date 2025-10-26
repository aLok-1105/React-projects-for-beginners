import { createContext, useState, useContext, useEffect } from 'react'
const ThemeContext = createContext()
export const useTheme = () => useContext(ThemeContext)
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'light'
  )
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'))
  }
  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
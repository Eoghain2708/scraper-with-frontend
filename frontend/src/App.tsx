import './App.css'
import { Routes, Route } from "react-router-dom"
import SearchPage from './pages/SearchPage'

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<SearchPage />} />
    </Routes>
    </>
  )
}

export default App

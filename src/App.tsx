import './App.css'
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import QuizPage from './pages/QuizPage'
import { HashRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <HashRouter>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/quiz" element={<QuizPage />} />
        </Routes>
      </div>
    </HashRouter>
  )
}

export default App

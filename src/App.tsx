import './App.css'
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import QuizPage from './pages/QuizPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'

const AppContent: React.FC = () => {
  return (
    <div className="App">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/quiz" element={<QuizPage />} />
        </Routes>
      </main>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App

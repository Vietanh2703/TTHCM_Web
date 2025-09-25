import './App.css'
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import QuizPage from './pages/QuizPage'
import AdBlockDetector from './components/AdBlockDetector'
import Footer from './components/Footer'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import { Analytics } from "@vercel/analytics/react"

const AppContent: React.FC = () => {
  return (
    <div className="App">
      <AdBlockDetector />
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/quiz" element={<QuizPage />} />
        </Routes>
      </main>
      <Analytics />
      <Footer />
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

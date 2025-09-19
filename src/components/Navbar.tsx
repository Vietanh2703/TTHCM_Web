import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Navbar.css'

const Navbar: React.FC = () => {
  const navigate = useNavigate()

  const handleHomeClick = () => {
    navigate('/')
  }

  const handleQuizClick = () => {
    navigate('/quiz')
  }

  return (
    <nav className="hcm-navbar" aria-label="Điều hướng chính">
      <div className="hcm-navbar__inner">
        <button onClick={handleHomeClick} className="hcm-navbar__brand" aria-label="Trang chủ">
          <span className="hcm-navbar__title">Tư tưởng Hồ Chí Minh về con người</span>
        </button>

        <input type="checkbox" id="hcm-nav-toggle" className="hcm-navbar__toggle" aria-label="Mở menu" />
        <label htmlFor="hcm-nav-toggle" className="hcm-navbar__burger" aria-hidden>
          <span></span>
          <span></span>
          <span></span>
        </label>

        <div className="hcm-navbar__actions">
          <button className="hcm-btn hcm-btn--primary" onClick={handleQuizClick} aria-label="Làm bài trắc nghiệm">
            Trắc nghiệm
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

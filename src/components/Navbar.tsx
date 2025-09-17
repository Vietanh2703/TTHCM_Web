import React from 'react'
import './Navbar.css'

const Navbar: React.FC = () => {
  return (
    <nav className="hcm-navbar" aria-label="Điều hướng chính">
      <div className="hcm-navbar__inner">
        <a href="#" className="hcm-navbar__brand" aria-label="Trang chủ">
          <span className="hcm-navbar__title">Tư tưởng Hồ Chí Minh về con người</span>
        </a>

        <input type="checkbox" id="hcm-nav-toggle" className="hcm-navbar__toggle" aria-label="Mở menu" />
        <label htmlFor="hcm-nav-toggle" className="hcm-navbar__burger" aria-hidden>
          <span></span>
          <span></span>
          <span></span>
        </label>

        <div className="hcm-navbar__actions">
          <a className="hcm-btn hcm-btn--primary" href="#/quiz" aria-label="Làm bài trắc nghiệm">Trắc nghiệm</a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

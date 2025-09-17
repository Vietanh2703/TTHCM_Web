import React from 'react'
import './Navbar.css'

// Simple lotus icon SVG aligned with Vietnamese aesthetics
const LotusIcon: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M32 10c5 7 6 13 6 13s6-3 12-1c-2 8-10 12-10 12s6 1 10 6c-7 3-14 1-18-1-4 2-11 4-18 1 4-5 10-6 10-6s-8-4-10-12c6-2 12 1 12 1s1-6 6-13Z" fill="currentColor" />
  </svg>
)

const Navbar: React.FC = () => {
  return (
    <nav className="hcm-navbar" aria-label="Điều hướng chính">
      <div className="hcm-navbar__inner">
        <a href="#" className="hcm-navbar__brand" aria-label="Trang chủ">
          <span className="hcm-navbar__icon" aria-hidden>
            <LotusIcon />
          </span>
          <span className="hcm-navbar__title">Tư tưởng HCM</span>
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

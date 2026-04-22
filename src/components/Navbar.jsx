import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useUser } from '../context/UserContext.jsx'
import Logo from './Logo.jsx'
import './Navbar.css'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [homeDropdown, setHomeDropdown] = useState(false)
  const { user } = useUser()
  const location = useLocation()

  const isOrg = user.role === 'organization'

  const hideOn = ['/login', '/register', '/role']
  if (hideOn.includes(location.pathname)) return null

  return (
    <header className="nav-wrap">
      <div className="container nav">
        <Link to="/" className="nav-logo-link" aria-label="inpLace home">
          <Logo size={54} />
        </Link>

        <nav className={`nav-links ${open ? 'open' : ''}`} aria-label="Primary">
          {isOrg ? (
            <>
              <NavLink to="/organization/opportunities" onClick={() => setOpen(false)}>Opportunities</NavLink>
              <NavLink to="/organization/top-volunteers" onClick={() => setOpen(false)}>Top Volunteers</NavLink>
              <NavLink to="/organization/profile" onClick={() => setOpen(false)}>Profile</NavLink>
            </>
          ) : (
            <>
              {/* Home with dropdown */}
              <div
                className="nav-dropdown"
                onMouseEnter={() => setHomeDropdown(true)}
                onMouseLeave={() => setHomeDropdown(false)}
              >
                <NavLink to="/" onClick={() => setOpen(false)} end>
                  Home
                  <svg className="nav-caret" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </NavLink>
                {homeDropdown && (
                  <div className="nav-dropdown-menu">
                    <a href="/#about">About Us</a>
                    <a href="/#how-it-works">How It Works</a>
                    <a href="/#impact">Impact</a>
                    <a href="/#guide">Volunteer Guide</a>
                    <a href="/#stories">Success Stories</a>
                  </div>
                )}
              </div>
              <a href="/#how-it-works" onClick={() => setOpen(false)}>How it works</a>
              <a href="/#impact" onClick={() => setOpen(false)}>Impact</a>
              <NavLink to="/opportunities" onClick={() => setOpen(false)}>Top Opportunities</NavLink>
              {/* Rewards — no dropdown caret */}
              <NavLink to="/rewards" onClick={() => setOpen(false)}>Rewards</NavLink>
            </>
          )}
        </nav>

        <div className="nav-cta">
          {user.role ? (
            <Link
              to={isOrg ? '/organization/profile' : '/volunteer/profile'}
              className="nav-avatar"
              title={user.name || 'Account'}
              aria-label="View profile"
            >
              {(user.name || 'U').slice(0, 1).toUpperCase()}
            </Link>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost nav-btn-sm">Login</Link>
              <Link to="/register" className="btn btn-primary nav-btn-sm">Register</Link>
            </>
          )}
          <button
            className="nav-toggle"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  )
}

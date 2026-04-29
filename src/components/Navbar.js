import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { updateUser, setSelectedRole } from '../redux/UserSlice'
import { resetVolunteer } from '../redux/VolunteerSlice'
import { resetOrganization } from '../redux/OrgSlice'
import { clearApplications } from '../redux/ApplicationsSlice'
import Logo from './Logo/Logo.js'
import './Navbar.css'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [homeOpen, setHomeOpen] = useState(false)
  const [userOpen, setUserOpen] = useState(false)

  const dispatch = useDispatch()
  const volunteer = useSelector((state) => state.volunteer);
  const organization = useSelector((state) => state.organization);
  const applications = useSelector((state) => state.applications.applications);
  const user = useSelector((state) => state.user.user);
  const selectedRole = useSelector((state) => state.user.selectedRole);
  const location = useLocation()

  const isOrg = selectedRole === 'organization'

  const hideOn = ['/login', '/register', '/role']
  if (hideOn.includes(location?.pathname)) return null  // hide navbar on login, register, role pages

  const toggleNavbar = () => setIsOpen(!isOpen) // when clicked on toggle button it will open the navbar
  const closeNavbar = () => {
    setIsOpen(false)
    setHomeOpen(false)
    setUserOpen(false)
  }

  const handleLogout = () => {
    dispatch(updateUser(null))
    dispatch(setSelectedRole(null))
    dispatch(resetVolunteer())
    dispatch(resetOrganization())
    dispatch(clearApplications())
    closeNavbar()
  }

  const profilePic = isOrg ? organization.profilePic : volunteer.profilePic;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top py-2">
      <div className="container">
        
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <Logo size={42} />
        </Link>

        {/* toggle button */}
        <button
          className="navbar-toggler border-0 shadow-none ms-auto"
          type="button"
          onClick={toggleNavbar}
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}> {/* when toggle button is clicked it will open the navbar */}

          
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 align-items-lg-center text-center nav-links-center">

            
            <li
              className="nav-item dropdown mx-1"
              onMouseEnter={() => window.innerWidth > 992 && setHomeOpen(true)}  // when mouse is hovered on home it will open the dropdown
              onMouseLeave={() => window.innerWidth > 992 && setHomeOpen(false)}  // when mouse is hovered out of home it will close the dropdown
            >
              <NavLink
                to="/"
                className={({ isActive }) => `nav-link px-3 ${isActive ? 'active' : ''}`}
                onClick={closeNavbar}
              >
                Home
              </NavLink>
              <ul className={`dropdown-menu border-0 shadow-lg mt-0 ${homeOpen ? 'show' : ''}`}>
                <li><a className="dropdown-item py-2" href="/#about" onClick={closeNavbar}>About Us</a></li>
                <li><a className="dropdown-item py-2" href="/#how-it-works" onClick={closeNavbar}>How It Works</a></li>
                <li><a className="dropdown-item py-2" href="/#impact" onClick={closeNavbar}>Impact</a></li>
              </ul>
            </li>

            {isOrg ? (
              // Organization / Company Links
              <>
                <li className="nav-item mx-1">
                  <NavLink className="nav-link px-3" to="/organization/post-opportunity" onClick={closeNavbar}>Post Opportunities</NavLink>
                </li>
                <li className="nav-item mx-1">
                  <NavLink className="nav-link px-3" to="/organization/volunteers" onClick={closeNavbar}>Volunteers</NavLink>
                </li>
              </>
            ) : (
              // Volunteer Links
              <>
                <li className="nav-item mx-1">
                  <NavLink className="nav-link px-3" to="/opportunities" onClick={closeNavbar}>Opportunities</NavLink>
                </li>
                <li className="nav-item mx-1">
                  <NavLink className="nav-link px-3" to="/community" onClick={closeNavbar}>Community</NavLink>
                </li>
                <li className="nav-item mx-1">
                  <NavLink className="nav-link px-3" to="/rewards" onClick={closeNavbar}>Rewards</NavLink>
                </li>
              </>
            )}
          </ul>

          {/* Right Side: Auth / Account */}
          <div className="navbar-nav ms-auto align-items-center">
            {user && (
              <li className="nav-item mx-1 position-relative">
                <Link className="nav-link px-3" to="/messages" onClick={closeNavbar}>
                  <i className="bi bi-chat-dots fs-5 icon-pulse"></i>
                  {(isOrg 
                    ? applications.filter(a => a.orgId === (organization.orgName || "org-1") && !a.read).length 
                    : applications.filter(a => a.volunteerId === (volunteer.userName || "v-1") && !a.read).length
                  ) > 0 && (
                    <span className="position-absolute top-2 start-75 translate-middle p-1 bg-danger border border-light rounded-circle">
                      <span className="visually-hidden">New alerts</span>
                    </span>
                  )}
                </Link>
              </li>
            )}
            {user ? (
              <li
                className="nav-item dropdown w-100"
                onMouseEnter={() => window.innerWidth > 992 && setUserOpen(true)}
                onMouseLeave={() => window.innerWidth > 992 && setUserOpen(false)}
              >
                <a
                  className={`nav-link d-flex align-items-center justify-content-center gap-2 px-3 ${userOpen ? 'show' : ''}`}
                  href="/#"
                  role="button"
                  onClick={(e) => { e.preventDefault(); setUserOpen(!userOpen); }}
                >
                  <div className="nav-avatar-sm" style={profilePic ? { backgroundImage: `url(${profilePic})`, backgroundSize: 'cover', backgroundPosition: 'center', color: 'transparent' } : {}}>
                    {profilePic ? '' : (user.name || (isOrg ? organization.orgName : 'U') || 'U').charAt(0).toUpperCase()}
                  </div>
                </a>
                <ul className={`dropdown-menu dropdown-menu-end border-0 shadow-lg mt-0 ${userOpen ? 'show' : ''}`}>
                  <li className="dropdown-header border-0 bg-transparent text-muted small">Hello, {user.name || (isOrg ? organization.orgName : 'User')}</li>
                  <li><Link className="dropdown-item py-2" to={isOrg ? "/org/profile" : "/profile"} onClick={closeNavbar}>Profile</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item py-2 text-danger" onClick={handleLogout}>Logout</button></li>
                </ul>
              </li>
            ) : (
              <div className="d-flex flex-column flex-lg-row gap-2 mt-2 mt-lg-0 w-100">
                <Link to="/login" className="btn btn-outline-primary rounded-pill px-4 py-2" onClick={closeNavbar}>Log In</Link>
                <Link to="/register" className="btn btn-primary rounded-pill px-4 py-2" onClick={closeNavbar}>Sign Up </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  )
}

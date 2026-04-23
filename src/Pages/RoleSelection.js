import { useDispatch } from 'react-redux';
import { setSelectedRole } from '../redux/UserSlice';
import Logo from '../Components/Logo';
import './RoleSelection.css';
import { Link } from 'react-router-dom';

export default function RoleSelection() {
  const dispatch = useDispatch();

  const handleRoleSelect = (role) => {
    dispatch(setSelectedRole(role));
  };

  return (
    <div className="role-selection-page fade-up">
      <div className="container role-container">
        <div className="role-header">
          <Link to="/" className="role-logo">
            <Logo size={60} />
          </Link>
          <h1 className="role-title">Join Our Community</h1>
          <p className="role-subtitle">First, tell us how you want to use inPlace</p>
        </div>

        <div className="role-cards">
          <Link 
            to="/register/volunteer" 
            className="role-card card"
            onClick={() => handleRoleSelect('volunteer')}    // Set role in Redux when card is clicked
          >
            <div className="role-icon-wrap volunteer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div className="role-content">
              <h3>I am a Volunteer</h3>
              <p>I want to find opportunities to help out and make a difference.</p>
            </div>
            <div className="role-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14m-7-7 7 7-7 7"/>
              </svg>
            </div>
          </Link>

          <Link 
            to="/register/organization" 
            className="role-card card"
            onClick={() => handleRoleSelect('organization')}    // Set role in Redux when card is clicked
          >
            <div className="role-icon-wrap organization">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21h18M3 7v1h18V7l-9-5-9 5zM5 21V8h14v13M9 11h1v4H9zM14 11h1v4h-1z"></path>
              </svg>
            </div>
            <div className="role-content">
              <h3>We are an Organization</h3>
              <p>We want to find passionate volunteers for our projects and causes.</p>
            </div>
            <div className="role-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14m-7-7 7 7-7 7"/>
              </svg>
            </div>
          </Link>
        </div>

        <div className="role-footer">
          <p>Already have an account? <Link to="/login">Log in here</Link></p>
        </div>
      </div>
    </div>
  );
}

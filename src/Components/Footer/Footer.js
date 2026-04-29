import { Link } from 'react-router-dom'
import Logo from '../Logo/Logo.js'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="footer-brand">
            <Logo size={32} />
          </div>
          <p className="footer-tag">
            Opportunity match beyond the resume. Connecting skilled tech minds with causes that matter.
          </p>
        </div>
        <div>
          <h4>Platform</h4>
          <a href="/#how-it-works">How It Works</a>
          <a href="/#impact">Impact</a>
          <Link to="/opportunities">Opportunities</Link>
          <Link to="/rewards">Rewards</Link>
        </div>
        <div>
          <h4>Community</h4>
          <a href="/#stories">Success Stories</a>
          <a href="/#guide">Volunteer Guide</a>
          <Link to="/register">Join as Volunteer</Link>
          <Link to="/register">List your Org</Link>
        </div>
        <div>
          <h4>Company</h4>
          <Link to="/about">About</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} inpLace. All rights reserved.</span>
        <span>Made with a soft lavender heart.</span>
      </div>
    </footer>
  )
}

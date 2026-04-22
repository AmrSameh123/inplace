import Logo from './Logo.js'
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
          <a href="/opportunities">Opportunities</a>
          <a href="/rewards">Rewards</a>
        </div>
        <div>
          <h4>Community</h4>
          <a href="/#stories">Success Stories</a>
          <a href="/#guide">Volunteer Guide</a>
          <a href="/register">Join as Volunteer</a>
          <a href="/register">List your Org</a>
        </div>
        <div>
          <h4>Company</h4>
          <a href="/#about">About</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} inpLace. All rights reserved.</span>
        <span>Made with a soft lavender heart.</span>
      </div>
    </footer>
  )
}

import './Logo.css'
import logo from '../assets/logo_1-removebg-preview.png'


export default function Logo({ size = 32, showWordmark = true }) {
  return (
    <span className="inp-logo">
      <img
        src={logo}
        alt="logo"
        style={{ width: size, height: size, objectFit: 'contain' }}
      />

      {showWordmark && (
        <span className="inp-logo-word">
          inp<span className="inp-logo-word-accent">L</span>ace
        </span>
      )}
    </span>
  )
}
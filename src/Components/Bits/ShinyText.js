export default function ShinyText({ 
  text, 
  disabled = false, 
  speed = 2, 
  className = '' 
}) {
  return (
    <span
      className={`shiny-text ${className} ${disabled ? 'disabled' : ''}`}
      style={{
        display: 'inline-block',
        backgroundImage: 'linear-gradient(120deg, rgba(255, 255, 255, 0.4) 30%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0.4) 70%)',
        backgroundSize: '250% 100%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        animation: disabled ? 'none' : `shine ${speed}s infinite linear`,
        fontWeight: 'inherit',
        filter: 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.3))' // Reduced blur and glow
      }}
    >
      {text}
    </span>
  );
}

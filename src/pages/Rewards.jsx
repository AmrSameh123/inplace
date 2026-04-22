import { useUser } from '../context/UserContext.jsx'
import './Rewards.css'

const TIERS = [
  { key: 'bronze', name: 'Bronze', min: 10, color: '#c88a5c', bg: '#f7e9dd' },
  { key: 'silver', name: 'Silver', min: 50, color: '#7f8293', bg: '#ecedf2' },
  { key: 'gold', name: 'Gold', min: 150, color: '#b8871f', bg: '#fbefd8' },
]

export default function Rewards() {
  const { user } = useUser()
  const hours = user.hours ?? 0

  const currentTier =
    hours >= 150 ? TIERS[2] : hours >= 50 ? TIERS[1] : hours >= 10 ? TIERS[0] : null
  const nextTier = TIERS.find((t) => t.min > hours)
  const progressPct = nextTier
    ? Math.min(100, Math.round((hours / nextTier.min) * 100))
    : 100

  return (
    <div className="rewards-page">
      <div className="container">
        <header className="list-head">
          <span className="badge">Rewards</span>
          <h1>Your giving journey</h1>
          <p>Every hour you contribute moves you closer to the next tier. Keep going.</p>
        </header>

        <section className="rewards-hero">
          <div className="rewards-hero-left">
            <div className="rewards-current">
              <div
                className="rewards-medal-big"
                style={{background: currentTier?.bg || 'var(--color-lavender-softer)', color: currentTier?.color || 'var(--color-lavender-dark)'}}
              >
                <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><path d="M12 2l2.39 4.84L20 7.62l-4 3.9.94 5.48L12 14.77 7.06 17l.94-5.48-4-3.9 5.61-.78L12 2z"/></svg>
              </div>
              <div>
                <span className="rewards-label">Current tier</span>
                <h2>{currentTier?.name || 'Starter'}</h2>
                <p>{hours} hours donated</p>
              </div>
            </div>
            <div className="progress-wrap">
              <div className="progress-head">
                <span>Progress to {nextTier ? nextTier.name : 'Gold'}</span>
                <span>
                  {hours} / {nextTier ? nextTier.min : 150} hrs
                </span>
              </div>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <p className="progress-hint">
                {nextTier
                  ? `${nextTier.min - hours} more hours to unlock ${nextTier.name}.`
                  : 'You unlocked the highest tier. Amazing!'}
              </p>
            </div>
          </div>
          <div className="rewards-hero-right">
            <div className="rewards-stat">
              <strong>{hours}</strong>
              <span>Hours donated</span>
            </div>
            <div className="rewards-stat">
              <strong>7</strong>
              <span>Projects completed</span>
            </div>
            <div className="rewards-stat">
              <strong>12</strong>
              <span>Badges earned</span>
            </div>
          </div>
        </section>

        <section className="tiers">
          <h2 className="tiers-heading">All tiers</h2>
          <div className="tier-grid">
            {TIERS.map((t) => {
              const unlocked = hours >= t.min
              return (
                <div
                  key={t.key}
                  className={`tier-big ${unlocked ? 'unlocked' : ''}`}
                  style={{borderColor: unlocked ? t.color : 'var(--color-border)'}}
                >
                  <div className="tier-medal-big" style={{background: t.bg, color: t.color}}>
                    <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M12 2l2.39 4.84L20 7.62l-4 3.9.94 5.48L12 14.77 7.06 17l.94-5.48-4-3.9 5.61-.78L12 2z"/></svg>
                  </div>
                  <h3>{t.name}</h3>
                  <span className="tier-req">{t.min}+ hours</span>
                  <ul>
                    {t.key === 'bronze' && (
                      <>
                        <li>Bronze profile badge</li>
                        <li>Monthly newsletter spotlight</li>
                        <li>Early access to new roles</li>
                      </>
                    )}
                    {t.key === 'silver' && (
                      <>
                        <li>Silver profile badge</li>
                        <li>Dedicated mentor match</li>
                        <li>Community event invites</li>
                      </>
                    )}
                    {t.key === 'gold' && (
                      <>
                        <li>Gold profile badge</li>
                        <li>Free conference ticket</li>
                        <li>VIP organization access</li>
                      </>
                    )}
                  </ul>
                  <span className={`tier-status ${unlocked ? 'unlocked' : ''}`}>
                    {unlocked ? 'Unlocked' : 'Locked'}
                  </span>
                </div>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}

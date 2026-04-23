import { Link } from 'react-router-dom'
import './Home.css'

import hero1 from '../assets/p2.jpg'
import hero2 from '../assets/p.jpg'

import story1 from '../assets/story-1.jpg'
import story2 from '../assets/story-2.jpg'
import story3 from '../assets/story-3.jpg'


export default function Home() {
  return (
    <main>
      {/* ===== HERO (structure mirrors the reference 1:1) ===== */}
      <section className="hero">
        {/* Faint world-map background, echoing the reference */}
        <svg className="hero-map" viewBox="0 0 1200 600" aria-hidden="true">
          <defs>
            <pattern id="dots" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.2" fill="currentColor" />
            </pattern>
          </defs>
          <g fill="url(#dots)">
            <ellipse cx="260" cy="240" rx="180" ry="120" />
            <ellipse cx="560" cy="190" rx="140" ry="90" />
            <ellipse cx="820" cy="260" rx="160" ry="110" />
            <ellipse cx="420" cy="420" rx="120" ry="70" />
            <ellipse cx="760" cy="440" rx="150" ry="90" />
            <ellipse cx="1020" cy="360" rx="110" ry="70" />
          </g>
        </svg>

        {/* Scattered decorative shapes (leaves, hearts, puzzle nubs) */}
        <span className="hero-deco hero-deco-leaf-1" aria-hidden="true">
          <svg viewBox="0 0 32 32" width="34" height="34"><path d="M16 2C9 6 4 12 4 19c0 6 5 11 12 11 0-7 4-13 12-17-4-7-10-11-12-11z" fill="#b8a7f0" opacity="0.55"/></svg>
        </span>
        <span className="hero-deco hero-deco-leaf-2" aria-hidden="true">
          <svg viewBox="0 0 32 32" width="26" height="26"><path d="M16 2C9 6 4 12 4 19c0 6 5 11 12 11 0-7 4-13 12-17-4-7-10-11-12-11z" fill="#a7c8f0" opacity="0.55"/></svg>
        </span>
        <span className="hero-deco hero-deco-heart-1" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 21s-7-4.5-7-10a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 5.5-7 10-7 10z" fill="#d8caf8"/></svg>
        </span>
        <span className="hero-deco hero-deco-heart-2" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="14" height="14"><path d="M12 21s-7-4.5-7-10a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 5.5-7 10-7 10z" fill="#e8e2fb"/></svg>
        </span>
        <span className="hero-deco hero-deco-dot-1" aria-hidden="true" />
        <span className="hero-deco hero-deco-dot-2" aria-hidden="true" />

        <div className="container hero-grid">
          {/* LEFT — text block mirrors the "Care" layout */}
          <div className="hero-content fade-up">
            <h1 className="hero-title">
              Opportunity match<br />
              beyond the <span className="hero-accent">resume.</span>
            </h1>

            <p className="hero-desc">
              <strong className="hero-brand-name">inpLace</strong> pairs skilled
              volunteers with organizations that need them — matching passion,
              personality, and skill so every hour you give creates real impact.
            </p>

            <div className="hero-cta-row">
              <Link to="/register" className="btn btn-primary hero-primary-btn" aria-label="Join inpLace">
                <span className="hero-primary-btn-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                Join the movement
              </Link>
    
            </div>


          </div>

          {/* RIGHT — two overlapping circular photo cutouts, like the reference */}
          <div className="hero-visual fade-up">
            <div className="hero-circle hero-circle-top">
              <img src={hero1} alt="Two volunteers collaborating on a laptop" />
            </div>
            <div className="hero-circle hero-circle-bottom">
              <img src={hero2} alt="A mentor guiding a junior developer" />
            </div>
            {/* Floating detail chip — echoes the reference's playful stickers */}
            <span className="hero-chip hero-chip-1" aria-hidden="true">
              <span className="hero-chip-dot" /> 12k+ volunteers
            </span>
            <span className="hero-chip hero-chip-2" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#e6b84d"><path d="M12 2l2.4 4.8L20 7.6l-4 3.9.9 5.5L12 14.8 7.1 17l.9-5.5-4-3.9 5.6-.8L12 2z"/></svg>
              Gold tier
            </span>
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section id="about" className="section-about">
        <div className="container about-grid">
          <div>
            <div className="section-eyebrow">About Us</div>
            <h2 className="section-title">A platform where skills meet service.</h2>
            <p className="section-subtitle">
              We believe every line of code has the power to uplift a community.
              inpLace is built by technologists for technologists — a home for people
              who want their careers to count for something more.
            </p>
            <div className="about-chips">
              <span className="chip">Mission-driven</span>
              <span className="chip">Skill-matched</span>
              <span className="chip">Human-first</span>
            </div>
          </div>
          <div className="about-cards">
            <div className="about-card">
              <div className="about-icon" style={{background:'#e8e2fb', color:'#6b5ab8'}}>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none"><path d="M12 21s-7-4.5-7-10a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 5.5-7 10-7 10z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>
              </div>
              <h4>Care</h4>
              <p>We match with empathy — not just resumes.</p>
            </div>
            <div className="about-card">
              <div className="about-icon" style={{background:'#dbe9fa', color:'#5a82c3'}}>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/><path d="M8 12l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <h4>Trust</h4>
              <p>Verified organizations. Transparent impact.</p>
            </div>
            <div className="about-card">
              <div className="about-icon" style={{background:'#fbefd8', color:'#b8871f'}}>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none"><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>
              </div>
              <h4>Growth</h4>
              <p>Earn badges, mentors, and real portfolio work.</p>
            </div>
            <div className="about-card">
              <div className="about-icon" style={{background:'#dff3e9', color:'#3f8f6c'}}>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none"><path d="M4 20h16M4 20v-6M10 20v-10M16 20v-4M22 20v-12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              </div>
              <h4>Impact</h4>
              <p>Every hour tracked, measured, celebrated.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how-it-works" className="section-how">
        <div className="container">
          <div className="section-head">
            <div className="section-eyebrow">How It Works</div>
            <h2 className="section-title">From signup to impact in three steps.</h2>
          </div>
          <div className="how-steps">
            <div className="how-step">
              <div className="how-num">01</div>
              <h4>Create your profile</h4>
              <p>Tell us your programming track, language skills, and soft-skill strengths.</p>
            </div>
            <div className="how-connector" aria-hidden="true"></div>
            <div className="how-step">
              <div className="how-num">02</div>
              <h4>Get matched</h4>
              <p>Our recommendation engine surfaces opportunities tailored to you.</p>
            </div>
            <div className="how-connector" aria-hidden="true"></div>
            <div className="how-step">
              <div className="how-num">03</div>
              <h4>Contribute & grow</h4>
              <p>Log hours, earn badges, and climb the rewards ladder.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== IMPACT ===== */}
      <section id="impact" className="section-impact">
        <div className="container">
          <div className="section-head">
            <div className="section-eyebrow">Our Impact</div>
            <h2 className="section-title">Small commits. Real change.</h2>
          </div>
          <div className="impact-grid">
            <div className="impact-stat">
              <strong>58,240</strong>
              <span>Hours donated</span>
            </div>
            <div className="impact-stat">
              <strong>2,410</strong>
              <span>Projects shipped</span>
            </div>
            <div className="impact-stat">
              <strong>840</strong>
              <span>Partner orgs</span>
            </div>
            <div className="impact-stat">
              <strong>96%</strong>
              <span>Volunteer satisfaction</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== VOLUNTEER GUIDE ===== */}
      <section id="guide" className="section-guide">
        <div className="container guide-grid">
          <div>
            <div className="section-eyebrow">Volunteer Guide</div>
            <h2 className="section-title">Ready to contribute? Here&apos;s how.</h2>
            <p className="section-subtitle">
              A quick walkthrough for first-time volunteers — from picking the right
              cause to shipping your first pull request.
            </p>
            <Link to="/register" className="btn btn-primary">Get started</Link>
          </div>
          <div className="guide-list">
            {[
              {t:'Pick your track', d:'Frontend, Backend, or Database — choose what fits your skills.'},
              {t:'Browse opportunities', d:'Filter by cause, duration, and required experience.'},
              {t:'Apply in a click', d:'Your profile does the talking. No cover letters required.'},
              {t:'Log & learn', d:'Track hours, collect feedback, and level up your badges.'},
            ].map((item, i) => (
              <div key={i} className="guide-item">
                <div className="guide-num">{String(i + 1).padStart(2, '0')}</div>
                <div>
                  <h5>{item.t}</h5>
                  <p>{item.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SUCCESS STORIES ===== */}
      <section id="stories" className="section-stories">
        <div className="container">
          <div className="section-head">
            <div className="section-eyebrow">Success Stories</div>
            <h2 className="section-title">Volunteers who made it count.</h2>
          </div>
          <div className="stories-grid">
            {[
              {name:'Maya Patel', role:'Frontend Volunteer', img:story1, q:'I built my first production React app for a literacy nonprofit. It changed my career.'},
              {name:'Daniel Okafor', role:'Backend Mentor', img:story2, q:'Mentoring juniors while shipping real APIs — the best kind of give-and-take.'},
              {name:'Priya Raman', role:'Database Lead', img:story3, q:'I now lead data for a climate-tech org. It started with a single 2-hour task.'},
            ].map((s, i) => (
              <div key={i} className="story-card">
                <img src={s.img} alt={`Portrait of ${s.name}`} className="story-img" />
                <p className="story-quote">&ldquo;{s.q}&rdquo;</p>
                <div className="story-person">
                  <strong>{s.name}</strong>
                  <span>{s.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== REWARDS PREVIEW ===== */}
      <section id="rewards" className="section-rewards-preview">
        <div className="container rewards-preview-inner">
          <div>
            <div className="section-eyebrow">Rewards</div>
            <h2 className="section-title">Every hour earns you more.</h2>
            <p className="section-subtitle">
              Move through Bronze, Silver, and Gold tiers as you contribute.
              Unlock mentorship, conference tickets, and exclusive opportunities.
            </p>
            <Link to="/rewards" className="btn btn-primary">See rewards</Link>
          </div>
          <div className="rewards-tiers">
            {[
              {t:'Bronze', h:'10+ hrs', c:'#c88a5c', bg:'#f7e9dd'},
              {t:'Silver', h:'50+ hrs', c:'#7f8293', bg:'#ecedf2'},
              {t:'Gold', h:'150+ hrs', c:'#b8871f', bg:'#fbefd8'},
            ].map((r) => (
              <div key={r.t} className="tier-card" style={{borderColor: r.c + '33'}}>
                <div className="tier-medal" style={{background: r.bg, color: r.c}}>
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 2l2.39 4.84L20 7.62l-4 3.9.94 5.48L12 14.77 7.06 17l.94-5.48-4-3.9 5.61-.78L12 2z"/></svg>
                </div>
                <h4>{r.t}</h4>
                <span>{r.h}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}




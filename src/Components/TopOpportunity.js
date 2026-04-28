import './TopOpportunity.css'

export default function OpportunityCard({ op, showMatch = false, actions = null }) {
  return (
    <article className="op-card">
      <div className="op-card-head">
        <div
          className="op-avatar"
          style={{ background: op.color + '22', color: op.color }}
          aria-hidden="true"
        >
          {op.org.slice(0, 1)}
        </div>
        {showMatch && (
          <div className="op-match">
            <span>{op.match}%</span> match
          </div>
        )}
      </div>
      <h3 className="op-title">{op.title}</h3>
      <p className="op-org">{op.org}</p>

      <div className="op-meta">
        <span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/><path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          {op.duration}
        </span>
        <span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M3 12l3-3 3 3 3-5 4 8 5-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          {op.commitment}
        </span>
        <span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2l2.39 4.84L20 7.62l-4 3.9.94 5.48L12 14.77 7.06 17l.94-5.48-4-3.9 5.61-.78L12 2z" fill="currentColor"/></svg>
          {op.rating}
        </span>
      </div>

      <div className="op-skills">
        {op.skills.map((s) => (
          <span key={s} className="op-skill">{s}</span>
        ))}
      </div>

      <div className="op-footer">
        <div className="op-tags">
          {op.tags.map((t) => (
            <span key={t} className="op-tag">{t}</span>
          ))}
        </div>
        {actions ? actions : (
          <button className="btn btn-primary" style={{padding:'9px 18px', fontSize:13}}>
            Apply
          </button>
        )}
      </div>
    </article>
  )
}

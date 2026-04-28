import { useMemo, useState } from 'react'
import OpportunityCard from '../Components/TopOpportunity.js'
import { OPPORTUNITIES } from '../data/Opportunities.js'
import './List.css'

export default function TopOpportunities() {
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('rating')
  const [query, setQuery] = useState('')

  const list = useMemo(() => {
    let l = [...OPPORTUNITIES]
    if (filter !== 'all') l = l.filter((o) => o.track === filter)
    if (query) {
      const q = query.toLowerCase()
      l = l.filter(
        (o) =>
          o.title.toLowerCase().includes(q) ||
          o.org.toLowerCase().includes(q) ||
          o.skills.some((s) => s.toLowerCase().includes(q))
      )
    }
    if (sort === 'rating') l.sort((a, b) => b.rating - a.rating)
    if (sort === 'applicants') l.sort((a, b) => b.applicants - a.applicants)
    return l
  }, [filter, sort, query])

  return (
    <div className="list-page">
      <div className="container">
        <header className="list-head">
          <span className="badge">Explore</span>
          <h1>Top opportunities</h1>
          <p>Hand-picked open roles from vetted organizations around the world.</p>
        </header>

        <div className="list-section-head" style={{marginBottom:24}}>
          <div className="list-controls" style={{width:'100%', justifyContent:'space-between'}}>
            <div className="filter-group" role="tablist">
              {[
                { k: 'all', l: 'All' },
                { k: 'frontend', l: 'Frontend' },
                { k: 'backend', l: 'Backend' },
                { k: 'database', l: 'Database' },
              ].map((f) => (
                <button
                  key={f.k}
                  className={`filter-btn ${filter === f.k ? 'active' : ''}`}
                  onClick={() => setFilter(f.k)}
                >
                  {f.l}
                </button>
              ))}
            </div>
            <div style={{display:'flex', gap:12, flexWrap:'wrap'}}>
              <input
                type="search"
                placeholder="Search opportunities..."
                className="form-input"
                style={{width:240}}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {/* <select
                className="form-select"
                style={{width:'auto', minWidth:180}}
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                aria-label="Sort"
              >
                <option value="rating">Highest rated</option>
                <option value="applicants">Most popular</option>
              </select> */}
            </div>
          </div>
        </div>

        {list.length === 0 ? (
          <div className="card" style={{textAlign:'center', padding:48}}>
            <h3 style={{marginBottom:8}}>No results found</h3>
            <p style={{color:'var(--color-text-muted)'}}>Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <div className="op-grid op-grid-3">
            {list.map((op) => (
              <OpportunityCard key={op.id} op={op} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

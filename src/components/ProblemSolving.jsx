import { useMemo, useState } from 'react'
import { PROBLEMS, TRACKS } from '../data/problems.js'
import { DIFFICULTIES } from '../data/questions.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import { useDebounce } from '../hooks/useDebounce.js'
import ProblemCard from './ProblemCard.jsx'

// Self-contained coding-practice section: JavaScript and React problems,
// each with a prompt, worked approach, and full solution. Owns its own
// filters and progress store so it can drop into the app independently.
export default function ProblemSolving() {
  const [search, setSearch] = useState('')
  const [track, setTrack] = useState('All')
  const [difficulty, setDifficulty] = useState('All')
  const [openId, setOpenId] = useState(null)
  const [progress, setProgress] = useLocalStorage('interview-bench-problem-progress', {})

  const debouncedSearch = useDebounce(search, 200)

  const setStatus = (id, status) => {
    setProgress((prev) => {
      const next = { ...prev }
      if (!status) delete next[id]
      else next[id] = status
      return next
    })
  }

  const filtered = useMemo(() => {
    const term = debouncedSearch.trim().toLowerCase()
    return PROBLEMS.filter((item) => {
      if (track !== 'All' && item.track !== track) return false
      if (difficulty !== 'All' && item.difficulty !== difficulty) return false
      if (!term) return true
      return (
        item.title.toLowerCase().includes(term) ||
        item.prompt.toLowerCase().includes(term) ||
        item.tags.some((t) => t.toLowerCase().includes(term))
      )
    })
  }, [debouncedSearch, track, difficulty])

  const trackCounts = useMemo(() => {
    const counts = {}
    for (const t of TRACKS) counts[t] = PROBLEMS.filter((item) => item.track === t).length
    return counts
  }, [])

  const stats = useMemo(() => {
    let confident = 0
    let shaky = 0
    for (const item of PROBLEMS) {
      if (progress[item.id] === 'confident') confident += 1
      else if (progress[item.id] === 'shaky') shaky += 1
    }
    return { confident, shaky, unseen: PROBLEMS.length - confident - shaky }
  }, [progress])

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="panel">
          <p className="panel-title">Search</p>
          <input
            className="search-input"
            type="search"
            placeholder="Search problems, tags…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="panel">
          <p className="panel-title">Track</p>
          <div className="chip-list">
            {['All', ...TRACKS].map((t) => (
              <button
                key={t}
                type="button"
                className={`chip${track === t ? ' active' : ''}`}
                onClick={() => setTrack(t)}
                aria-pressed={track === t}
              >
                <span>{t}</span>
                {t !== 'All' && <span className="chip-count">{trackCounts[t] ?? 0}</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="panel">
          <p className="panel-title">Difficulty</p>
          <div className="segmented">
            {['All', ...DIFFICULTIES].map((d) => (
              <button
                key={d}
                type="button"
                className={difficulty === d ? 'active' : ''}
                onClick={() => setDifficulty(d)}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="panel">
          <p className="panel-title">Your progress</p>
          <div className="stats-grid">
            <div className="stat-tile">
              <div className="stat-number good">{stats.confident}</div>
              <div className="stat-caption">Solved</div>
            </div>
            <div className="stat-tile">
              <div className="stat-number warn">{stats.shaky}</div>
              <div className="stat-caption">Practice</div>
            </div>
            <div className="stat-tile">
              <div className="stat-number">{stats.unseen}</div>
              <div className="stat-caption">Unseen</div>
            </div>
          </div>
        </div>
      </aside>

      <main>
        <div className="list-meta">
          <h2>Coding problems</h2>
          <span>
            {filtered.length} of {PROBLEMS.length}
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">No problems match your filters. Try clearing the search or track filters.</div>
        ) : (
          <div className="question-list">
            {filtered.map((item) => (
              <ProblemCard
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                status={progress[item.id]}
                onToggle={() => setOpenId((prev) => (prev === item.id ? null : item.id))}
                onSetStatus={(status) => setStatus(item.id, status)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

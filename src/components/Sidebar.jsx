import { CATEGORIES, DIFFICULTIES } from '../data/questions.js'

export default function Sidebar({
  search,
  onSearch,
  activeCategories,
  onToggleCategory,
  difficulty,
  onSetDifficulty,
  categoryCounts,
  stats,
  onJumpToUnreviewed,
}) {
  return (
    <aside className="sidebar">
      <div className="panel">
        <p className="panel-title">Search</p>
        <input
          id="question-search"
          className="search-input"
          type="search"
          placeholder="Search questions, tags… ( / )"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <div className="panel">
        <p className="panel-title">Category</p>
        <div className="chip-list">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`chip${activeCategories.includes(cat) ? ' active' : ''}`}
              onClick={() => onToggleCategory(cat)}
              aria-pressed={activeCategories.includes(cat)}
            >
              <span>{cat}</span>
              <span className="chip-count">{categoryCounts[cat] ?? 0}</span>
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
              onClick={() => onSetDifficulty(d)}
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
            <div className="stat-caption">Confident</div>
          </div>
          <div className="stat-tile">
            <div className="stat-number warn">{stats.shaky}</div>
            <div className="stat-caption">Shaky</div>
          </div>
          <div className="stat-tile">
            <div className="stat-number">{stats.unseen}</div>
            <div className="stat-caption">Unseen</div>
          </div>
        </div>
        <button type="button" className="jump-btn" onClick={onJumpToUnreviewed}>
          Jump to next unreviewed
        </button>
      </div>
    </aside>
  )
}

export default function Topbar({ view, onChangeView }) {
  return (
    <header className="topbar">
      <div className="brand">
        <span className="brand-mark">Interview Bench</span>
        <span className="brand-tag">Q&amp;A PRACTICE</span>
      </div>

      <nav className="tabs" aria-label="Practice mode">
        <button
          type="button"
          className={view === 'qa' ? 'active' : ''}
          onClick={() => onChangeView('qa')}
          aria-pressed={view === 'qa'}
        >
          Concept Q&amp;A
        </button>
        <button
          type="button"
          className={view === 'problems' ? 'active' : ''}
          onClick={() => onChangeView('problems')}
          aria-pressed={view === 'problems'}
        >
          Problem Solving
        </button>
      </nav>
    </header>
  )
}

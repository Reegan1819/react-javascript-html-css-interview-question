export default function Topbar({ total, confidentCount, shakyCount, onReset }) {
  const confidentPct = total ? (confidentCount / total) * 100 : 0
  const shakyPct = total ? (shakyCount / total) * 100 : 0
  const reviewedCount = confidentCount + shakyCount

  return (
    <header className="topbar">
      <div className="brand">
        <span className="brand-mark">Interview Bench</span>
        <span className="brand-tag">Q&amp;A PRACTICE</span>
      </div>

      <div className="topbar-progress">
        <div
          className="progress-track"
          role="progressbar"
          aria-valuenow={reviewedCount}
          aria-valuemin={0}
          aria-valuemax={total}
          aria-label="Review progress"
        >
          <div className="progress-fill-confident" style={{ width: `${confidentPct}%` }} />
          <div className="progress-fill-shaky" style={{ width: `${shakyPct}%` }} />
        </div>
        <span className="progress-label">
          {reviewedCount}/{total} reviewed
        </span>
      </div>

      <button className="reset-btn" onClick={onReset} type="button">
        Reset progress
      </button>
    </header>
  )
}

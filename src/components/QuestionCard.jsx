export default function QuestionCard({ item, isOpen, status, onToggle, onSetStatus }) {
  return (
    <article className={`card${status ? ` ${status}` : ''}`} id={item.id}>
      <button
        className="card-header"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`${item.id}-body`}
      >
        <span className={`status-dot${status ? ` ${status}` : ''}`} aria-hidden="true" />
        <div className="card-badges">
          <span className="badge category">{item.category}</span>
          <span className={`badge difficulty-${item.difficulty.toLowerCase()}`}>{item.difficulty}</span>
        </div>
        <span className="card-question">{item.question}</span>
        <svg
          className={`chevron${isOpen ? ' open' : ''}`}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {isOpen && (
        <div className="card-body" id={`${item.id}-body`}>
          <ul className="answer-list">
            {item.answer.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
          <div className="tag-row">
            {item.tags.map((tag) => (
              <span className="tag" key={tag}>
                #{tag}
              </span>
            ))}
          </div>
          <div className="confidence-row">
            <button
              type="button"
              className={`confidence-btn confident${status === 'confident' ? ' active' : ''}`}
              onClick={() => onSetStatus(status === 'confident' ? undefined : 'confident')}
            >
              ✓ Know it
            </button>
            <button
              type="button"
              className={`confidence-btn shaky${status === 'shaky' ? ' active' : ''}`}
              onClick={() => onSetStatus(status === 'shaky' ? undefined : 'shaky')}
            >
              ~ Still shaky
            </button>
          </div>
        </div>
      )}
    </article>
  )
}

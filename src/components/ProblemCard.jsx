export default function ProblemCard({ item, isOpen, status, onToggle, onSetStatus }) {
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
          <span className={`badge track-${item.track === 'React' ? 'react' : 'javascript'}`}>{item.track}</span>
          <span className={`badge difficulty-${item.difficulty.toLowerCase()}`}>{item.difficulty}</span>
        </div>
        <span className="card-question">{item.title}</span>
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
          <p className="problem-prompt">{item.prompt}</p>

          {item.examples.length > 0 && (
            <ul className="example-list">
              {item.examples.map((ex, i) => (
                <li key={i}>
                  <code>{ex}</code>
                </li>
              ))}
            </ul>
          )}

          <p className="section-label">Approach</p>
          <ul className="answer-list">
            {item.approach.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>

          <p className="section-label">Solution</p>
          <pre className="code-block">
            <code>{item.solution}</code>
          </pre>

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
              ✓ Solved it
            </button>
            <button
              type="button"
              className={`confidence-btn shaky${status === 'shaky' ? ' active' : ''}`}
              onClick={() => onSetStatus(status === 'shaky' ? undefined : 'shaky')}
            >
              ~ Needs practice
            </button>
          </div>
        </div>
      )}
    </article>
  )
}

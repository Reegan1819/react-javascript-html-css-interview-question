import { useMemo, useState } from 'react'
import { CATEGORIES, QUESTIONS } from '../data/questions.js'
import { useProgress } from '../hooks/useProgress.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import { useDebounce } from '../hooks/useDebounce.js'
import { useKeyboardShortcut } from '../hooks/useKeyboardShortcut.js'
import Sidebar from './Sidebar.jsx'
import QuestionCard from './QuestionCard.jsx'

// Self-contained concept flashcard section: category/difficulty filters,
// search, expandable answers, and its own persisted confidence tracking.
export default function ConceptQA() {
  const { progress, setStatus, resetProgress } = useProgress()
  const [search, setSearch] = useState('')
  const [activeCategories, setActiveCategories] = useLocalStorage('interview-bench-categories', [])
  const [difficulty, setDifficulty] = useLocalStorage('interview-bench-difficulty', 'All')
  const [openId, setOpenId] = useState(null)

  const debouncedSearch = useDebounce(search, 200)

  useKeyboardShortcut({
    '/': (event) => {
      event.preventDefault()
      document.getElementById('question-search')?.focus()
    },
    Escape: () => setOpenId(null),
  })

  const toggleCategory = (cat) => {
    setActiveCategories((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]))
  }

  const filtered = useMemo(() => {
    const term = debouncedSearch.trim().toLowerCase()
    return QUESTIONS.filter((item) => {
      if (activeCategories.length && !activeCategories.includes(item.category)) return false
      if (difficulty !== 'All' && item.difficulty !== difficulty) return false
      if (!term) return true
      return (
        item.question.toLowerCase().includes(term) ||
        item.answer.some((a) => a.toLowerCase().includes(term)) ||
        item.tags.some((t) => t.toLowerCase().includes(term))
      )
    })
  }, [debouncedSearch, activeCategories, difficulty])

  const categoryCounts = useMemo(() => {
    const counts = {}
    for (const cat of CATEGORIES) {
      counts[cat] = QUESTIONS.filter((item) => item.category === cat).length
    }
    return counts
  }, [])

  const stats = useMemo(() => {
    let confident = 0
    let shaky = 0
    for (const item of QUESTIONS) {
      if (progress[item.id] === 'confident') confident += 1
      else if (progress[item.id] === 'shaky') shaky += 1
    }
    return { confident, shaky, unseen: QUESTIONS.length - confident - shaky }
  }, [progress])

  const jumpToUnreviewed = () => {
    const next = filtered.find((item) => !progress[item.id]) ?? QUESTIONS.find((item) => !progress[item.id])
    if (!next) return
    setOpenId(next.id)
    requestAnimationFrame(() => {
      document.getElementById(next.id)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    })
  }

  return (
    <div className="layout">
      <Sidebar
        search={search}
        onSearch={setSearch}
        activeCategories={activeCategories}
        onToggleCategory={toggleCategory}
        difficulty={difficulty}
        onSetDifficulty={setDifficulty}
        categoryCounts={categoryCounts}
        stats={stats}
        onJumpToUnreviewed={jumpToUnreviewed}
        onReset={resetProgress}
      />

      <main>
        <div className="list-meta">
          <h2>Questions</h2>
          <span>
            {filtered.length} of {QUESTIONS.length}
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">No questions match your filters. Try clearing the search or category filters.</div>
        ) : (
          <div className="question-list">
            {filtered.map((item) => (
              <QuestionCard
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

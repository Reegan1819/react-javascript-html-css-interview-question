import { useState } from 'react'
import Topbar from './components/Header.jsx'
import ConceptQA from './components/ConceptQA.jsx'
import ProblemSolving from './components/ProblemSolving.jsx'

export default function App() {
  const [view, setView] = useState('qa')

  return (
    <div className="app">
      <Topbar view={view} onChangeView={setView} />
      {view === 'qa' ? <ConceptQA /> : <ProblemSolving />}
    </div>
  )
}

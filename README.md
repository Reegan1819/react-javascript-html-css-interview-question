# Interview Bench

[![React](https://img.shields.io/badge/React-18.3-149eca?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646cff?logo=vite&logoColor=white)](https://vite.dev)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-f7df1e?logo=javascript&logoColor=black)](https://developer.mozilla.org/docs/Web/JavaScript)
[![Last commit](https://img.shields.io/github/last-commit/Reegan1819/react-javascript-html-css-interview-question)](https://github.com/Reegan1819/react-javascript-html-css-interview-question/commits/main)

A React app for practicing experienced-level interviews, with two modes:

- **Concept Q&A** — filter by category and difficulty, search, expand a question to
  reveal its answer, and mark yourself "know it" / "still shaky" per question.
- **Problem Solving** — hands-on JavaScript and React coding problems (debounce,
  deep clone, custom hooks, accessible components, and more), each with a prompt,
  a worked approach, and a full solution, tracked as "solved" / "needs practice".

Progress in both modes is saved to `localStorage`.

## Running locally

```bash
npm install
npm run dev
```

Then open the printed local URL in your browser.

> **Note:** `npm install` could not be verified in the environment this was built in —
> the corporate npm registry (`npm.dev.paypalinc.com`) returned `403 Forbidden` for
> public packages like `react` and `vite`. If you hit the same thing, run this from a
> network/registry that can resolve public npm packages, or point `.npmrc` at a mirror
> that proxies them.

## Keyboard shortcuts

- `/` — focus the search box
- `Esc` — close the open question

## Structure

- `src/data/questions.js` — concept Q&A bank
- `src/data/problems.js` — coding problem bank (JavaScript + React tracks)
- `src/hooks/`
  - `useProgress.js` — localStorage-backed "know it / still shaky" tracking per question
  - `useLocalStorage.js` — generic localStorage-backed state; used to remember your
    filter choices and the Problem Solving track record
  - `useDebounce.js` — debounces search boxes so filtering doesn't run on every keystroke
  - `useKeyboardShortcut.js` — registers global key shortcuts (`/`, `Esc`), ignoring
    keystrokes typed into inputs
- `src/components/`
  - `Header` — branding and the Concept Q&A / Problem Solving tab switcher
  - `ConceptQA` — self-contained Q&A view (filters, search, `QuestionCard` list)
  - `ProblemSolving` — self-contained coding-problem view (track/difficulty filters,
    search, `ProblemCard` list)
  - `Sidebar`, `QuestionCard`, `ProblemCard` — shared building blocks for each view
- `src/App.jsx` — top-level tab state, nothing else

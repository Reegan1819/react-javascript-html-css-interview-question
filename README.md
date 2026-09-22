# Interview Bench

[![React](https://img.shields.io/badge/React-18.3-149eca?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646cff?logo=vite&logoColor=white)](https://vite.dev)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-f7df1e?logo=javascript&logoColor=black)](https://developer.mozilla.org/docs/Web/JavaScript)
[![Last commit](https://img.shields.io/github/last-commit/Reegan1819/react-javascript-html-css-interview-question)](https://github.com/Reegan1819/react-javascript-html-css-interview-question/commits/main)

A React app for practicing experienced-level interview Q&A: filter by category and
difficulty, search, expand a question to reveal its answer, and mark yourself
"know it" / "still shaky" per question. Progress is saved to `localStorage`.

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

- `src/data/questions.js` — the question bank (edit/add questions here)
- `src/hooks/`
  - `useProgress.js` — localStorage-backed "know it / still shaky" tracking per question
  - `useLocalStorage.js` — generic localStorage-backed state; used to remember your
    category and difficulty filters across visits
  - `useDebounce.js` — debounces the search box so filtering doesn't run on every keystroke
  - `useKeyboardShortcut.js` — registers global key shortcuts (`/`, `Esc`), ignoring
    keystrokes typed into inputs
- `src/components/` — `Header` (top progress bar), `Sidebar` (search/filters/stats),
  `QuestionCard` (expandable Q&A card)
- `src/App.jsx` — filtering logic and layout

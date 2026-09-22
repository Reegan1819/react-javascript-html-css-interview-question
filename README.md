# Interview Bench

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

## Structure

- `src/data/questions.js` — the question bank (edit/add questions here)
- `src/hooks/useProgress.js` — localStorage-backed progress tracking
- `src/components/` — `Header` (top progress bar), `Sidebar` (search/filters/stats),
  `QuestionCard` (expandable Q&A card)
- `src/App.jsx` — filtering logic and layout

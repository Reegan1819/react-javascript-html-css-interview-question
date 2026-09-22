let seq = 0
const p = (track, difficulty, title, prompt, examples, approach, solution, tags) => ({
  id: `p${++seq}`,
  track,
  difficulty,
  title,
  prompt,
  examples,
  approach,
  solution,
  tags,
})

export const TRACKS = ['JavaScript', 'React']

export const PROBLEMS = [
  p(
    'JavaScript',
    'Medium',
    'Implement `debounce(fn, delay)`',
    'Return a wrapped version of `fn` that only runs after `delay` ms have passed since the last time it was called.',
    ['debounce(log, 300) → typing "hello" fires `log` once, 300ms after the last keystroke'],
    [
      'Keep a single timer id in closure scope, shared across every call to the wrapped function.',
      'On each call, clear the previous timer (if any) and schedule a new one.',
      'Forward `this` and all arguments through to the original function when the timer fires.',
    ],
    `function debounce(fn, delay) {
  let timer = null;
  return function debounced(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}`,
    ['closures', 'timers'],
  ),
  p(
    'JavaScript',
    'Medium',
    'Implement `throttle(fn, limit)`',
    'Return a wrapped version of `fn` that runs at most once every `limit` ms, no matter how often it’s called.',
    ['A scroll handler throttled to 200ms fires at most 5 times per second while scrolling.'],
    [
      'Track whether we’re currently "on cooldown" with a boolean flag.',
      'On the first call, run `fn` immediately and start the cooldown timer.',
      'Calls during cooldown are dropped (or, for trailing-edge throttle, the last one is queued to run when cooldown ends).',
    ],
    `function throttle(fn, limit) {
  let onCooldown = false;
  return function throttled(...args) {
    if (onCooldown) return;
    fn.apply(this, args);
    onCooldown = true;
    setTimeout(() => { onCooldown = false; }, limit);
  };
}`,
    ['closures', 'timers'],
  ),
  p(
    'JavaScript',
    'Hard',
    'Write a deep clone function',
    'Clone a plain object or array so that nested objects/arrays are fully independent copies, without using `structuredClone`.',
    ['deepClone({ a: 1, b: { c: [1, 2] } }) → a new object where mutating `.b.c` does not affect the original'],
    [
      'Handle primitives by returning them as-is (base case of the recursion).',
      'Recurse into arrays and plain objects, cloning each property/element.',
      'Guard against circular references with a `Map` of already-cloned sources → clones.',
    ],
    `function deepClone(value, seen = new Map()) {
  if (value === null || typeof value !== 'object') return value;
  if (seen.has(value)) return seen.get(value);

  const clone = Array.isArray(value) ? [] : {};
  seen.set(value, clone);

  for (const key of Object.keys(value)) {
    clone[key] = deepClone(value[key], seen);
  }
  return clone;
}`,
    ['recursion', 'objects'],
  ),
  p(
    'JavaScript',
    'Medium',
    'Flatten a nested array to a given depth',
    'Implement `flatten(arr, depth = 1)`, matching the behavior of `Array.prototype.flat`.',
    ['flatten([1, [2, [3, [4]]]], 2) → [1, 2, 3, [4]]'],
    [
      'If depth is 0, return the array unchanged (nothing left to flatten).',
      'Otherwise reduce over the array: spread nested arrays one level (recursing with `depth - 1`), keep other values as-is.',
    ],
    `function flatten(arr, depth = 1) {
  if (depth <= 0) return arr.slice();
  return arr.reduce((flat, item) => {
    return flat.concat(Array.isArray(item) ? flatten(item, depth - 1) : item);
  }, []);
}`,
    ['arrays', 'recursion'],
  ),
  p(
    'JavaScript',
    'Hard',
    'Implement `Array.prototype.myReduce`',
    'Recreate `reduce` from scratch, including support for calls with and without an initial value.',
    ['[1, 2, 3].myReduce((acc, n) => acc + n, 0) → 6', '[1, 2, 3].myReduce((acc, n) => acc + n) → 6 (uses index 0 as the seed)'],
    [
      'If no initial value is passed, use the first array element as the accumulator and start iterating from index 1.',
      'Throw on an empty array with no initial value, matching the native behavior.',
      'Call the callback with `(accumulator, currentValue, index, array)` on each step.',
    ],
    `Array.prototype.myReduce = function (callback, initialValue) {
  const hasInitial = arguments.length >= 2;
  if (!hasInitial && this.length === 0) {
    throw new TypeError('Reduce of empty array with no initial value');
  }

  let acc = hasInitial ? initialValue : this[0];
  const startIndex = hasInitial ? 0 : 1;

  for (let i = startIndex; i < this.length; i++) {
    acc = callback(acc, this[i], i, this);
  }
  return acc;
};`,
    ['polyfills', 'arrays'],
  ),
  p(
    'JavaScript',
    'Medium',
    'Build a minimal `EventEmitter`',
    'Implement `on`, `off`, and `emit` for a simple pub/sub event emitter.',
    ['const bus = new EventEmitter(); bus.on("tick", cb); bus.emit("tick", 42) → calls cb(42)'],
    [
      'Store listeners in a `Map` keyed by event name, each value an array of callbacks.',
      '`on` pushes a callback into that event’s array (creating it if it doesn’t exist).',
      '`emit` calls every listener for that event with the provided arguments; `off` removes a specific listener.',
    ],
    `class EventEmitter {
  constructor() {
    this.listeners = new Map();
  }
  on(event, callback) {
    if (!this.listeners.has(event)) this.listeners.set(event, []);
    this.listeners.get(event).push(callback);
    return this;
  }
  off(event, callback) {
    const callbacks = this.listeners.get(event);
    if (!callbacks) return this;
    this.listeners.set(event, callbacks.filter((cb) => cb !== callback));
    return this;
  }
  emit(event, ...args) {
    (this.listeners.get(event) ?? []).forEach((cb) => cb(...args));
    return this;
  }
}`,
    ['design-patterns', 'oop'],
  ),
  p(
    'JavaScript',
    'Hard',
    'Implement `Promise.all` from scratch',
    'Given an array of promises (or values), return a promise that resolves with an array of results, or rejects on the first rejection.',
    ['myPromiseAll([p1, p2, 3]) → resolves [result1, result2, 3] once p1 and p2 settle'],
    [
      'Wrap the logic in a `new Promise((resolve, reject) => ...)`.',
      'Track a results array and a completed counter; resolve once every entry has settled.',
      'Use `Promise.resolve(item)` so plain (non-promise) values work too, and reject immediately on any failure.',
    ],
    `function myPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = new Array(promises.length);
    let completed = 0;

    if (promises.length === 0) return resolve(results);

    promises.forEach((item, index) => {
      Promise.resolve(item)
        .then((value) => {
          results[index] = value;
          completed += 1;
          if (completed === promises.length) resolve(results);
        })
        .catch(reject);
    });
  });
}`,
    ['promises', 'async'],
  ),

  p(
    'React',
    'Medium',
    'Build a `useDebounce` hook',
    'Write a hook that returns a debounced version of a fast-changing value, so a search input doesn’t re-filter on every keystroke.',
    ['const debounced = useDebounce(searchTerm, 300); // updates 300ms after typing stops'],
    [
      'Hold the debounced value in state, seeded with the initial value.',
      'In a `useEffect` keyed on `[value, delay]`, start a timer that updates the state after `delay`.',
      'Return a cleanup function that clears the timer — this is what cancels stale, in-flight updates.',
    ],
    `function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}`,
    ['hooks', 'performance'],
  ),
  p(
    'React',
    'Medium',
    'Build a controlled form with inline validation',
    'A signup form with email + password fields that shows a validation error under each field on blur, and disables submit until both are valid.',
    ['Invalid email on blur → "Enter a valid email" appears under the field; Submit stays disabled.'],
    [
      'Keep form values and a parallel "touched" map in state — only show an error for a field once it’s been touched.',
      'Derive validity from the current values on every render rather than storing "isValid" in state (avoids it going stale).',
      'Disable the submit button based on that derived validity, not a separately tracked flag.',
    ],
    `function SignupForm() {
  const [values, setValues] = useState({ email: '', password: '' });
  const [touched, setTouched] = useState({});

  const errors = {
    email: /\\S+@\\S+\\.\\S+/.test(values.email) ? '' : 'Enter a valid email',
    password: values.password.length >= 8 ? '' : 'Password must be at least 8 characters',
  };
  const isValid = !errors.email && !errors.password;

  const handleChange = (field) => (e) =>
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
  const handleBlur = (field) => () =>
    setTouched((prev) => ({ ...prev, [field]: true }));

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input value={values.email} onChange={handleChange('email')} onBlur={handleBlur('email')} />
      {touched.email && errors.email && <p>{errors.email}</p>}

      <input type="password" value={values.password} onChange={handleChange('password')} onBlur={handleBlur('password')} />
      {touched.password && errors.password && <p>{errors.password}</p>}

      <button type="submit" disabled={!isValid}>Sign up</button>
    </form>
  );
}`,
    ['forms', 'validation'],
  ),
  p(
    'React',
    'Medium',
    'Build an accessible toggle switch',
    'A boolean on/off switch that is keyboard-operable and announces its state to screen readers — not just two `<div>`s with a click handler.',
    ['<Toggle checked={darkMode} onChange={setDarkMode} label="Dark mode" />'],
    [
      'Use a real `<button>` (natively focusable and keyboard-clickable) rather than a `<div>` with a click handler.',
      'Expose state via `role="switch"` and `aria-checked`, so assistive tech announces it correctly.',
      'Drive the visual state purely from the `checked` prop — the component itself stays uncontrolled of its own state.',
    ],
    `function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={\`toggle \${checked ? 'on' : 'off'}\`}
    >
      <span className="toggle-thumb" />
      <span className="sr-only">{label}</span>
    </button>
  );
}`,
    ['accessibility', 'components'],
  ),
  p(
    'React',
    'Hard',
    'Build a `useFetch` hook with loading and error state',
    'A reusable hook that fetches JSON from a URL and exposes `{ data, loading, error }`, correctly handling a URL that changes and unmounting mid-request.',
    ['const { data, loading, error } = useFetch(`/api/users/${id}`);'],
    [
      'Use an `AbortController` per request so a stale request (from a URL that already changed) can’t overwrite fresher state.',
      'Reset `loading`/`error`/`data` at the start of every new request, keyed by the `url` dependency.',
      'In the effect cleanup, abort the in-flight request — this also prevents "set state on unmounted component" warnings.',
    ],
    `function useFetch(url) {
  const [state, setState] = useState({ data: null, loading: true, error: null });

  useEffect(() => {
    const controller = new AbortController();
    setState({ data: null, loading: true, error: null });

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(\`Request failed: \${res.status}\`);
        return res.json();
      })
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((error) => {
        if (error.name !== 'AbortError') setState({ data: null, loading: false, error });
      });

    return () => controller.abort();
  }, [url]);

  return state;
}`,
    ['hooks', 'data-fetching'],
  ),
  p(
    'React',
    'Hard',
    'Implement infinite scroll with `IntersectionObserver`',
    'Load the next page of results automatically when the user scrolls a sentinel element into view, without a scroll event listener.',
    ['<ul>{items.map(renderItem)}</ul><div ref={sentinelRef} /> // loadMore() fires when this div is visible'],
    [
      'Attach an `IntersectionObserver` to a sentinel element placed after the last list item.',
      'Call `loadMore()` when the sentinel intersects, and guard against firing again while a page is already loading.',
      'Disconnect the observer in the effect cleanup to avoid leaks when the list unmounts or re-renders with a new sentinel.',
    ],
    `function useInfiniteScroll(loadMore, { disabled = false } = {}) {
  const sentinelRef = useRef(null);

  useEffect(() => {
    if (disabled || !sentinelRef.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) loadMore();
    }, { rootMargin: '200px' });

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [loadMore, disabled]);

  return sentinelRef;
}`,
    ['hooks', 'performance'],
  ),
  p(
    'React',
    'Medium',
    'Prevent a list from re-rendering every row on every keystroke',
    'A search box filters a large list; typing currently causes every row component to re-render, not just the ones whose visibility changed.',
    ['1,000-row list + `React.memo` row component: typing should re-render only the parent list, not all 1,000 rows.'],
    [
      'Wrap the row component in `React.memo` so it skips re-rendering when its props are referentially unchanged.',
      'Make sure any callback passed to a row (e.g. `onSelect`) is stable via `useCallback` — an inline arrow function defeats `memo` every time.',
      'Keep the search input’s own state local to the search box, not lifted to a parent that also re-renders the whole list on every keystroke.',
    ],
    `const Row = React.memo(function Row({ item, onSelect }) {
  return <li onClick={() => onSelect(item.id)}>{item.label}</li>;
});

function FilterableList({ items }) {
  const [query, setQuery] = useState('');
  const handleSelect = useCallback((id) => console.log('selected', id), []);

  const visible = useMemo(
    () => items.filter((i) => i.label.toLowerCase().includes(query.toLowerCase())),
    [items, query],
  );

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <ul>{visible.map((item) => <Row key={item.id} item={item} onSelect={handleSelect} />)}</ul>
    </div>
  );
}`,
    ['performance', 'memoization'],
  ),
]

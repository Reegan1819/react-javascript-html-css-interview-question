let seq = 0
const q = (category, difficulty, question, answer, tags) => ({
  id: `q${++seq}`,
  category,
  difficulty,
  question,
  answer,
  tags,
})

export const CATEGORIES = ['JavaScript', 'React', 'Redux', 'System Design', 'CS Fundamentals', 'Behavioral']
export const DIFFICULTIES = ['Easy', 'Medium', 'Hard']

export const QUESTIONS = [
  q('JavaScript', 'Easy', 'What is the difference between `let`, `const`, and `var`?', [
    '`var` is function-scoped and hoisted with an `undefined` initial value; `let`/`const` are block-scoped and sit in a "temporal dead zone" until their line runs.',
    '`const` prevents reassignment of the binding, not mutation — a `const` array or object can still have its contents changed.',
    'Prefer `const` by default, `let` when a variable needs to be reassigned, and avoid `var` in new code.',
  ], ['scope', 'hoisting']),
  q('JavaScript', 'Medium', 'Explain closures with a practical example.', [
    'A closure is a function that retains access to variables from its enclosing scope even after that scope has returned.',
    'Classic use: a counter factory — `function makeCounter(){ let n=0; return () => ++n }` — each returned function keeps its own private `n`.',
    'Closures power module patterns, memoization caches, and event handlers that need to remember state without polluting global scope.',
  ], ['closures', 'scope']),
  q('JavaScript', 'Medium', 'What is the event loop and how do microtasks differ from macrotasks?', [
    'JS runs on a single thread; the event loop pulls callbacks off queues once the call stack is empty.',
    'Microtasks (Promise `.then`, `queueMicrotask`) drain completely before the next macrotask (setTimeout, I/O, UI events).',
    'This is why `Promise.resolve().then(fn)` runs before a `setTimeout(fn, 0)`, even with a 0ms delay.',
  ], ['event-loop', 'async']),
  q('JavaScript', 'Hard', 'How does prototypal inheritance work under the hood?', [
    'Every object has an internal `[[Prototype]]` link (accessible via `Object.getPrototypeOf`); property lookups walk this chain until found or the chain ends at `null`.',
    '`class` syntax is sugar over this: methods defined in a class body live on `ClassName.prototype`, shared by every instance instead of copied per-object.',
    '`Object.create(proto)` lets you build a prototype chain directly without a constructor function at all.',
  ], ['prototypes', 'oop']),
  q('JavaScript', 'Medium', 'What is the difference between `==` and `===`, and when (if ever) would you use `==`?', [
    '`===` compares type and value with no coercion; `==` coerces operands to a common type first, which can produce surprising results (`[] == false` is `true`).',
    'A defensible use of `==` is `value == null`, which matches both `null` and `undefined` in one check.',
    'Outside that idiom, default to `===` so comparisons stay predictable and easy to review.',
  ], ['equality', 'coercion']),
  q('JavaScript', 'Hard', 'Explain `Promise.all`, `Promise.allSettled`, `Promise.race`, and `Promise.any`.', [
    '`Promise.all` resolves when every promise resolves, rejects fast on the first rejection — good when all results are required.',
    '`Promise.allSettled` waits for every promise regardless of outcome and returns status objects — good for independent, best-effort tasks.',
    '`Promise.race` settles as soon as any promise settles (fulfilled or rejected); `Promise.any` settles on the first fulfillment and only rejects if all reject.',
  ], ['promises', 'async']),

  q('React', 'Easy', 'What problem do keys solve in a list of rendered elements?', [
    'Keys let React match array items across renders to existing DOM nodes and component instances instead of diffing by position.',
    'A stable, unique key (e.g. a database id) avoids state bugs and unnecessary re-mounts when items are reordered, inserted, or removed.',
    'Using array index as a key is safe only when the list is static and never reordered or filtered.',
  ], ['lists', 'reconciliation']),
  q('React', 'Medium', 'When would you reach for `useMemo` or `useCallback`, and when are they unnecessary?', [
    '`useMemo` caches an expensive computed value; `useCallback` caches a function reference — both only matter when that referential stability affects a dependency array or a memoized child.',
    'They add their own overhead (holding onto old values, comparing deps), so wrapping every value "for performance" without measuring is usually a net loss.',
    'Reach for them when profiling shows a real re-render cost, or when passing callbacks into a component wrapped in `React.memo`.',
  ], ['performance', 'hooks']),
  q('React', 'Medium', 'What is the difference between controlled and uncontrolled components?', [
    'A controlled input’s value is driven by React state (`value` + `onChange`), making the component the single source of truth.',
    'An uncontrolled input keeps its own internal DOM state, read imperatively via a `ref` when needed (e.g. on submit).',
    'Controlled components make validation and conditional UI straightforward; uncontrolled ones reduce re-renders for simple, high-frequency inputs like large forms.',
  ], ['forms', 'refs']),
  q('React', 'Hard', 'Walk through what happens during React’s render and commit phases.', [
    'Render phase: React calls components to build a new element tree and diffs it against the previous one — this phase is pure and can be paused, aborted, or restarted (important for concurrent features).',
    'Commit phase: React applies the computed DOM mutations, runs layout effects synchronously, then runs passive effects (`useEffect`) after paint.',
    'Because render can run more than once for the same commit under concurrent rendering, component bodies must stay free of side effects.',
  ], ['rendering', 'internals']),
  q('React', 'Medium', 'Why does the dependency array in `useEffect` matter, and what’s a common bug with it?', [
    'The dependency array tells React when to re-run the effect by comparing values via `Object.is` between renders.',
    'A common bug: omitting a value the effect actually reads (a "stale closure") causes the effect to keep using outdated state or props.',
    'The opposite bug — an unstable object/array/function recreated every render inside the array — causes the effect to fire on every render; fix by memoizing that value or narrowing the dependency to its primitive fields.',
  ], ['hooks', 'effects']),
  q('React', 'Hard', 'How does the Context API cause re-renders, and how do you avoid over-triggering them?', [
    'Every component consuming a context via `useContext` re-renders whenever the provider’s value changes, regardless of which slice of that value it actually uses.',
    'A common mistake is passing a new object literal as the value on every render — split state into multiple contexts by concern, or memoize the value object.',
    'For frequently changing, widely consumed state, a dedicated state library (or colocating state closer to where it’s used) often scales better than one large context.',
  ], ['context', 'performance']),

  q('Redux', 'Easy', 'What are the three core principles of Redux?', [
    'Single source of truth — the entire application state lives in one store tree.',
    'State is read-only — the only way to change it is to dispatch an action describing what happened.',
    'Changes are made with pure functions — reducers take the previous state and an action and return a new state, without mutating the original.',
  ], ['fundamentals', 'principles']),
  q('Redux', 'Medium', 'What is the role of a reducer, and why must it be a pure function?', [
    'A reducer is `(state, action) => newState` — it computes the next state from the current state and an action, and nothing else.',
    'Purity (no side effects, no mutation, deterministic output for the same inputs) is what makes state predictable, time-travel debugging possible, and change detection cheap (reference equality).',
    'Mutating state directly inside a reducer breaks that reference-equality check, so connected components silently fail to re-render.',
  ], ['reducers', 'immutability']),
  q('Redux', 'Medium', 'Why do you need middleware like `redux-thunk` for async logic?', [
    'A plain Redux `dispatch` only accepts a plain action object — reducers must stay synchronous and pure, so they can’t make API calls themselves.',
    '`redux-thunk` lets `dispatch` also accept a function; Redux calls that function with `(dispatch, getState)`, so it can run async work and dispatch plain actions once it resolves.',
    'Alternatives like `redux-saga` (generator-based side-effect management) or RTK Query solve the same problem with different trade-offs around testability and complexity.',
  ], ['middleware', 'async']),
  q('Redux', 'Medium', 'How do `useSelector` and `useDispatch` compare to the older `connect()` API?', [
    '`connect()` is a higher-order component that maps state/dispatch to props via `mapStateToProps`/`mapDispatchToProps`, wrapping your component.',
    '`useSelector(selectorFn)` and `useDispatch()` are hooks that read from and dispatch to the store directly inside a function component — no wrapping HOC, less boilerplate.',
    '`useSelector` re-renders the component whenever the selected slice changes (by strict equality by default), so selectors should return the smallest, most stable value they can.',
  ], ['hooks', 'react-redux']),
  q('Redux', 'Hard', 'What problem does Redux Toolkit’s `createSlice` solve compared to hand-written Redux?', [
    'Hand-written Redux needs separate action types, action creators, and a switch-statement reducer per feature — a lot of repetitive boilerplate.',
    '`createSlice` generates action creators and action types from a single object of reducer functions, and lets you "mutate" state inside them because it uses Immer under the hood to produce an immutable update.',
    'It also nudges toward Redux Toolkit’s other defaults (a preconfigured store with thunk and DevTools, `createAsyncThunk` for async logic) that used to require manual setup.',
  ], ['redux-toolkit', 'immer']),
  q('Redux', 'Hard', 'When would you choose Redux over React Context + `useReducer`, or vice versa?', [
    'Context + `useReducer` is enough for state that’s localized to a feature or subtree, changes infrequently, and doesn’t need tooling like time-travel debugging.',
    'Redux earns its cost at larger scale: cross-cutting state touched by many distant components, a need for middleware (logging, async orchestration), or strong dev-tooling requirements (action history, replay).',
    'A common progression is to start with local state or Context, and reach for Redux only once prop-drilling or ad hoc context providers become the actual bottleneck.',
  ], ['architecture', 'trade-offs']),

  q('System Design', 'Medium', 'How would you design a URL shortener?', [
    'Core write path: generate a short code (base62 counter, or hash + collision check) and store `{code -> long_url}` in a key-value store for O(1) lookups.',
    'Read path dominates traffic — put a cache (e.g. Redis) in front of the datastore and consider a CDN edge redirect for hot links.',
    'Plan for: custom aliases, expiration/TTL, click analytics written asynchronously (don’t block the redirect), and rate limiting to prevent abuse.',
  ], ['scalability', 'caching']),
  q('System Design', 'Hard', 'How do you design a system to handle 1 million concurrent chat connections?', [
    'Use a protocol that keeps a persistent connection (WebSocket) and a stateless-per-request gateway layer that can scale horizontally behind a load balancer with sticky-session-aware routing.',
    'Fan out messages through a pub/sub broker (e.g. Redis Pub/Sub, Kafka) keyed by room/channel so any gateway node can deliver to any connected client.',
    'Track connection state (who’s online, which node holds their socket) in a shared, low-latency store, and design for graceful reconnection since long-lived connections will drop.',
  ], ['scalability', 'realtime']),
  q('System Design', 'Medium', 'What is the difference between horizontal and vertical scaling, and their trade-offs?', [
    'Vertical scaling adds resources (CPU/RAM) to a single machine — simple, no distributed-systems complexity, but has a hard ceiling and a single point of failure.',
    'Horizontal scaling adds more machines and distributes load — near-unlimited headroom and better fault tolerance, but introduces network overhead, data consistency, and coordination challenges.',
    'Most production systems scale vertically until it’s cheap not to, then move to horizontal scaling for the stateless layers first (web/app servers) before tackling stateful ones (databases).',
  ], ['scalability', 'infrastructure']),
  q('System Design', 'Hard', 'How would you design a rate limiter for an API?', [
    'Token bucket or sliding-window-log algorithms are common: token bucket allows controlled bursts, sliding window gives smoother, more precise limits.',
    'Store counters in a fast shared store (Redis) with atomic increment + TTL so limits hold across multiple API server instances.',
    'Return `429 Too Many Requests` with `Retry-After`, and consider tiered limits (per-IP, per-API-key, per-endpoint) so one abusive client can’t starve others.',
  ], ['api-design', 'reliability']),

  q('CS Fundamentals', 'Easy', 'What is the difference between a stack and a queue?', [
    'A stack is LIFO (last in, first out) — think the browser’s back button or function call frames.',
    'A queue is FIFO (first in, first out) — think a print queue or a task processed in arrival order.',
    'Both support O(1) insert/remove at their respective ends; the difference is purely which end you remove from.',
  ], ['data-structures']),
  q('CS Fundamentals', 'Medium', 'What is Big-O notation and why does it matter?', [
    'Big-O describes how an algorithm’s time or space requirements grow as input size grows, ignoring constant factors and lower-order terms.',
    'It lets you compare algorithms independent of hardware — an O(n²) sort will eventually lose to an O(n log n) sort no matter how fast the machine.',
    'In interviews, always state the complexity of both your first working solution and any optimization, and be explicit about time vs. space trade-offs.',
  ], ['complexity', 'algorithms']),
  q('CS Fundamentals', 'Medium', 'When would you choose a hash map over a binary search tree?', [
    'A hash map gives average O(1) lookup/insert/delete when you don’t need ordering — ideal for caches, lookups by key, and counting/frequency problems.',
    'A balanced BST (or its variants) gives O(log n) operations but keeps keys sorted, enabling range queries, ordered traversal, and floor/ceiling lookups a hash map can’t do efficiently.',
    'Hash maps can degrade under poor hash distribution or need resizing; BSTs have steadier worst-case behavior when self-balancing.',
  ], ['data-structures', 'trade-offs']),
  q('CS Fundamentals', 'Hard', 'Explain the CAP theorem and give a real system for each trade-off.', [
    'CAP says a distributed system can only fully guarantee two of Consistency, Availability, and Partition tolerance during a network partition — and partitions are a fact of life, so it’s really a C-vs-A choice under partition.',
    'CP example: a system like ZooKeeper or a strongly consistent config store rejects requests rather than risk stale reads during a partition.',
    'AP example: DNS or Cassandra (default settings) keeps serving reads/writes during a partition and reconciles data afterward, accepting temporary inconsistency.',
  ], ['distributed-systems', 'theory']),

  q('Behavioral', 'Easy', 'Tell me about a time you disagreed with a teammate. How did you handle it?', [
    'Use the STAR structure: Situation, Task, Action, Result — anchor the story in a specific, real disagreement rather than a generic one.',
    'Focus on how you sought to understand their reasoning first, brought data or concrete trade-offs rather than opinions, and reached a decision — even if it wasn’t your original position.',
    'End with the outcome and what you’d do the same or differently next time; interviewers are listening for self-awareness as much as the resolution.',
  ], ['communication', 'star-method']),
  q('Behavioral', 'Medium', 'Describe a project that failed or didn’t go as planned. What did you learn?', [
    'Pick a real failure with genuine stakes — avoid disguised humble-brags ("I worked too hard").',
    'Be specific about your role in the failure, not just external factors, and show what you changed afterward (a process, a habit, a way you communicate).',
    'Close with concrete evidence the lesson stuck — a later situation where you applied it differently.',
  ], ['self-reflection', 'star-method']),
  q('Behavioral', 'Medium', 'How do you prioritize when you have multiple deadlines at once?', [
    'Name a concrete framework you actually use — impact vs. effort, urgency vs. importance, or explicit stakeholder alignment — rather than "I just work harder."',
    'Give a real example: what you deprioritized, how you communicated that trade-off to stakeholders, and what the result was.',
    'Emphasize communication — interviewers care less about the exact framework and more about whether you proactively flag trade-offs instead of silently overcommitting.',
  ], ['prioritization', 'communication']),
  q('Behavioral', 'Hard', 'Tell me about a time you had to influence a decision without direct authority.', [
    'Set up the stakes clearly: who needed convincing, why they initially disagreed or were indifferent, and what was actually at risk.',
    'Detail the approach — building a prototype, gathering data, finding an ally, or reframing the problem around the other person’s incentives — rather than just "I made a strong case."',
    'Land on the measurable outcome and, ideally, a moment where the other person later credited or built on your input.',
  ], ['leadership', 'influence']),
]

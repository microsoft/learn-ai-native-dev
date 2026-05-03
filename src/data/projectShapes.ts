import type { ContentStatus } from './paths'

export type ExampleAudience = 'researcher' | 'developer' | 'business' | 'creative'
export type ExampleDifficulty = 'starter' | 'spicy'

/**
 * A ProjectShape is a problem domain the learner picks (e.g. Iris Lab,
 * Deal Dashboard). Foundation lessons fill template variables from this
 * data. Other paths may consume shapes in the future.
 *
 * See `docs/philosophy.md` §4 for the role of ProjectShape in the
 * three-content-kind model (Path / Recipe / ProjectShape).
 */
export interface ProjectShape {
  id: string
  name: string
  icon: string
  industry: string
  description: string
  projectName: string
  folderName: string
  /**
   * Who this project is for. Drives the audience filter on /projects.
   * Defaults to 'business' for backward compatibility with existing shapes.
   */
  audience?: ExampleAudience
  /** Optional second filter; defaults to 'starter' */
  difficulty?: ExampleDifficulty
  /** Lifecycle status. Existing shapes are 'official'. */
  status?: ContentStatus
  /** GitHub handle for community-contributed shapes */
  contributedBy?: string
  // What the user builds
  whatYouBuild: string
  // Sample data description
  sampleDataDescription: string
  // Data items (plural noun for what the dashboard tracks)
  dataItems: string
  // Color coding explanation
  colorCoding: {
    green: string
    yellow: string
    red: string
  }
  // Requirements content
  requirements: {
    goal: string
    users: string
    whatItShows: string[]
    r1Through6: string
    r7Through12: string
  }
  // Task examples
  taskExamples: {
    tooBig: string
    rightSize: string[]
  }
  // Demo script context
  demoScriptContext: string
  // Verification examples
  verificationExamples: string[]
}

/** @deprecated Use `ProjectShape`. Kept for backward-compat with older imports. */
export type ExampleTrack = ProjectShape

export const projectShapes: ProjectShape[] = [
  // ───────────────────────────────────────────────────────────────────────
  // Researcher audience
  // ───────────────────────────────────────────────────────────────────────
  {
    id: 'iris-classifier',
    name: 'Iris Classifier Lab',
    icon: '🔬',
    industry: 'Data & ML',
    audience: 'researcher',
    status: 'official',
    description: 'Train a tiny ML model in the browser. Load a sample flower dataset, fit a classifier, and watch accuracy improve — the simplest possible intro to spec-driven ML for students and researchers.',
    projectName: 'Iris Classifier Lab',
    folderName: 'iris-classifier',
    whatYouBuild: 'A browser-based ML lab that trains a classifier on a sample dataset and visualizes predictions',
    sampleDataDescription: 'sample Iris flower measurements with species labels',
    dataItems: 'predictions',
    colorCoding: {
      green: 'correct — predicted species matches the label',
      yellow: 'uncertain — low-confidence prediction (under threshold)',
      red: 'misclassified — predicted species is wrong'
    },
    requirements: {
      goal: 'A small ML lab where a researcher or student can train a classifier on a labeled dataset, tweak hyperparameters, and inspect which samples the model gets right, wrong, or is unsure about.',
      users: 'ML students, data-science learners, and researchers exploring spec-driven workflows for small models',
      whatItShows: [
        'A data table of at least 30 sample rows with features and ground-truth labels',
        'A "Train" button that fits a classifier and reports accuracy',
        'A predictions panel where each row is color-coded: Green (correct), Yellow (low confidence), Red (misclassified)',
        'A confusion matrix or per-class accuracy summary'
      ],
      r1Through6: `R1: Header with project title, dataset name, and current model accuracy
R2: Data table displaying at least 30 sample rows with feature columns and species label
R3: Predictions color-coded green / yellow / red after training
R4: Numeric values formatted to a sensible precision (e.g., 0.87 accuracy, 4.50 cm)
R5: Works immediately when opened — bundled sample data, no upload required
R6: Clean, lab-notebook appearance suitable for a research demo or class`,
      r7Through12: `R7: Train the model
    - "Train" button fits a classifier (e.g., logistic regression or k-NN) on the sample data
    - Shows training progress and final accuracy
    - How to verify: Click Train — accuracy number appears (e.g., "Accuracy: 0.93")

R8: Filter predictions by outcome
    - Buttons: All, Correct, Uncertain, Misclassified
    - Active filter highlighted; counts update
    - How to verify: Click "Misclassified" — only red rows appear

R9: Hyperparameter controls
    - Sliders or selects for at least two knobs (e.g., learning rate, k for k-NN, train/test split)
    - Re-training updates accuracy and prediction colors
    - How to verify: Change k from 3 → 7, retrain — accuracy changes

R10: Confusion matrix or per-class summary
    - Visual grid showing predicted vs actual counts per class
    - How to verify: After training — matrix populates with non-zero cells on the diagonal

R11: Reset to defaults
    - Button to restore original sample data and default hyperparameters
    - How to verify: Tweak knobs, click Reset — values return to defaults

R12: Responsive layout
    - Table, controls, and matrix stack on phone screens
    - How to verify: Narrow browser — layout adapts gracefully`
    },
    taskExamples: {
      tooBig: 'Build the entire ML lab',
      rightSize: [
        'Render a data table with feature columns and the label column',
        'Add 30 sample Iris rows spanning all three species',
        'Add a Train button that updates an accuracy number above the table'
      ]
    },
    demoScriptContext: 'a researcher or instructor might say when walking students through a first ML model',
    verificationExamples: [
      'Click Train — accuracy appears (e.g., 0.93) and rows turn green / yellow / red',
      'Click "Misclassified" — only red rows remain',
      'Change a hyperparameter, retrain — accuracy and confusion matrix update'
    ]
  },
  // ───────────────────────────────────────────────────────────────────────
  // Business audience
  // ───────────────────────────────────────────────────────────────────────
  {
    id: 'deal-dashboard',
    name: 'Deal Health Dashboard',
    icon: '💼',
    industry: 'Sales & Business',
    audience: 'business',
    status: 'official',
    description: 'Track sales deals and spot which ones need attention. The classic business dashboard — if you\'ve used a CRM, this will feel familiar.',
    projectName: 'Deal Health Dashboard',
    folderName: 'deal-dashboard',
    whatYouBuild: 'A dashboard showing sales deals with color-coded health status',
    sampleDataDescription: 'sample deals with names, values, and health indicators',
    dataItems: 'deals',
    colorCoding: {
      green: 'healthy — on track to close',
      yellow: 'at risk — needs attention soon',
      red: 'critical — likely to slip or lose'
    },
    requirements: {
      goal: 'A dashboard where a sales manager can see all their deals at a glance and quickly identify which ones need attention.',
      users: 'Sales managers, account executives, and business leaders who track revenue',
      whatItShows: [
        'A table of deals with key information',
        'Each deal shows: company name, deal value, expected close date, sales stage, and health status',
        'Health status is color-coded: Green (healthy), Yellow (at risk), Red (critical)'
      ],
      r1Through6: `R1: Clear title and description explaining what the dashboard shows
R2: Table displaying at least 8 sample deals with realistic business data
R3: Health status visually indicated with colored badges or backgrounds
R4: Deal value formatted as currency (e.g., $50,000)
R5: Works immediately when opened — no loading or setup required
R6: Professional appearance suitable for a sales team meeting`,
      r7Through12: `R7: Filter buttons
    - Buttons to filter: All, Healthy (green), At Risk (yellow), Critical (red)
    - Active filter is visually highlighted
    - How to verify: Click "Critical" — only red deals appear

R8: Deal detail panel
    - Clicking a deal row reveals additional details
    - Shows: risk factors, last contact date, next steps, notes
    - How to verify: Click any deal — see expanded information

R9: Edit deal information
    - Can modify deal values, stage, health status, and notes
    - Changes appear immediately in the table
    - How to verify: Change a deal's health from Green to Red — badge color updates

R10: Persistent storage
    - Changes survive page refresh using browser storage
    - How to verify: Edit a deal, refresh the page — changes remain

R11: Reset to defaults
    - Button to restore original sample data
    - How to verify: Make changes, click Reset — original data returns

R12: Responsive layout
    - Usable on tablet and phone screens
    - How to verify: Narrow the browser window — layout adapts gracefully`
    },
    taskExamples: {
      tooBig: 'Build the complete dashboard',
      rightSize: [
        'Create table structure with column headers',
        'Add 8 sample deals with realistic data',
        'Style health status as colored badges'
      ]
    },
    demoScriptContext: 'a sales manager might say when presenting pipeline health to leadership',
    verificationExamples: [
      'Click "Critical" filter — only red status deals visible',
      'Click a deal row — risk factors and next steps appear',
      'Edit deal health — color changes immediately'
    ]
  },
  {
    id: 'milestone-tracker',
    name: 'Project Milestone Tracker',
    icon: '🎯',
    industry: 'Project Management',
    audience: 'business',
    status: 'official',
    description: 'Visualize project progress on a timeline. See what\'s done, what\'s happening now, and what\'s coming up — perfect for status meetings and stakeholder updates.',
    projectName: 'Project Milestone Tracker',
    folderName: 'milestone-tracker',
    whatYouBuild: 'A visual timeline showing project milestones with status indicators',
    sampleDataDescription: 'sample project milestones with dates and completion status',
    dataItems: 'milestones',
    colorCoding: {
      green: 'completed — milestone achieved',
      yellow: 'in progress — currently working on this',
      red: 'overdue — past due date, not yet complete'
    },
    requirements: {
      goal: 'A visual timeline where project managers can track milestones, see overall progress, and quickly identify overdue items.',
      users: 'Project managers, team leads, and executives who need project status at a glance',
      whatItShows: [
        'A horizontal timeline of project milestones',
        'Each milestone shows: name, target date, owner, and status',
        'Status is color-coded: Green (completed), Yellow (in progress), Red (overdue)',
        'A progress bar showing overall project completion'
      ],
      r1Through6: `R1: Project title and overall progress summary at the top
R2: Timeline displaying at least 8 milestones in chronological order
R3: Milestone status clearly shown with colored indicators on the timeline
R4: Dates formatted clearly (e.g., "Jan 15" or "Jan 15, 2025")
R5: Works immediately when opened — no loading or setup required
R6: Professional appearance suitable for a stakeholder presentation`,
      r7Through12: `R7: Filter by status
    - Buttons to show: All milestones, Completed, In Progress, Overdue
    - Timeline updates to highlight or show only matching milestones
    - How to verify: Click "Overdue" — only red milestones are emphasized

R8: Milestone detail panel
    - Clicking a milestone shows full details
    - Shows: description, deliverables, dependencies, blockers, notes
    - How to verify: Click any milestone — see expanded information below the timeline

R9: Update milestone status
    - Can mark milestones as complete, in progress, or not started
    - Can update target dates and add notes
    - How to verify: Mark an "In Progress" milestone as "Complete" — it turns green

R10: Persistent storage
    - Progress survives page refresh
    - How to verify: Complete a milestone, refresh — it's still marked complete

R11: Reset project
    - Button to restore original milestone data
    - How to verify: Make changes, click Reset — original timeline returns

R12: Responsive layout
    - Timeline scrolls horizontally on smaller screens
    - How to verify: Narrow browser window — can still scroll through milestones`
    },
    taskExamples: {
      tooBig: 'Build the complete timeline',
      rightSize: [
        'Create horizontal timeline container with date markers',
        'Add 8 milestone nodes positioned along the timeline',
        'Style milestones with status colors and connecting lines'
      ]
    },
    demoScriptContext: 'a project manager might say when giving a status update to stakeholders',
    verificationExamples: [
      'Click "Overdue" — only red milestones highlighted',
      'Click a milestone — see description and blockers',
      'Mark milestone complete — node turns green, progress bar updates'
    ]
  },
  {
    id: 'feedback-wall',
    name: 'Customer Feedback Wall',
    icon: '💬',
    industry: 'Product & Customer Experience',
    audience: 'business',
    status: 'official',
    description: 'Organize customer feedback by sentiment. See what customers love, what concerns them, and what needs immediate attention — all on one visual board.',
    projectName: 'Customer Feedback Wall',
    folderName: 'feedback-wall',
    whatYouBuild: 'A card-based board showing customer feedback organized by sentiment',
    sampleDataDescription: 'sample customer feedback entries with sentiment and source',
    dataItems: 'feedback items',
    colorCoding: {
      green: 'positive — praise, compliments, success stories',
      yellow: 'neutral — questions, suggestions, mixed feelings',
      red: 'negative — complaints, frustrations, urgent issues'
    },
    requirements: {
      goal: 'A visual feedback board where product teams can see customer sentiment at a glance, identify patterns, and track which items have been addressed.',
      users: 'Product managers, customer success teams, and executives who want to understand customer voice',
      whatItShows: [
        'A wall of feedback cards organized in columns or a grid',
        'Each card shows: customer quote, source (email, survey, social), date, and sentiment',
        'Sentiment is color-coded: Green (positive), Yellow (neutral), Red (negative)',
        'Summary counts showing how much feedback in each category'
      ],
      r1Through6: `R1: Clear title and sentiment summary showing counts for each category
R2: At least 8 feedback cards with realistic customer quotes
R3: Cards colored by sentiment (green/yellow/red border or background)
R4: Source and date displayed on each card
R5: Works immediately when opened — no loading required
R6: Professional appearance suitable for a product review meeting`,
      r7Through12: `R7: Filter by sentiment
    - Buttons to show: All feedback, Positive, Neutral, Negative
    - Cards filter to show only matching sentiment
    - How to verify: Click "Negative" — only red cards appear

R8: Feedback detail view
    - Clicking a card expands to show full details
    - Shows: complete quote, customer name (if available), category tags, internal notes, response status
    - How to verify: Click any card — see expanded information

R9: Mark feedback as addressed
    - Can mark any feedback item as "Addressed" or "Needs Response"
    - Addressed items show a checkmark or visual indicator
    - How to verify: Click "Mark Addressed" on a card — checkmark appears

R10: Persistent storage
    - Addressed status survives page refresh
    - How to verify: Mark items addressed, refresh — status remains

R11: Reset feedback
    - Button to restore original sample feedback
    - How to verify: Mark several addressed, click Reset — all return to original state

R12: Responsive layout
    - Cards reflow on smaller screens (fewer columns)
    - How to verify: Narrow browser window — cards stack in fewer columns`
    },
    taskExamples: {
      tooBig: 'Build the feedback wall',
      rightSize: [
        'Create card grid container with responsive columns',
        'Add 8 feedback cards with customer quotes',
        'Style cards with sentiment-colored borders'
      ]
    },
    demoScriptContext: 'a product manager might say when reviewing customer feedback with the team',
    verificationExamples: [
      'Click "Negative" — only complaint cards appear',
      'Click a card — see full quote and response status',
      'Mark feedback as addressed — checkmark appears on card'
    ]
  },
  {
    id: 'trivia-game',
    name: 'Team Trivia Challenge',
    icon: '🧠',
    industry: 'Training & Team Building',
    audience: 'business',
    status: 'official',
    description: 'A fun quiz game for teams. Use it for onboarding, product training, or just Friday afternoon fun. Tracks scores and shows who\'s the trivia champion!',
    projectName: 'Team Trivia Challenge',
    folderName: 'trivia-challenge',
    whatYouBuild: 'An interactive quiz game with questions, scoring, and a leaderboard',
    sampleDataDescription: 'sample trivia questions with multiple choice answers',
    dataItems: 'questions',
    colorCoding: {
      green: 'correct — great job!',
      yellow: 'current — this question is active',
      red: 'incorrect — wrong answer selected'
    },
    requirements: {
      goal: 'A trivia game where team members can test their knowledge, compete for high scores, and have fun while learning.',
      users: 'Teams doing training, onboarding, or team building activities; managers running engaging meetings',
      whatItShows: [
        'One question at a time with multiple choice answers',
        'Current score and progress through the quiz',
        'Immediate feedback showing if answers are correct (green) or incorrect (red)',
        'Final results screen with score and option to play again'
      ],
      r1Through6: `R1: Welcome screen with game title and "Start Quiz" button
R2: At least 8 trivia questions with 4 answer choices each
R3: Correct answers highlighted green, incorrect red, after selection
R4: Running score displayed during the quiz
R5: Works immediately when opened — no loading required
R6: Fun, engaging appearance suitable for a team activity`,
      r7Through12: `R7: Question navigation
    - Shows current question number and total (e.g., "Question 3 of 8")
    - Progress bar or indicators showing quiz progress
    - How to verify: Answer questions — see progress update

R8: Answer feedback
    - After selecting an answer, show if it's correct or wrong
    - Display the correct answer if user was wrong
    - Brief pause before moving to next question
    - How to verify: Answer incorrectly — see correct answer highlighted

R9: Results screen
    - Shows final score and percentage
    - Lists which questions were correct/incorrect
    - Performance message based on score (green: "Amazing!", yellow: "Good effort!", red: "Keep practicing!")
    - How to verify: Complete quiz — see detailed results

R10: High score tracking
    - Saves best score to browser storage
    - Shows personal best on welcome screen
    - How to verify: Complete quiz, refresh — high score still shown

R11: Play again
    - Button to restart the quiz with shuffled questions
    - How to verify: Click "Play Again" — quiz restarts from question 1

R12: Responsive layout
    - Playable on phone screens with touch-friendly answer buttons
    - How to verify: Narrow browser window — buttons remain easy to tap`
    },
    taskExamples: {
      tooBig: 'Build the complete quiz game',
      rightSize: [
        'Create welcome screen with title and start button',
        'Build question display with 4 answer buttons',
        'Add score counter and progress indicator'
      ]
    },
    demoScriptContext: 'someone might say when introducing this at a team meeting or training session',
    verificationExamples: [
      'Click Start — first question appears',
      'Select wrong answer — correct answer highlights green',
      'Complete quiz — see final score and results breakdown'
    ]
  },
  // ───────────────────────────────────────────────────────────────────────
  // Developer audience
  // ───────────────────────────────────────────────────────────────────────
  {
    id: 'log-analyzer',
    name: 'CLI Log Analyzer',
    icon: '🛠',
    industry: 'Developer Tools',
    audience: 'developer',
    status: 'official',
    description: 'A dashboard for parsing and triaging application logs. See errors, warnings, and traces at a glance — the kind of tool every backend dev wishes they had.',
    projectName: 'CLI Log Analyzer',
    folderName: 'log-analyzer',
    whatYouBuild: 'A log viewer with severity filtering and search',
    sampleDataDescription: 'sample log entries from a backend service',
    dataItems: 'log entries',
    colorCoding: {
      green: 'info — normal operation, healthy traces',
      yellow: 'warning — slow requests, retries, deprecations',
      red: 'error — exceptions, failed requests, crashes'
    },
    requirements: {
      goal: 'A focused log viewer where developers can filter by severity, search messages, and triage issues quickly during incidents.',
      users: 'Backend engineers, SREs, and on-call developers triaging production issues',
      whatItShows: [
        'A scrollable list of log entries newest-first',
        'Each entry shows: timestamp, severity, service, and message',
        'Severity is color-coded: Green (info), Yellow (warning), Red (error)',
        'A summary bar showing counts per severity'
      ],
      r1Through6: `R1: Header with title, summary counts (info/warn/error), and search box
R2: List displaying at least 12 sample log entries with realistic backend data
R3: Severity rendered as colored pill or left-border accent
R4: Timestamps shown in HH:MM:SS format with relative time on hover
R5: Works immediately when opened — no loading or setup required
R6: Monospace font for log messages; appearance suitable for a developer audience`,
      r7Through12: `R7: Severity filter
    - Buttons to filter: All, Info, Warning, Error
    - Active filter visually highlighted; counts update accordingly
    - How to verify: Click "Error" — only red entries appear

R8: Free-text search
    - Search box filters entries by message substring (case-insensitive)
    - Empty search returns all (subject to severity filter)
    - How to verify: Type "timeout" — only matching entries remain

R9: Entry detail panel
    - Clicking a log entry expands to show full payload
    - Shows: full message, stack trace, request id, user id, raw JSON
    - How to verify: Click any error — see expanded stack trace

R10: Mark as triaged
    - Each entry has a "Triaged" toggle
    - Triaged entries dim visually
    - State persists in browser storage
    - How to verify: Triage an error, refresh — it stays dimmed

R11: Reset to defaults
    - Button to clear triaged state and restore the sample log
    - How to verify: Triage several, click Reset — all return to active

R12: Responsive layout
    - Single column on phone; entry detail moves below the list
    - How to verify: Narrow browser window — layout stacks gracefully`
    },
    taskExamples: {
      tooBig: 'Build the entire log analyzer',
      rightSize: [
        'Render a list of log entries with timestamp + message columns',
        'Add 12 sample entries spanning info, warning, and error severities',
        'Style severity as colored pills with monospace message text'
      ]
    },
    demoScriptContext: 'an on-call engineer might say when triaging a production incident',
    verificationExamples: [
      'Click "Error" filter — only red entries remain',
      'Search "timeout" — list narrows to matching messages',
      'Click an error — full stack trace expands below'
    ]
  },
  {
    id: 'pomodoro-tracker',
    name: 'Pomodoro Focus Tracker',
    icon: '🍅',
    industry: 'Developer Productivity',
    audience: 'developer',
    status: 'official',
    description: 'Build the focus timer of your dreams. Track sessions, see your streak, and gamify your deep work — perfect Friday-afternoon hack project.',
    projectName: 'Pomodoro Focus Tracker',
    folderName: 'pomodoro-tracker',
    whatYouBuild: 'A focus timer with session history and streak tracking',
    sampleDataDescription: 'sample focus sessions with durations and tags',
    dataItems: 'sessions',
    colorCoding: {
      green: 'completed — full session finished',
      yellow: 'in progress — session currently running',
      red: 'abandoned — session ended early'
    },
    requirements: {
      goal: 'A focus tracker where you can run pomodoro sessions, log what you worked on, and see your daily streak over time.',
      users: 'Developers, students, and anyone who wants to hack their focus and turn deep work into a game',
      whatItShows: [
        'A large countdown timer with start / pause / reset controls',
        'Today\'s session list with tags and outcomes',
        'A weekly streak indicator and total focus minutes today',
        'Sessions are color-coded: Green (completed), Yellow (running), Red (abandoned)'
      ],
      r1Through6: `R1: Big circular timer display showing minutes:seconds remaining
R2: At least 6 sample completed sessions from the past week
R3: Sessions colored by outcome (green/yellow/red)
R4: Streak indicator showing consecutive days with at least one completed session
R5: Works immediately when opened — no setup required
R6: Playful but focused appearance — feels like a hacker tool, not a corporate app`,
      r7Through12: `R7: Start a new session
    - Tag input + duration selector (15 / 25 / 50 minutes)
    - Clicking Start begins the countdown
    - How to verify: Pick "25 min", tag "deep work", click Start — timer counts down

R8: Pause / resume / abandon
    - Pause button freezes timer; Resume continues
    - Abandon button ends session early and logs it red
    - How to verify: Start a session, click Abandon — entry appears in red

R9: Auto-complete sessions
    - When timer reaches zero, session auto-logs as complete (green)
    - Optional sound / browser notification on completion
    - How to verify: Set duration to 1 min, wait — entry logs as green

R10: Session history persistence
    - All sessions saved to browser storage
    - History survives page refresh
    - How to verify: Complete a session, refresh — it persists in the list

R11: Reset to defaults
    - Button to clear history and restore sample sessions
    - How to verify: Click Reset — history matches initial sample

R12: Keyboard shortcuts
    - Spacebar = start/pause; R = reset; A = abandon
    - How to verify: Press Space — timer toggles between running and paused`
    },
    taskExamples: {
      tooBig: 'Build the entire pomodoro tracker',
      rightSize: [
        'Create the circular countdown display with minutes:seconds',
        'Add 6 sample completed sessions to the history list',
        'Style sessions with outcome colors and tag chips'
      ]
    },
    demoScriptContext: 'someone might say when sharing their focus setup with a friend',
    verificationExamples: [
      'Click Start with "25 min" selected — timer begins counting down',
      'Press Spacebar — timer pauses',
      'Wait for completion — session logs in green and streak ticks up'
    ]
  },
  // ───────────────────────────────────────────────────────────────────────
  // Creative audience
  // ───────────────────────────────────────────────────────────────────────
  {
    id: 'palette-forge',
    name: 'Color Palette Forge',
    icon: '🎨',
    industry: 'Design & Creative',
    audience: 'creative',
    status: 'official',
    description: 'A playful palette generator. Save your favorites, rate combinations, and build a swatch library. Designers, this one\'s for you.',
    projectName: 'Color Palette Forge',
    folderName: 'palette-forge',
    whatYouBuild: 'A palette generator with rated swatches and a saved collection',
    sampleDataDescription: 'sample 5-color palettes with mood tags',
    dataItems: 'palettes',
    colorCoding: {
      green: 'loved — a keeper, saved to favorites',
      yellow: 'maybe — interesting, worth revisiting',
      red: 'rejected — discarded from the library'
    },
    requirements: {
      goal: 'A creative tool where designers can generate, rate, and save color palettes — turning swatch hunting into a delightful game.',
      users: 'Designers, illustrators, and front-end engineers building visual systems',
      whatItShows: [
        'A canvas showing the current 5-color palette with hex values',
        'A library of saved palettes with mood tags',
        'Each palette has a rating: Loved (green), Maybe (yellow), Rejected (red)',
        'A "generate" button that produces a new harmonious palette'
      ],
      r1Through6: `R1: Hero palette display — 5 large color swatches with hex values below each
R2: At least 8 sample palettes pre-loaded in the library with mood tags
R3: Palette rating shown as a colored corner badge
R4: Hex codes are click-to-copy (with a copied confirmation)
R5: Works immediately when opened — no setup required
R6: Beautiful, design-forward appearance — feels like a design tool`,
      r7Through12: `R7: Generate a new palette
    - "Generate" button creates a fresh harmonious 5-color palette
    - Optional mood selector: warm / cool / pastel / vibrant
    - How to verify: Click Generate — hero palette updates with new colors

R8: Save to library
    - Save button adds the current hero palette to the library
    - User can add tags before saving
    - How to verify: Generate, tag "ocean", Save — palette appears in library

R9: Rate a palette
    - Each library palette has Love / Maybe / Reject buttons
    - Rating updates the corner badge color
    - How to verify: Rate a palette "Love" — green badge appears

R10: Library persistence
    - Saved palettes and ratings survive page refresh
    - How to verify: Save a palette, refresh — it remains in the library

R11: Reset library
    - Button to clear saved palettes and restore the original samples
    - How to verify: Save several, click Reset — only originals remain

R12: Responsive layout
    - Hero swatches reflow on phone screens; library becomes a 2-column grid
    - How to verify: Narrow browser — layout adapts gracefully`
    },
    taskExamples: {
      tooBig: 'Build the entire palette forge',
      rightSize: [
        'Build the hero swatch row with 5 colors and hex labels',
        'Add 8 sample palettes to the library grid',
        'Style rating badges in the top-right corner of each library card'
      ]
    },
    demoScriptContext: 'a designer might say when curating a brand palette',
    verificationExamples: [
      'Click Generate — hero palette refreshes with a new harmony',
      'Click a hex code — "Copied!" toast appears',
      'Rate a palette "Love" — green badge appears in the corner'
    ]
  }
]

export const getProjectShapeById = (id: string): ProjectShape => {
  return projectShapes.find(shape => shape.id === id) || projectShapes[0]
}

/** @deprecated Use `projectShapes`. */
export const exampleTracks = projectShapes
/** @deprecated Use `getProjectShapeById`. */
export const getTrackById = getProjectShapeById

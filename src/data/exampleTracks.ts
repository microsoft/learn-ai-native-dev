export interface ExampleTrack {
  id: string
  name: string
  icon: string
  industry: string
  description: string
  projectName: string
  folderName: string
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

export const exampleTracks: ExampleTrack[] = [
  {
    id: 'deal-dashboard',
    name: 'Deal Health Dashboard',
    icon: '💼',
    industry: 'Sales & Business',
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
  }
]

export const getTrackById = (id: string): ExampleTrack => {
  return exampleTracks.find(track => track.id === id) || exampleTracks[0]
}

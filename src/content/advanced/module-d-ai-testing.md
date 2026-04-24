---
id: module-d
number: 4
title: AI-Powered Testing
subtitle: 40 minutes - Generate comprehensive test suites
---

## step: d-prerequisites
### title: Prerequisites

Before starting this module:

- [ ] **Complete Module C** (test-analyzer agent referenced)
- [ ] **Node.js 18+** with npm
- [ ] **DevDash project** from Module A

---

## step: why-ai-testing
### title: Why This Module Matters

In Module C, your test-analyzer agent identified coverage gaps in DevDash. Now let's fill those gaps systematically using AI-powered test generation.

**The human testing problem:**
- We write "happy path" tests first
- We forget edge cases (null, empty, boundary values)
- We miss error handling scenarios
- Writing tests is tedious, so we skip them

**AI testing advantages:**
- Generates dozens of tests in seconds
- Systematically covers edge cases
- Never gets bored or lazy
- Follows consistent patterns

**In this module, you'll:**
• Generate comprehensive test suites using AI
• Discover edge cases humans typically miss
• Create a reusable test generation skill
• Achieve 80%+ test coverage on DevDash

:::diagram ai-testing-flow
:::

---

## step: setup-testing
### title: Step D1: Set Up Testing Infrastructure

Before generating tests, we need a test runner. Let's add Jest to DevDash.

Copy this into GitHub Copilot chat:

:::prompt
number: D1
title: Set up Jest testing
---
Add Jest testing to the DevDash project:

1. Update package.json:
   - Add jest as a devDependency
   - Add test script: "test": "node --experimental-vm-modules node_modules/jest/bin/jest.js"
     (This flag enables ES module support because DevDash uses "type": "module")
   - Add jest config for ES modules:
     ```json
     "jest": {
       "testEnvironment": "node",
       "transform": {}
     }
     ```

2. Create tests/ folder

3. Create tests/greeting.test.js as a simple example:
   - Import the greeting module
   - Test that it returns a string
   - Test that it includes "DevDash"

4. Update AGENTS.md with the test command
:::

Run the tests:

```bash
npm install
npm test
```

You should see your first passing test.

---

## step: generate-tests
### title: Step D2: Generate Your First Test Suite

Now let's have AI generate comprehensive tests for a real module.

Copy this into GitHub Copilot chat:

:::prompt
number: D2
title: Generate weather module tests
---
Generate comprehensive tests for src/modules/weather.js

Create tests/weather.test.js with:

1. Happy path tests:
   - Formats weather correctly with valid data
   - Includes temperature, description, and city

2. Edge case tests:
   - Empty city name
   - Null/undefined parameters
   - Extremely high/low temperatures
   - Very long city names
   - City names with special characters (unicode, emojis)

3. Format validation:
   - Output includes the weather emoji
   - Temperature includes degree symbol
   - City name is included

4. Error handling:
   - Invalid temperature types (string instead of number)
   - Missing required parameters

Include descriptive test names that explain what each test verifies.
:::

Run the new tests:

```bash
npm test
```

Some tests might fail — that's good! It means the AI found bugs or missing edge case handling.

---

## step: fix-failures
### title: Step D3: Fix Failing Tests (or the Code!)

When tests fail, you have two options:
1. **Fix the test** if it has unrealistic expectations
2. **Fix the code** if it genuinely doesn't handle the case

Let's have AI help analyze and fix:

:::prompt
number: D3
title: Analyze and fix test failures
---
Run the tests and analyze any failures.

For each failing test:
1. Determine if the test expectation is reasonable
2. If yes → fix the code to handle the case
3. If no → adjust the test to be realistic

After fixing, ensure all tests pass.

Also add proper error handling to the weather module if it's missing.
:::

Run tests again:

```bash
npm test
```

All tests should now pass.

### ✅ Checkpoint

- [ ] Jest configured and running
- [ ] Weather module tests generated
- [ ] Edge cases identified and handled
- [ ] All tests passing

---

## step: edge-case-discovery
### title: Step D4: Systematic Edge Case Discovery

AI excels at finding edge cases you'd never think of. Let's systematically discover them.

Copy this into GitHub Copilot chat:

:::prompt
number: D4
title: Discover edge cases
---
Analyze the entire DevDash codebase and identify edge cases we're NOT testing.

For each module in src/modules/, check for:
- Null/undefined inputs
- Empty strings
- Type mismatches (string where number expected)
- Boundary values (very large, very small, zero)
- Special characters and unicode
- Async behavior (if applicable)
- Error conditions

Create a report listing:
1. Module name
2. Edge case not covered
3. Why it matters
4. Suggested test

Save to docs/EDGE-CASES.md
:::

Review the edge case report and notice patterns you missed.

---

## step: generate-full-suite
### title: Step D5: Generate Tests for All Modules

Let's generate comprehensive tests for every module in DevDash.

Copy this into GitHub Copilot chat:

:::prompt
number: D5
title: Generate full test suite
---
Generate comprehensive tests for all modules in DevDash:

1. tests/quote.test.js for src/modules/quote.js
   - Happy path: valid quote and author
   - Edge cases: empty quote, empty author, missing author
   - Format: includes quote marks, em dash, author

2. tests/dashboard.test.js for src/dashboard.js
   - Happy path: renders complete dashboard
   - Edge cases: missing weather data, missing quote data
   - Format: includes borders, proper alignment

3. tests/index.test.js for src/index.js (integration)
   - Command line argument handling
   - --version flag
   - --help flag (if implemented)
   - Default behavior

For each test file:
- Group tests with describe blocks
- Use clear, descriptive test names
- Include both positive and negative test cases
- Mock any external dependencies
:::

Run the full test suite:

```bash
npm test
```

---

## step: check-coverage
### title: Step D6: Check Test Coverage

Let's see how much of the code our tests actually cover.

Copy this into GitHub Copilot chat:

:::prompt
number: D6
title: Add coverage reporting
---
Update the DevDash project to include test coverage reporting:

1. Update package.json:
   - Add "test:coverage" script: "node --experimental-vm-modules node_modules/jest/bin/jest.js --coverage"
   - Add jest coverage config to include src/ folder

2. Add .gitignore entries for coverage folder

3. Update AGENTS.md with the coverage command
:::

Run coverage:

```bash
npm run test:coverage
```

You'll see a coverage report showing:
- Statement coverage
- Branch coverage  
- Function coverage
- Line coverage

**Target: 80%+ coverage** across all categories.

---

## step: fill-coverage-gaps
### title: Step D7: Fill Coverage Gaps

If coverage is below 80%, let's fill the gaps:

:::prompt
number: D7
title: Fill coverage gaps
---
Analyze the coverage report and identify uncovered code.

For each uncovered section:
1. Understand what the code does
2. Generate tests that exercise it
3. Add tests to appropriate test file

Focus on:
- Uncovered branches (if/else paths)
- Uncovered functions
- Error handling paths

After adding tests, run coverage again and report the improvement.
:::

Repeat until you reach 80%+ coverage:

```bash
npm run test:coverage
```

---

## step: create-test-skill
### title: Step D8: Create a Test Generation Skill

Let's encode this workflow as a reusable skill so any future code gets the same treatment.

Copy this into GitHub Copilot chat:

:::prompt
number: D8
title: Create test generation skill
---
Create a skill at .github/skills/generate-tests/SKILL.md

The skill should:
- Trigger when user asks to "write tests", "add tests", "test coverage", or "generate tests"
- Accept a file path or module name as context
- Follow a structured test generation workflow

Skill workflow:
1. Analyze the target code (function signatures, logic branches, error conditions)
2. Generate happy path tests
3. Generate edge case tests (null, empty, boundary, type errors)
4. Generate error handling tests
5. Run tests and check for failures
6. Report coverage for the module

Include:
- name: generate-tests
- description with activation keywords
- Test file naming convention (X.test.js in tests/ folder)
- describe/it structure template
- Edge case categories checklist
:::

Test the skill:

:::prompt
number: D9
title: Test the generate-tests skill
---
Generate tests for any new module I add to DevDash.

Create src/modules/stats.js that exports a function formatStats(repos, stars) returning a formatted string like "📊 GitHub: 42 repos, 1,337 stars"

Then use the generate-tests skill to create comprehensive tests for it.
:::

### ✅ Module Complete

- [ ] Jest testing infrastructure set up
- [ ] Tests generated for all modules
- [ ] Edge cases discovered and handled
- [ ] 80%+ test coverage achieved
- [ ] Test generation skill created for future use

---

## step: whats-next-testing
### title: What's Next

You now have comprehensive test coverage and a repeatable skill for testing new code. In Module E, you'll bring everything together in a **capstone project** — adding a major feature to DevDash using MCP, the coding agent, multi-agent review, and your new testing skills.

💡 **The quality loop:** Write code → Generate tests → Run coverage → Fill gaps → Review with orchestrator → Ship with confidence.

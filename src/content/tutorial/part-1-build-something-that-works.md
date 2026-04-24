---
id: part-1
number: 1
title: Build Something That Works
subtitle: 15 minutes - Create your first working prototype
---

## step: create-folder
### title: Step 1: Create a New Project Folder

1. Open **VS Code**
2. Go to **File → Open Folder...**
3. Create a new folder called `{{folderName}}`
4. Open it

You should see the empty folder in the left sidebar. That's your blank canvas — now let's have AI build everything inside it.

## step: open-copilot
### title: Step 2: Open GitHub Copilot Chat

Before we can give AI instructions, we need to open the chat panel and switch to the right mode. Agent mode is special — it lets GitHub Copilot actually create and edit files in your project, not just suggest code.

1. Click the **chat icon** in the left sidebar (or press `Ctrl+Shift+I`)
2. Look at the mode selector at the bottom of the chat input — click the dropdown and select **"Agent"**

You should see "Agent" displayed in the mode selector. The chat panel is now ready to receive your first prompt.

💡 **Iteration is normal:** If AI suggests something you don't want, just tell it "no" or "try again without X." You're directing the AI, not accepting everything it offers.

## step: create-structure
### title: Step 3: Let AI Create Your Project Files

Before building anything, we need a basic project structure — folders to organize your files and placeholder documents for specifications. Instead of creating these manually, let's have AI do it.

After this prompt, you'll have a `specs/` folder for documentation and an `app/` folder for your web page.

Copy this into GitHub Copilot chat:

:::prompt
number: 1
title: Create project structure
---
Create this folder and file structure in my project. Make all the files empty for now:

specs/PRD.md
specs/Tasks.md
app/index.html
README.md

If any folders don't exist, create them. Don't ask me questions—just create everything.
:::

You should see GitHub Copilot create each file and folder. Check the sidebar — you'll see `specs/` and `app/` folders appear with the empty files inside.

💡 **Your first prompt!** This is how every AI interaction works: you describe what you want, AI makes it happen. Simple as that.

## step: write-requirements
### title: Step 4: Tell AI What You Want to Build

You're building a **{{projectName}}**: {{whatYouBuild}}

Let AI write a proper project description for you. Copy this prompt into GitHub Copilot chat:

:::prompt
number: 2
title: Describe your project
---
Write a simple project description in specs/PRD.md for a "{{projectName}}" prototype.

It should include:
- What the project is (2-3 sentences)
- 5-6 specific features it needs
- What sample data to use

Key details:
{{requirements.goal}}
Use {{sampleDataDescription}} hardcoded in the page.
Make status obvious with colors: green = {{colorCoding.greenCap}}, yellow = {{colorCoding.yellow}}, red = {{colorCoding.red}}.

Keep it under half a page. Simple language.
:::

Open `specs/PRD.md` to see what AI wrote. It should describe your project with clear requirements numbered R1, R2, etc.

💡 **AI fills in the details**: You give the idea, AI adds structure. If it writes something you don't like, just say "make the features simpler" or "remove the section about X."

## step: create-tasks
### title: Step 5: Let AI Create a Task List

A good project needs a plan. Instead of figuring out all the steps yourself, let AI read your project description and break it into small, actionable tasks. This becomes your checklist for building.

After this prompt, you'll have a task list in `specs/Tasks.md` with checkboxes AI will mark off as it completes work.

Copy this into GitHub Copilot chat:

:::prompt
number: 3
title: Create the task list
---
Read specs/PRD.md and create a task checklist in specs/Tasks.md.

Rules for the tasks:
- Each task should be small (something that can be done in one step)
- Each task should say which requirement(s) it helps complete (like "Satisfies: R1, R2")
- Each task should have a "Done when:" line that explains how to verify it's complete
- Use checkbox format: [ ] Task description
- Keep the total number of tasks under 7

Example format:
[ ] Task 1: Create basic page structure
    Satisfies: R1
    Done when: Opening index.html in browser shows a page with a title
:::

Open `specs/Tasks.md` to see your task list. Each task should have a checkbox, a clear description, and verification criteria.

💡 **Tasks guide AI's work**: In the next step, AI will read this list and complete tasks one by one. This structured approach produces better results than asking AI to "build everything at once."

## step: build-first-version
### title: Step 6: Watch AI Build Your App

This is the magic moment — AI will read your task list, write all the code, and create a working web page. You don't need to understand the code; AI handles everything.

**Where does the data come from?** AI will generate realistic {{sampleDataDescription}} for you. This data is embedded directly in the code — no database, no server, no external files. It's perfect for prototyping and demos.

After this prompt, you'll have a complete, styled web page in `app/index.html` with sample data and color-coded status indicators.

Copy this into GitHub Copilot chat:

:::prompt
number: 4
title: Build the web page
---
Read specs/Tasks.md and implement the first 3 tasks by editing app/index.html.

I don't know how to write code, so you need to generate everything for me.

The result should be a professional-looking web page that shows:
- A clear title at the top
- A short description of what the {{projectNameLower}} shows
{{list:requirements.whatItShows}}
- Status should be visually obvious (use colored dots, badges, or background colors)
- {{colorCoding.greenCap}} = Green, {{colorCoding.yellow}} = Yellow, {{colorCoding.red}} = Red
- Use {{sampleDataDescription}} directly in the HTML/JS (no external data)

Make it look clean and professional. Use modern styling.

After you create the file, mark those tasks as complete in specs/Tasks.md by changing [ ] to [x].
:::

Watch GitHub Copilot generate the code. Before clicking Accept, do a quick check:

✓ Does the code mention {{sampleDataDescription}}?
✓ Do you see Green, Yellow, and Red colors referenced?

If something looks off, click **Discard** and try the prompt again. It's easy to regenerate.

💡 **AI isn't perfect**: Sometimes you need 2-3 attempts to get good results. If this prompt doesn't produce a working page, try: "Create a basic HTML page with a title and sample data. Keep the styling simple."

## step: see-creation
### title: Step 7: See What You Built

Time to see your creation! Open the web page in a browser to view your working prototype.

1. Find `app/index.html` in the left sidebar
2. Right-click → **Reveal in File Explorer** (or Finder on Mac)
3. Double-click the file to open it in your browser

You should see a professional-looking {{projectNameLower}} with sample data, status indicators, and clean styling — all created by AI from your simple descriptions.

🎉 **You just built a working {{projectNameLower}} without writing any code!**

💡 **What you learned**: You described what you wanted in plain English, AI created the structure, wrote the specs, and built the code. This is AI-native development — directing AI to do the technical work while you focus on what you want to create.

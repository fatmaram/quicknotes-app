# QuickNotes

QuickNotes is a note-taking web app built with HTML, CSS and JavaScript. You type a note and pick a category then save it. The app stores your notes in the browser so they stay after a refresh.

## Features

- Add notes with a Personal, Work or Study category
- Delete a single note or clear all notes after a confirmation
- Search notes as you type
- Validation for empty notes and notes over 200 characters
- Live note count for zero, one and many notes
- Notes saved in localStorage
- Responsive layout for phones

## How to run the project locally

1. Clone the repository with `git clone https://github.com/fatmaram/quicknotes-app.git`
2. Open the quicknotes-app folder in VS Code
3. Right-click index.html and choose Open with Live Server
4. Open index.html directly in a browser if you have no Live Server

## What I learned

- Building the page from the array with createElement and textContent keeps user text safe
- JSON.stringify and JSON.parse let me save and load notes with localStorage
- Flexbox and a media query make one form work on both desktop and phone screens
- Small commits after each task make the project history easy to follow
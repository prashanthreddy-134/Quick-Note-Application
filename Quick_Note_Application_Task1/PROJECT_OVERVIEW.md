# Task 1 — Project Overview

## Objective
Build a single-page application where users can write and save notes. Notes are sent to a Python backend, stored in a database and displayed on the same page.

## Functional requirements
- Users can create notes with a title and content.
- The backend validates and stores notes in SQLite.
- Saved notes appear on the same page without reloading it.
- Users can edit, delete and search notes.

## Learning outcomes
- Understand browser-to-server request/response communication.
- Build JSON API endpoints using Flask.
- Perform database create, read, update and delete operations.
- Connect frontend JavaScript to a Python backend using Fetch API.

## Testing checklist
- [ ] Application starts without errors.
- [ ] Empty title/content is rejected.
- [ ] A valid note is saved and displayed.
- [ ] Notes remain after restarting the server.
- [ ] Search filters notes.
- [ ] Edit updates an existing note.
- [ ] Delete removes a note.

# Quick Note Application — Task 1

A single-page full-stack note-taking application built with HTML, CSS, JavaScript, Python Flask and SQLite.

## Features
- Create and persist notes in SQLite
- View notes on the same page without a full page reload
- Edit and delete existing notes
- Search note titles and content
- Responsive layout for desktop and mobile
- Server-side validation and clear API error responses

## Technology stack
- Frontend: HTML5, CSS3, Vanilla JavaScript
- Backend: Python 3.10+ and Flask
- Database: SQLite with Flask-SQLAlchemy
- Communication: JSON over HTTP (REST-style API)

## Project structure
```text
Quick_Note_Application_Task1/
├── app.py
├── requirements.txt
├── README.md
├── .gitignore
├── templates/
│   └── index.html
└── static/
    ├── app.js
    └── style.css
```

## Run locally (Windows PowerShell)
1. Install Python 3.10 or newer.
2. Open PowerShell in this project folder.
3. Create and activate a virtual environment:
   ```powershell
   py -m venv .venv
   .\.venv\Scripts\Activate.ps1
   ```
4. Install dependencies:
   ```powershell
   python -m pip install -r requirements.txt
   ```
5. Start the application:
   ```powershell
   python app.py
   ```
6. Open http://127.0.0.1:5000 in your browser.

The SQLite database is created automatically on first run. Notes remain available after restarting the application because they are stored in `instance/notes.db`.

## API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/notes` | List all notes |
| GET | `/api/notes?q=term` | Search notes |
| POST | `/api/notes` | Create a note |
| PUT | `/api/notes/<id>` | Update a note |
| DELETE | `/api/notes/<id>` | Delete a note |

### Example request body
```json
{
  "title": "Internship task",
  "content": "Build and test my first full-stack application."
}
```

## Request-response flow
1. The user enters a title and note in the browser.
2. JavaScript sends a JSON POST request to `/api/notes`.
3. Flask validates the input and creates a database record.
4. SQLite stores the note and Flask returns the saved note as JSON.
5. JavaScript requests the latest notes and updates the page dynamically.

## Notes for submission
- Run the application locally and test create, edit, search and delete.
- Include screenshots of the running application and terminal in your internship report.
- Do not upload your local SQLite database or virtual environment to GitHub.

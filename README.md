📝 Quick Note Application

Virtual World Internship – Full Stack Development | Task 1

A responsive, full-stack note-taking application that allows users to create, view, edit, delete, and search notes. Notes are sent to a Python Flask backend, stored in an SQLite database, and displayed dynamically on the same page without refreshing the browser.

🚀 Features

Create and save notes with a title and content.

View all saved notes.

Edit existing notes.

Delete unwanted notes.

Search notes by title or content.

Persistent storage using SQLite.

Dynamic frontend updates without page reload.

Responsive user interface for desktop and mobile.

Backend input validation and error handling.

🛠️ Technologies Used

Technology

Purpose

Python

Backend programming

Flask

Backend framework and REST API

JavaScript

Frontend interactions and API requests

HTML5

Webpage structure

CSS3

Styling and responsive design

SQLite

Database storage

SQLAlchemy

Database management

📂 Project Structure

Quick-Note-Application/
│
├── app.py
├── requirements.txt
├── README.md
├── PROJECT_OVERVIEW.md
├── .gitignore
│
├── templates/
│   └── index.html
│
└── static/
    ├── app.js
    └── style.css

⚙️ Installation and Setup

1. Clone the repository

git clone https://github.com/prashanthreddy-134/Quick-Note-Application.git

2. Navigate to the project directory

cd Quick-Note-Application

3. Create a virtual environment

python -m venv .venv

4. Activate the virtual environment (Windows)

.\.venv\Scripts\Activate.ps1

5. Install dependencies

python -m pip install -r requirements.txt

6. Run the application

python app.py

7. Open in your browser

http://127.0.0.1:5000

🔗 API Endpoints

HTTP Method

Endpoint

Description

GET

/api/notes

Retrieve all notes

GET

/api/notes?q=keyword

Search notes

POST

/api/notes

Create a new note

PUT

/api/notes/<id>

Update an existing note

DELETE

/api/notes/<id>

Delete a note

🔄 Application Workflow

User enters a note title and content.

JavaScript sends the information to the Flask backend using the Fetch API.

Flask validates the received data.

SQLAlchemy stores the note in the SQLite database.

The backend returns a JSON response.

JavaScript updates the notes section dynamically.

🎯 Learning Outcomes

Understanding frontend and backend integration.

Working with Python Flask applications.

Implementing HTTP methods and API endpoints.

Understanding JSON request and response handling.

Performing database CRUD operations.

Connecting JavaScript with a Python backend.

Understanding persistent data storage.

👨‍💻 Internship Information

Internship: Virtual World – Full Stack Development

Project: Quick Note Application

Task ID: TASK1

Developer: Prashanth Reddy S

📌 Future Improvements

User authentication and personal note management.

Note categories and tagging.

Cloud database integration.

Deployment to a cloud hosting platform.

⭐ Developed as part of the Virtual World Full Stack Development Internship.

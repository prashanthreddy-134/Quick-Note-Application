from flask import Flask, jsonify, request, render_template
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timezone

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///notes.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc),
                           onupdate=lambda: datetime.now(timezone.utc))

    def to_dict(self):
        return {
            "id": self.id, "title": self.title, "content": self.content,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat()
        }

@app.get("/")
def home():
    return render_template("index.html")

@app.get("/api/notes")
def get_notes():
    query = request.args.get("q", "").strip()
    notes = Note.query
    if query:
        notes = notes.filter(db.or_(Note.title.ilike(f"%{query}%"),
                                    Note.content.ilike(f"%{query}%")))
    return jsonify([note.to_dict() for note in notes.order_by(Note.updated_at.desc()).all()])

@app.post("/api/notes")
def create_note():
    data = request.get_json(silent=True) or {}
    title = str(data.get("title", "")).strip()
    content = str(data.get("content", "")).strip()
    if not title or not content:
        return jsonify({"error": "Both title and content are required."}), 400
    if len(title) > 120:
        return jsonify({"error": "Title must be 120 characters or fewer."}), 400
    note = Note(title=title, content=content)
    db.session.add(note)
    db.session.commit()
    return jsonify(note.to_dict()), 201

@app.put("/api/notes/<int:note_id>")
def update_note(note_id):
    note = db.session.get(Note, note_id)
    if note is None:
        return jsonify({"error": "Note not found."}), 404
    data = request.get_json(silent=True) or {}
    title = str(data.get("title", "")).strip()
    content = str(data.get("content", "")).strip()
    if not title or not content:
        return jsonify({"error": "Both title and content are required."}), 400
    if len(title) > 120:
        return jsonify({"error": "Title must be 120 characters or fewer."}), 400
    note.title, note.content = title, content
    db.session.commit()
    return jsonify(note.to_dict())

@app.delete("/api/notes/<int:note_id>")
def delete_note(note_id):
    note = db.session.get(Note, note_id)
    if note is None:
        return jsonify({"error": "Note not found."}), 404
    db.session.delete(note)
    db.session.commit()
    return jsonify({"message": "Note deleted successfully."})

@app.errorhandler(404)
def not_found(_):
    return jsonify({"error": "Resource not found."}), 404

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)

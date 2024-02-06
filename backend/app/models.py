from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class ToDoList(db.Model):
    __tablename__ = 'todolist'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(120), nullable=False)
    status = db.Column(db.String(10), nullable=False)

    def json(self):
        return {'id': self.id,'title': self.title, 'description': self.description, 'status': self.status}

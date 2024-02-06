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

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)

    def json(self):
        return {'id': self.id,'username': self.username, 'password': self.password}
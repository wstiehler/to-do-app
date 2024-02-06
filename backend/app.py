from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from os import environ

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('DB_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True  # or True, depending on your needs
db = SQLAlchemy(app)

class ToDoList(db.Model):
    __tablename__ = 'todolist'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(120), nullable=False)
    status = db.Column(db.String(10), nullable=False)

    def json(self):
        return {'id': self.id,'title': self.title, 'description': self.description, 'status': self.status}

db.create_all()

@app.route('/health', methods=['GET'])
def test():
  return make_response(jsonify({'message': 'health'}), 200)


@app.route('/todolist', methods=['POST'])
def create_todolist():
  try:
    data = request.get_json()
    new_todolist = ToDoList(title=data['title'], description=data['description'], status=data['status'])
    db.session.add(new_todolist)
    db.session.commit()
    return make_response(jsonify({'message': 'todolist created'}), 201)
  except:
    return make_response(jsonify({'message': 'error creating todolist'}), 500)
  
@app.route('/todolists', methods=['GET'])
def get_todolists():
  try:
    todolists = ToDoList.query.all()
    return make_response(jsonify([todolist.json() for todolist in todolists]), 200)
  except:
    return make_response(jsonify({'message': 'error getting todolist'}), 500)
  
@app.route('/todolist/<int:id>', methods=['GET'])
def get_todolist(id):
  try:
    todolist = ToDoList.query.filter_by(id=id).first()
    if todolist:
      return make_response(jsonify({'todolist': todolist.json()}), 200)
    return make_response(jsonify({'message': 'todolist not found'}), 404)
  except:
    return make_response(jsonify({'message': 'error getting todolist'}), 500)
  
@app.route('/todolist/<int:id>', methods=['PUT'])
def update_todolist(id):
  try:
    todolist = ToDoList.query.filter_by(id=id).first()
    if todolist:
      data = request.get_json()
      todolist.title = data['title']
      todolist.description = data['description']
      todolist.status = data['status']
      db.session.commit()
      return make_response(jsonify({'message': 'todolist updated'}), 200)
    return make_response(jsonify({'message': 'todolist not found'}), 404)
  except:
    return make_response(jsonify({'message': 'error updating todolist'}), 500)
  
@app.route('/todolist/<int:id>', methods=['DELETE'])
def delete_user(id):
  try:
    todolist = ToDoList.query.filter_by(id=id).first()
    if todolist:
      db.session.delete(todolist)
      db.session.commit()
      return make_response(jsonify({'message': 'todolist deleted'}), 200)
    return make_response(jsonify({'message': 'todolist not found'}), 404)
  except:
    return make_response(jsonify({'message': 'error deleting todolist'}), 500)
from app.models import db, ToDoList
from flask import jsonify, request, make_response

def create_todolist():
    try:
        data = request.get_json()
        new_todolist = ToDoList(title=data['title'], description=data['description'], status=data['status'])
        db.session.add(new_todolist)
        db.session.commit()
        return make_response(jsonify({'message': 'todolist created'}), 201)
    except:
        return make_response(jsonify({'message': 'error creating todolist'}), 500)

def get_todolists():
    try:
        todolists = ToDoList.query.all()
        return make_response(jsonify([todolist.json() for todolist in todolists]), 200)
    except:
        return make_response(jsonify({'message': 'error getting todolist'}), 500)

def get_todolist(id):
    try:
        todolist = ToDoList.query.filter_by(id=id).first()
        if todolist:
            return make_response(jsonify({'todolist': todolist.json()}), 200)
        return make_response(jsonify({'message': 'todolist not found'}), 404)
    except:
        return make_response(jsonify({'message': 'error getting todolist'}), 500)
    
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
    
def health():
    return make_response(jsonify({'message': 'health'}), 200)
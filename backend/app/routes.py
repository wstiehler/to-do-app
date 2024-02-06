from flask import Blueprint
from app.controllers.todolist_controller import health, create_todolist, get_todolists, get_todolist, update_todolist, delete_user


routes_blueprint = Blueprint('routes', __name__)

routes_blueprint.route('/health', methods=['GET'](health))
routes_blueprint.route('/todolist', methods=['POST'])(create_todolist)
routes_blueprint.route('/todolists', methods=['GET'])(get_todolists)
routes_blueprint.route('/todolist/<int:id>', methods=['GET'](get_todolist))
routes_blueprint.route('/todolist/<int:id>', methods=['PUT'](update_todolist))
routes_blueprint.route('/todolist/<int:id>', methods=['DELETE'](delete_user))


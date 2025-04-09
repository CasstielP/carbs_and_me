from flask import request, jsonify
from app.routes import api
from app.models import db, User

@api.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([u.to_dict() for u in users])

@api.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    name = data.get("name")
    if not name:
        return jsonify({"error": "Name required"}), 400

    user = User(name=name)
    db.session.add(user)
    db.session.commit()
    return jsonify(user.to_dict()), 201

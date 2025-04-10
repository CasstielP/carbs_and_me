from flask import request, jsonify
from app.routes import api
from app.models import db, User
from flask_jwt_extended import (create_access_token, 
jwt_required, get_jwt_identity, create_refresh_token, set_access_cookies, 
set_refresh_cookies, unset_jwt_cookies, get_csrf_token)


@api.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([u.to_dict() for u in users])

@api.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")
    if not username or not email or not password:
        return jsonify({"error": "Username, email, and password are required"}), 400
    
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already exists"}), 409
    if User.query.filter_by(username=username).first():
        return jsonify({"error": "Username already exists"}), 409


    user = User(username=username, email=email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    return jsonify(user.to_dict()), 201



#login route
@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "username and password are required"}), 400
    
    user = User.query.filter_by(username=username).first()
    if not user or not user.check_password(password):
        return jsonify({"error": "Invalid credentials"}), 401
    
    access_token = create_access_token(identity=str(user.id))
    refresh_token = create_refresh_token(identity=str(user.id))

    
    response = jsonify({"message": "Login successful",
                    "access_token": access_token,
                    "csrf_access_token": get_csrf_token(access_token),
                    "csrf_refresh_token": get_csrf_token(refresh_token),
                    "user": user.to_dict()
                    })
    set_access_cookies(response, access_token)
    set_refresh_cookies(response, refresh_token)

    return response
    


@api.route('/me', methods=['GET'])
@jwt_required()
def get_my_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    return jsonify(user.to_dict()), 200


@api.route('/refresh', methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    user_id = get_jwt_identity()
    new_access_token = create_access_token(identity=user_id)

    response = jsonify({
        "access_token": new_access_token
    })

    return response



#logout
@api.route('/logout', methods=["POST"])
def logout():
    response = jsonify({"message": "You have logged out"})
    unset_jwt_cookies(response)
    return response
from flask import Blueprint, jsonify, request
from backend.models import User_Profile, db

profile_bp = Blueprint('profile', __name__)


@profile_bp.route('/profile', methods=['GET'])
def get_profile():
    user = User_Profile.query.first()  # Assuming you want the first user for demonstration purposes
    if user:
        return jsonify(user.serialize()), 200
    else:
        return jsonify({"message": "User not found"}), 404
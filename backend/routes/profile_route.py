from flask import Blueprint, jsonify, request, send_from_directory
from backend.models import User_Profile, db
import os 

profile_bp = Blueprint('profile', __name__)


@profile_bp.route('/profile', methods=['GET'])
def get_profile():
    user = User_Profile.query.first()  # Assuming you want the first user for demonstration purposes
    if user:
        return jsonify(user.serialize()), 200
    else:
        return jsonify({"message": "User not found"}), 404

@profile_bp.route('/files/<path:filename>', methods=['GET'])
def serve_resume(filename):
    directory = os.path.join(os.path.dirname(__file__), '..', 'files')
    return send_from_directory(directory, filename)

from flask import Flask
from flask_cors import CORS
from config import Config
from models import db 
from routes.profile_route import profile_bp


app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

db.init_app(app)

app.register_blueprint(profile_bp)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create database tables if they don't exist
    app.run(debug=True)
# This code initializes a Flask application, sets up CORS, configures the database, and registers a blueprint for handling profile-related routes. It also creates the database tables if they don't exist when the application starts.
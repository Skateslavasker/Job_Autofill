from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User_Profile(db.Model):
    __tablename__ = 'user_profile'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    email = db.Column(db.String(100), unique=True)
    address_line1 = db.Column(db.String(100))
    city = db.Column(db.String(50))
    state = db.Column(db.String(50))
    country = db.Column(db.String(50))
    postal_code = db.Column(db.String(20))
    phone_device_type = db.Column(db.String(50))
    country_phone_code = db.Column(db.String(100))
    phone_number = db.Column(db.String(20))

    how_heard = db.Column(db.String(50))
    previously_worked = db.Column(db.Boolean, default=False)
    resume = db.Column(db.String(100))


    def serialize(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "address_line1": self.address_line1,
            "city": self.city,
            "state": self.state,
            "country": self.country,
            "postal_code": self.postal_code,
            "phone_device_type": self.phone_device_type,
            "country_phone_code": self.country_phone_code,
            "phone_number": self.phone_number,
            "how_heard": self.how_heard,
            "previously_worked": self.previously_worked,
            "resume": self.resume
        }

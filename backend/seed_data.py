from app import db, app
from models import User_Profile


with app.app_context():
    user = User_Profile(
        first_name="Revanth",
        last_name="Mudavath",
        email="revanthmudavath2001@gmail.com",
        address_line1="1343 SW E Ave #Apt 201",
        city="Corvallis",
        state="Oregon",
        postal_code="97333",
        country="United States of America",
        phone_device_type="Mobile",
        country_phone_code="+1",
        phone_number="(458) 272-8380",
        how_heard="LinkedIn",
        previously_worked=False,
        resume="/files/JOB_REVNATH_SE.pdf"
    )

    db.session.add(user)
    db.session.commit()
    print("Seed data added successfully.")
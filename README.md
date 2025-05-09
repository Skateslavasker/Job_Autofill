

# 💼 Job Application Autofill Extension

A Chrome extension that **automatically fills out Workday job application forms** using stored profile data from a PostgreSQL database, a Flask backend, and a TypeScript-powered content script.

---

## 🔧 Tech Stack

| Layer        | Technology                        |
|--------------|------------------------------------|
| 🧠 Backend   | Python + Flask + SQLAlchemy         |
| 💾 Database | PostgreSQL                          |
| ⚙️ Frontend | HTML + TypeScript + Chrome Extension |
| 🧪 Automation | JavaScript DOM simulation & Selenium-like interaction |

---

## 🚀 Features

- ✅ Autofills personal info: name, address, phone, email
- ✅ Dropdown handling for Yes/No questions, gender, ethnicity, veteran status
- ✅ Resume file upload via Flask-hosted endpoint
- ✅ Uses **TypeScript** for safe, scalable extension logic
- ✅ Uses **PostgreSQL** to store and serve profile data
- ✅ Works with **Workday application portals** (dynamic & non-standard DOM)


## 🧠 How It Works

1. **Backend (Flask + PostgreSQL)**  
   - `/profile` returns profile data from the DB
   - `/files/<filename>` serves the resume PDF for upload

2. **Extension (TypeScript)**  
   - Injects DOM-manipulating code into job application forms
   - Matches fields based on labels, placeholders, or ARIA attributes
   - Fills inputs, selects dropdowns, uploads resume
   - Uses `fetch()` to get user profile data

---


## 🧪 Setup Instructions

### 1. Backend

```bash
cd backend
pip install -r ../requirements.txt
python seed_data.py  # seeds the user info
python app.py        # runs the Flask server

```

### 2. Extension

```bash
cd extensions
npm install
npm run build    # compiles TypeScript to JS
```


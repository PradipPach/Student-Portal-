# 🎓 Student Portal

A simple app to manage student records.

## ✨ Features

- 🔐 Login and protected dashboard
- ➕ Add students
- ✏️ Edit student details
- 🗑️ Delete students
- 💾 Save records in browser storage

## 🛠️ Run the project

You need [Node.js](https://nodejs.org/) installed.

```bash
npm install
npm run dev
```

Open the local link shown in the terminal.

## 🔑 Demo login

- **Username:** `admin`
- **Password:** `admin123`

> This is a demo app. Login details are built into the frontend, so do not use it for real or sensitive data.

## 📂 Project structure

```text
📁 src
 ┣ 📁 components
 ┃ ┗ 📄 ProtectedRoute.jsx  → Protects the dashboard
 ┣ 📁 pages
 ┃ ┣ 📄 DashboardPage.jsx   → Manage student records
 ┃ ┗ 📄 LoginPage.jsx       → Login screen
 ┣ 📁 services
 ┃ ┗ 📄 studentDataService.js → Login and student data
 ┣ 📄 PortalApp.jsx         → App routes
 ┣ 📄 main.jsx              → App entry point
 ┗ 📄 portalStyles.css      → App styles
```

## 👤 Author

**Pradip Pachapol** · [GitHub](https://github.com/PradipPach)

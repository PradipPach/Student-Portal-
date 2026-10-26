# Student Portal

React student portal with login, JWT token storage, protected dashboard and student records (add, update, delete).

## How to run
```
npm install
npm run dev
```

Login: username `admin`, password `admin123`

## Files
- `src/services/studentDataService.js` : login and student add, read, update, delete (saved in browser storage)
- `src/components/ProtectedRoute.jsx` : blocks the dashboard when the user is not logged in
- `src/pages/LoginPage.jsx` : login page
- `src/pages/DashboardPage.jsx` : add, update, delete students and logout

# 🍴 RecipeYab

## A recipe finder web application that allows users to discover recipes by cuisine and category, view detailed recipes, and save their favourite meals.

---

## 🌐 Live Demo 👉 [https://recipe-yab.vercel.app/](https://recipe-yab.vercel.app/)
---

## 📌 Features

- User registration and login
- Browse recipes by cuisine
- Explore recipes by category
- View detailed recipe information
- View ingredients and cooking instructions
- Choose and update a favourite category
- Save and remove favourite recipes
- Maximum of 3 saved recipes per user
- User profile with account information
- Responsive design for desktop and mobile
- Loading and empty states
- Persistent user data using Local Storage

---

## 🧠 Project Plan

This project was developed as a recipe finder application using Next.js, React, TypeScript, and TheMealDB API.

The application follows a component-based architecture with global user state managed through React Context.

---

## 🛠 Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- React Context API
- React Icons
- Local Storage
- TheMealDB API

---

## 🧩 Project Structure

- Next.js App Router
- Dynamic routes for categories, cuisines, and recipes
- Component-based architecture
- Global user state using React Context
- Data flow from API → pages → components
- Reusable recipe and category cards
- User data and saved recipes managed with Local Storage

---

## ⚙️ Challenges & Solutions

### API Rate Limits

TheMealDB API has limitations when multiple requests are made in a short period of time.

- Solution: reduced unnecessary API requests and handled empty API responses gracefully.

### User Data Persistence

The project does not use a backend database.

- Solution: user accounts, favourite categories, and saved recipes are stored using Local Storage.

### Dynamic Recipe Data

Recipe details contain multiple ingredients and measurements stored in separate API fields.

- Solution: dynamically combine ingredient and measurement fields into a readable ingredient list.

### Saved Recipes Limit

Users can save a maximum of three recipes.

- Solution: the application checks the number of saved recipes before allowing another recipe to be saved.

### Missing Cuisine Data

Some cuisines may not have available recipes from the API.

- Solution: display a friendly message instead of leaving the section empty.

---

## 📱 User Experience Improvements

- Warm and food-focused visual design
- Clear navigation between recipes and categories
- Favourite category indicator
- Save/remove recipe functionality using heart icons
- Responsive recipe grids
- Clear empty states
- User-friendly loading messages
- Separate login and registration pages
- Profile page for managing favourite category and saved recipes

---

## 🚀 Future Improvements

- Backend database for user accounts
- Secure authentication
- Search functionality
- More advanced recipe filtering
- Recipe sharing
- User-created recipes
- More personalised recipe recommendations

---

## 👨‍💻 Author

## Arash Safari Frontend Developer (React, TypeScript, JavaScript)

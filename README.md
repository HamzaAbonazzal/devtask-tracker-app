# DevTask Tracker & CLI 🚀

> A modern, multilingual Full-Stack Task Management application built with **React**, **Sass (SCSS)**, **Node.js**, **Express.js**, and **MongoDB**, featuring a seamless **CLI tool** for managing tasks directly from the terminal.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=nodedotjs)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb)
![Sass](https://img.shields.io/badge/Sass-SCSS-CC6699?logo=sass)

---

## 🌟 Key Features

- **🌐 Full Multilingual Support (i18n):** Real-time language switching between **Arabic (RTL)** and **English (LTR)**.
- **🌙 Dark / Light Mode:** Built-in theme switcher powered by SCSS custom properties for optimal UX.
- **🖥️ Integrated CLI Tool:** Full terminal integration allowing developers to add, list, and complete tasks via direct command line (`devtask`).
- **📱 Fully Responsive Design:** Clean and adaptive UI tailored for mobile, tablet, and desktop screens.
- **⚡ RESTful API Architecture:** Robust backend endpoints providing clean CRUD operations with data validation.

---

## 🏗️ Tech Stack

### **Frontend**

- **Framework:** React.js (Vite)
- **Styling:** Sass / SCSS (Variables, Mixins, Theme Switching)
- **Icons:** Lucide React
- **HTTP Client:** Axios

### **Backend**

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose ODM)
- **CLI Engine:** Node.js Shebang CLI Scripting

---

## 📁 Project Architecture

```text
devtask-tracker/
├── backend/
│   ├── config/          # Database configuration (Mongoose connection)
│   ├── controllers/     # Business logic for API endpoints
│   ├── models/          # MongoDB Schemas (Task model with multilingual fields)
│   ├── routes/          # Express API routes
│   ├── cli/             # CLI script for Terminal operations
│   ├── server.js        # Express application entry point
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/  # Reusable UI components (Header, TaskForm, TaskCard)
    │   ├── context/     # React Context for Theme & Language management
    │   ├── services/    # Axios API configuration
    │   ├── styles/      # SCSS modular stylesheets (_theme, _variables, main)
    │   ├── App.jsx      # Main application logic
    │   └── main.jsx
    └── package.json

## 🚀 Getting Started Locally
Prerequisites

Make sure you have the following installed on your machine:

    Node.js (v16.x or higher)

    MongoDB (Local instance or MongoDB Atlas Connection URI)

1. Backend & CLI Setup

    Clone the repository:
    git clone [https://github.com/your-username/devtask-tracker.git](https://github.com/your-username/devtask-tracker.git)
cd devtask-tracker/backend

2. Install dependencies:
npm install

3. Create a .env file in the backend root directory:
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/devtask_db

4. Start the backend development server:
npm run dev

5. (Optional) Link the CLI tool globally to use devtask in your terminal:
npm link

2. Frontend Setup

1. Navigate to the frontend directory:
cd ../frontend

2. Install dependencies:
npm install

3. Start the Vite development server:
npm run dev

4. Open your browser and visit: http://localhost:5173

💻 CLI Commands Usage

Once the CLI is linked globally using npm link, you can run commands from any terminal window:

# Display help and available commands
devtask

# List all tasks
devtask list

# Add a new task (English Title & Arabic Title)
devtask add "Build Frontend" "بناء الواجهة الأمامية"

# Delete a task by ID
devtask delete <TASK_ID>

📡 API Endpoints Summary

Method	Endpoint	Description
GET	/api/tasks	Retrieve all tasks sorted by creation date
POST	/api/tasks	Create a new task (requires English & Arabic titles)
PATCH	/api/tasks/:id	Update task status or details
DELETE	/api/tasks/:id	Delete a task by ID

📄 License

This project is open-source and available under the MIT License.
```

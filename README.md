🚀 MERN Stack Task Manager Application

A modern, responsive, and full-stack Task Management CRUD application built with the MERN Stack (MongoDB, Express, React, Node.js). Features a sleek two-page view flow, complete RESTful API integration, and modular MVC architecture.

🌟 Key Features

📝 Create Task Form: Add tasks with name, task title, date, description, and submit date.

📊 Dynamic Dashboard: Real-time data visualization in a clean, modern data table.

🔄 Seamless Navigation: Smooth view switching between the Form view and Dashboard without page reloads.

✏️ Full CRUD Operations: Create, Read, Update, and Delete task records easily.

🎨 Modern UI/UX: Stylish gradients, clean card layouts, smooth transitions, and fully responsive design.

🛡️ MVC Architecture: Scalable and maintainable backend folder structure.

🏗️ Architecture & Workflow

graph TD
    A[Client UI / React Frontend] -->|HTTP POST / GET / PUT / DELETE| B[Express Router / routes]
    B --> C[Task Controller / controllers]
    C -->|Mongoose Schema| D[(MongoDB Database)]
    D -->|JSON Data| C
    C -->|JSON Response| A


🛠️ Tech Stack

Frontend

React.js (Vite)

Axios (API Requests)

CSS3 (Custom Modern Styling & Gradients)

Backend

Node.js & Express.js

MongoDB & Mongoose ORM

dotenv (Environment Configuration)

CORS (Cross-Origin Resource Sharing)

📁 Folder Structure

task-manager-mern/
├── backend/
│   ├── config/
│   │   └── db.js            # MongoDB Connection Setup
│   ├── controllers/
│   │   └── taskController.js # CRUD Logic
│   ├── models/
│   │   └── Task.js          # Mongoose Schema
│   ├── routes/
│   │   └── taskRoutes.js    # API Endpoints
│   ├── .env                 # Environment Variables
│   └── server.js            # Express Entry Point
│
└── frontend/
    ├── src/
    │   ├── services/
    │   │   └── api.js       # Axios API Calls
    │   ├── App.jsx          # Main App Component
    │   ├── index.css        # Custom Stylesheet
    │   └── main.jsx         # React Entry Point
    └── package.json


⚡ Quick Start & Installation

1. Prerequisites

Ensure you have Node.js and MongoDB installed on your system.

2. Backend Setup

# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create a .env file and add your configuration
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskmanager

# Run the server
npm run dev


3. Frontend Setup

# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the Vite React development server
npm run dev


The app should now be running locally at http://localhost:5173!

🔌 API Endpoints

Method

Endpoint

Description

GET

/api/tasks

Fetch all tasks

POST

/api/tasks

Create a new task

PUT

/api/tasks/:id

Update an existing task

DELETE

/api/tasks/:id

Delete a task

🤝 Contributing & Feedback

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

⭐ If you like this project, give it a star on GitHub!
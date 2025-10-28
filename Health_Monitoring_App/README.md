HealthPulse - Health Monitoring App

This is a responsive health monitoring dashboard built with React, Vite, and Tailwind CSS. It allows users to track key health metrics like steps, calories, and sleep, and log new activities.

This project is currently a demo application. All data is stored locally in the browser's localStorage and no backend is required.

Key Features

Metric Dashboard: Clean, responsive cards display the latest data for steps, calories, and sleep.

Activity Log: A table displays a history of all logged health data.

Add Data Form: Users can manually add new entries for their daily metrics.

Persistent Data (Demo): All health data is saved to localStorage, so it persists between browser refreshes.

Component-Based: Built with a clean folder structure, separating pages, components (layout, dashboard), and context.

Tech Stack

React: For building the user interface.

Vite: As the frontend build tool for a fast development experience.

Tailwind CSS: For all styling and layout.

Lucide React: For clean and modern icons.

How to Run This Project

Clone the repository (or download the files).

Install dependencies:

npm install


Run the development server:

npm run dev


Open your browser and navigate to http://localhost:5173 (or the address shown in your terminal).

Future Development (Next Steps)

The next major step for this project would be to transition it from a demo app to a full-stack application by:

Adding a Backend: Building a Node.js (Express) server.

Integrating a Database: Using MongoDB to store user accounts and health data.

Implementing Real Authentication: Adding "Sign in with Google" and email/password login.

Connecting to Live APIs: Integrating with services like Google Fit and Fitbit to sync data automatically.
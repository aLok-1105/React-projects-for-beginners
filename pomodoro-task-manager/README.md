# 🍅 Pomodoro Task Manager

A productivity application built using **React** and **CSS3**.  
This project combines the Pomodoro Technique with task management, featuring a customizable timer, task tracking, and statistics dashboard to help users stay focused and organized.

## 🛠️ Tech Stack

- React (Hooks: useState, useEffect, useRef)
- CSS3 (Grid, Flexbox, Animations)
- Lucide React (Icons)
- LocalStorage API
- Web Audio API

## ✨ Features

- **Pomodoro Timer**: 25-minute focus sessions with 5-minute and 15-minute breaks
- **Task Management**: Add, complete, and delete tasks with estimated pomodoros
- **Progress Tracking**: Monitor completed pomodoros and total focus time
- **Statistics Dashboard**: View completion rates and productivity metrics
- **Data Persistence**: Tasks and statistics saved in localStorage
- **Audio Notifications**: Sound alert when timer completes
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🚀 How to Run

1. Clone the repository.

2. Navigate to the project folder:

   ```bash
   cd pomodoro-task-manager
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 How to Use

1. **Add Tasks**: Enter task name and estimated pomodoros
2. **Start Timer**: Click Start to begin a 25-minute focus session
3. **Stay Focused**: Work on your task until the timer rings
4. **Take Breaks**: Timer automatically switches to break mode
5. **Track Progress**: View your statistics and completed pomodoros

## 📂 Project Structure

```
pomodoro-task-manager/
├── src/
│   ├── components/
│   │   ├── Timer.js          # Pomodoro timer with modes
│   │   ├── TaskList.js       # Display and manage tasks
│   │   ├── TaskForm.js       # Add new tasks
│   │   └── Statistics.js     # Stats dashboard
│   ├── App.js                # Main application
│   ├── App.css               # Styles
│   └── index.js              # Entry point
└── package.json
```

## 🎓 Learning Concepts

- React Hooks (useState, useEffect, useRef)
- Component composition and props
- State management and lifting state
- Side effects and cleanup
- LocalStorage integration
- Web Audio API for notifications
- Interval management with refs
- Responsive CSS with Grid and Flexbox

## 📄 License

This project is part of the [React Projects for Beginners](https://github.com/ianshulx/React-projects-for-beginners) repository for learning and open-source contribution.

## 👨‍💻 Author

## Namokar05

**Built with ❤️ for Hacktoberfest 2025**

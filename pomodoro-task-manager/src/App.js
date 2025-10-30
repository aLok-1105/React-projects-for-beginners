import React, { useState, useEffect } from 'react';
import './App.css';
import Timer from './components/Timer';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Statistics from './components/Statistics';

function App() {
    const [tasks, setTasks] = useState([]);
    const [completedPomodoros, setCompletedPomodoros] = useState(0);
    const [totalFocusTime, setTotalFocusTime] = useState(0);

    // Load tasks from localStorage on mount
    useEffect(() => {
        const savedTasks = localStorage.getItem('pomodoroTasks');
        const savedPomodoros = localStorage.getItem('completedPomodoros');
        const savedFocusTime = localStorage.getItem('totalFocusTime');

        if (savedTasks) setTasks(JSON.parse(savedTasks));
        if (savedPomodoros) setCompletedPomodoros(parseInt(savedPomodoros));
        if (savedFocusTime) setTotalFocusTime(parseInt(savedFocusTime));
    }, []);

    // Save tasks to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('pomodoroTasks', JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        localStorage.setItem('completedPomodoros', completedPomodoros.toString());
    }, [completedPomodoros]);

    useEffect(() => {
        localStorage.setItem('totalFocusTime', totalFocusTime.toString());
    }, [totalFocusTime]);

    const addTask = (taskName, estimatedPomodoros) => {
        const newTask = {
            id: Date.now(),
            name: taskName,
            estimatedPomodoros: parseInt(estimatedPomodoros),
            completedPomodoros: 0,
            completed: false,
            createdAt: new Date().toISOString()
        };
        setTasks([...tasks, newTask]);
    };

    const toggleTaskComplete = (taskId) => {
        setTasks(tasks.map(task =>
            task.id === taskId
                ? { ...task, completed: !task.completed }
                : task
        ));
    };

    const deleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const handlePomodoroComplete = () => {
        setCompletedPomodoros(prev => prev + 1);
        setTotalFocusTime(prev => prev + 25); // 25 minutes per pomodoro

        // Add pomodoro to the first incomplete task
        const firstIncompleteTask = tasks.find(task => !task.completed);
        if (firstIncompleteTask) {
            setTasks(tasks.map(task =>
                task.id === firstIncompleteTask.id
                    ? { ...task, completedPomodoros: task.completedPomodoros + 1 }
                    : task
            ));
        }
    };

    return (
        <div className="app">
            <div className="container">
                <header className="header">
                    <h1>🍅 Pomodoro Task Manager</h1>
                    <p>Stay focused and get things done!</p>
                </header>

                <div className="main-content">
                    <div className="card">
                        <Timer onPomodoroComplete={handlePomodoroComplete} />
                    </div>

                    <div className="card">
                        <h2 style={{ marginBottom: '20px', color: '#1f2937' }}>Task List</h2>
                        <TaskForm onAddTask={addTask} />
                        <TaskList
                            tasks={tasks}
                            onToggleComplete={toggleTaskComplete}
                            onDeleteTask={deleteTask}
                        />
                    </div>
                </div>

                <div className="stats-section">
                    <Statistics
                        completedPomodoros={completedPomodoros}
                        totalFocusTime={totalFocusTime}
                        tasks={tasks}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
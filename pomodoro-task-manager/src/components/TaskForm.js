import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

const TaskForm = ({ onAddTask }) => {
    const [taskName, setTaskName] = useState('');
    const [estimatedPomodoros, setEstimatedPomodoros] = useState('1');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (taskName.trim()) {
            onAddTask(taskName, estimatedPomodoros);
            setTaskName('');
            setEstimatedPomodoros('1');
        }
    };

    return (
        <div className="task-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="What are you working on?"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                required
            />
            <input
                type="number"
                min="1"
                max="20"
                placeholder="Estimated Pomodoros"
                value={estimatedPomodoros}
                onChange={(e) => setEstimatedPomodoros(e.target.value)}
                required
            />
            <button
                type="button"
                className="btn-add-task"
                onClick={handleSubmit}
            >
                <PlusCircle size={20} />
                Add Task
            </button>
        </div>
    );
};

export default TaskForm;
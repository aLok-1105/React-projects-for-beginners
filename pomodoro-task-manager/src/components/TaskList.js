import React from 'react';
import { Trash2, Clock } from 'lucide-react';

const TaskList = ({ tasks, onToggleComplete, onDeleteTask }) => {
    if (tasks.length === 0) {
        return (
            <div className="empty-state">
                <Clock size={48} />
                <p style={{ marginTop: '15px' }}>No tasks yet. Add your first task above!</p>
            </div>
        );
    }

    return (
        <div className="task-list">
            {tasks.map(task => (
                <div
                    key={task.id}
                    className={`task-item ${task.completed ? 'completed' : ''}`}
                >
                    <div className="task-left">
                        <input
                            type="checkbox"
                            className="checkbox"
                            checked={task.completed}
                            onChange={() => onToggleComplete(task.id)}
                        />
                        <div className={`task-details ${task.completed ? 'completed' : ''}`}>
                            <h4>{task.name}</h4>
                            <div className="task-meta">
                                <span className="pomodoros-badge">
                                    🍅 {task.completedPomodoros}/{task.estimatedPomodoros}
                                </span>
                                <span style={{ color: '#9ca3af' }}>
                                    {new Date(task.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>
                    <button
                        className="btn-delete"
                        onClick={() => onDeleteTask(task.id)}
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default TaskList;
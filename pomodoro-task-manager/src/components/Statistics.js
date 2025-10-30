import React from 'react';

const Statistics = ({ completedPomodoros, totalFocusTime, tasks }) => {
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const completionRate = totalTasks > 0
        ? Math.round((completedTasks / totalTasks) * 100)
        : 0;

    const formatTime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        if (hours > 0) {
            return `${hours}h ${mins}m`;
        }
        return `${mins}m`;
    };

    return (
        <div className="card">
            <h2 style={{ marginBottom: '20px', color: '#1f2937' }}>📊 Statistics</h2>

            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Pomodoros</h3>
                    <p>{completedPomodoros}</p>
                </div>
                <div className="stat-card">
                    <h3>Focus Time</h3>
                    <p>{formatTime(totalFocusTime)}</p>
                </div>
                <div className="stat-card">
                    <h3>Tasks Done</h3>
                    <p>{completedTasks}/{totalTasks}</p>
                </div>
            </div>

            {totalTasks > 0 && (
                <div className="progress-info">
                    <p>
                        🎯 You've completed {completionRate}% of your tasks. Keep going!
                    </p>
                </div>
            )}
        </div>
    );
};

export default Statistics;
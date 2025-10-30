import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

const Timer = ({ onPomodoroComplete }) => {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState('pomodoro');
    const intervalRef = useRef(null);

    const MODES = {
        pomodoro: 25,
        shortBreak: 5,
        longBreak: 15
    };

    useEffect(() => {
        if (isActive && (minutes > 0 || seconds > 0)) {
            intervalRef.current = setInterval(() => {
                if (seconds === 0) {
                    if (minutes === 0) {
                        // Timer complete
                        clearInterval(intervalRef.current);
                        setIsActive(false);

                        if (mode === 'pomodoro') {
                            onPomodoroComplete();
                            playSound();
                        }

                        // Auto switch to break or pomodoro
                        if (mode === 'pomodoro') {
                            setMode('shortBreak');
                            setMinutes(MODES.shortBreak);
                        } else {
                            setMode('pomodoro');
                            setMinutes(MODES.pomodoro);
                        }
                        setSeconds(0);
                    } else {
                        setMinutes(prev => prev - 1);
                        setSeconds(59);
                    }
                } else {
                    setSeconds(prev => prev - 1);
                }
            }, 1000);
        } else {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    }, [isActive, minutes, seconds, mode, onPomodoroComplete, MODES.pomodoro, MODES.shortBreak]);

    const playSound = () => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 800;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    };

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        setMinutes(MODES[mode]);
        setSeconds(0);
    };

    const changeMode = (newMode) => {
        setMode(newMode);
        setMinutes(MODES[newMode]);
        setSeconds(0);
        setIsActive(false);
    };

    const formatTime = (time) => {
        return time.toString().padStart(2, '0');
    };

    return (
        <div className="timer-container">
            <div className="mode-selector">
                <button
                    className={`mode-btn ${mode === 'pomodoro' ? 'active' : ''}`}
                    onClick={() => changeMode('pomodoro')}
                >
                    Pomodoro
                </button>
                <button
                    className={`mode-btn ${mode === 'shortBreak' ? 'active' : ''}`}
                    onClick={() => changeMode('shortBreak')}
                >
                    Short Break
                </button>
                <button
                    className={`mode-btn ${mode === 'longBreak' ? 'active' : ''}`}
                    onClick={() => changeMode('longBreak')}
                >
                    Long Break
                </button>
            </div>

            <div className="timer-display">
                {formatTime(minutes)}:{formatTime(seconds)}
            </div>

            <div className="timer-controls">
                <button
                    className={isActive ? 'btn-pause' : 'btn-start'}
                    onClick={toggleTimer}
                >
                    {isActive ? (
                        <>
                            <Pause size={20} />
                            Pause
                        </>
                    ) : (
                        <>
                            <Play size={20} />
                            Start
                        </>
                    )}
                </button>
                <button className="btn-reset" onClick={resetTimer}>
                    <RotateCcw size={20} />
                    Reset
                </button>
            </div>

            <div style={{
                marginTop: '20px',
                padding: '15px',
                background: '#f3f4f6',
                borderRadius: '10px',
                textAlign: 'left'
            }}>
                <h4 style={{ marginBottom: '10px', color: '#374151' }}>💡 Pomodoro Technique:</h4>
                <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    color: '#6b7280',
                    fontSize: '0.9rem',
                    lineHeight: '1.8'
                }}>
                    <li>✓ Work for 25 minutes</li>
                    <li>✓ Take a 5-minute break</li>
                    <li>✓ Repeat 4 times</li>
                    <li>✓ Take a longer 15-minute break</li>
                </ul>
            </div>
        </div>
    );
};

export default Timer;

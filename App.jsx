import React, { useState, useEffect } from 'react';

const PomodoroTracker = () => {
  const [sessionLength, setSessionLength] = useState(25); // Default 25 minutes
  const [timeRemaining, setTimeRemaining] = useState(sessionLength * 60); // Convert to seconds
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Format time to display as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Effect to handle the timer countdown
  useEffect(() => {
    let interval = null;

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTimeRemaining(timeRemaining => {
          if (timeRemaining <= 1) {
            clearInterval(interval);
            setIsActive(false);
            return 0;
          }
          return timeRemaining - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, isPaused]);

  // Start the timer
  const startTimer = () => {
    if (!isActive) {
      setIsActive(true);
      setIsPaused(false);
    } else if (isPaused) {
      setIsPaused(false);
    }
  };

  // Pause the timer
  const pauseTimer = () => {
    setIsPaused(true);
  };

  // Reset the timer
  const resetTimer = () => {
    setIsActive(false);
    setIsPaused(false);
    setTimeRemaining(sessionLength * 60);
  };

  // Handle session length change
  const handleSessionChange = (e) => {
    const newLength = parseInt(e.target.value, 10);
    setSessionLength(newLength);
    setTimeRemaining(newLength * 60);
    // If timer is running, reset it
    if (isActive) {
      setIsActive(false);
      setIsPaused(false);
    }
  };

  // Calculate progress percentage for the progress bar
  const progressPercentage = ((sessionLength * 60 - timeRemaining) / (sessionLength * 60)) * 100;

  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-lg bg-gray-100 max-w-md mx-auto shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Pomodoro Timer</h1>

      {/* Timer Display */}
      <div className="w-full mb-6">
        <div className="relative pt-1">
          <div className="overflow-hidden h-8 mb-4 text-xs flex rounded bg-gray-200">
            <div
              style={{ width: `${progressPercentage}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500 transition-all duration-300"
            ></div>
          </div>
          <div className="text-center text-5xl font-mono font-bold text-gray-800">
            {formatTime(timeRemaining)}
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex space-x-4 mb-6">
        {!isActive || isPaused ? (
          <button
            onClick={startTimer}
            className="px-6 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition-colors"
          >
            {isPaused ? 'Resume' : 'Start'}
          </button>
        ) : (
          <button
            onClick={pauseTimer}
            className="px-6 py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition-colors"
          >
            Pause
          </button>
        )}
        <button
          onClick={resetTimer}
          className="px-6 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Custom Session Duration */}
      <div className="w-full max-w-xs">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Session Duration (minutes):
        </label>
        <div className="flex items-center">
          <input
            type="range"
            min="1"
            max="60"
            value={sessionLength}
            onChange={handleSessionChange}
            className="mr-4 w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-gray-800 font-semibold w-8 text-center">{sessionLength}</span>
        </div>
      </div>

      {/* Session Status */}
      <div className="mt-6 text-sm text-gray-600">
        {isActive && !isPaused && 'Focus time! Stay on task.'}
        {isPaused && 'Timer paused. Resume when ready.'}
        {!isActive && timeRemaining === 0 && 'Session complete! Take a break.'}
        {!isActive && timeRemaining !== 0 && timeRemaining !== sessionLength * 60 && 'Timer reset. Ready to start?'}
        {!isActive && timeRemaining === sessionLength * 60 && 'Ready to focus?'}
      </div>
    </div>
  );
};

export default PomodoroTracker;



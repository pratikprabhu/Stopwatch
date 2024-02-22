// components/Stopwatch.js
"use client"
import { useState, useRef } from 'react';

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef(null);

  const startStop = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
    } else {
      const startTime = Date.now() - elapsedTime;
      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 10);
    }
    setIsRunning(!isRunning);
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setElapsedTime(0);
  };

  const formatTime = (time) => {
    const padTime = (time) => {
      return time.toString().padStart(2, '0');
    };
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${padTime(minutes)}:${padTime(seconds)}.${padTime(milliseconds)}`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="text-6xl font-bold text-white mb-8">{formatTime(elapsedTime)}</div>
      <div className="space-x-4">
        <button
          className={`px-6 py-3 rounded-full ${
            isRunning ? 'bg-red-600 hover:bg-red-700' : 'bg-green-500 hover:bg-green-600'
          } text-white font-bold`}
          onClick={startStop}
        >
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <button
          className="px-6 py-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-bold"
          onClick={reset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;

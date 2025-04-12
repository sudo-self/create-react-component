```typescript
import React, { useState, useEffect } from 'react';

interface TimerState {
  timers: { id: number; name: string; time: number; isRunning: boolean }[];
}

const defaultTimers: TimerState['timers'] = [
  { id: 1, name: 'Timer 1', time: 0, isRunning: false },
  { id: 2, name: 'Timer 2', time: 0, isRunning: false },
  { id: 3, name: 'Timer 3', time: 0, isRunning: false },
];

export default function MultiTimer(): JSX.Element {
  const [timers, setTimers] = useState<TimerState['timers']>(defaultTimers);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (timers.some((timer) => timer.isRunning)) {
      intervalId = setInterval(() => {
        setTimers((prevTimers) =>
          prevTimers.map((timer) => {
            if (timer.isRunning) {
              return { ...timer, time: timer.time + 1 };
            }
            return timer;
          })
        );
      }, 1000);
    } else {
      if (intervalId) {
        clearInterval(intervalId);
      }
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [timers]);


  const handleStart = (id: number) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) =>
        timer.id === id ? { ...timer, isRunning: true } : timer
      )
    );
  };

  const handlePause = (id: number) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) =>
        timer.id === id ? { ...timer, isRunning: false } : timer
      )
    );
  };


  const handleReset = (id: number) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) =>
        timer.id === id ? { ...timer, time: 0, isRunning: false } : timer
      )
    );
  };

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };


  return (
    <div className="p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {timers.map((timer) => (
          <div
            key={timer.id}
            className="border border-gray-300 rounded-lg p-4 shadow-md bg-white"
          >
            <h2 className="text-xl font-semibold mb-2">{timer.name}</h2>
            <div className="text-3xl font-mono mb-4">{formatTime(timer.time)}</div>
            <div className="flex space-x-2">
              {!timer.isRunning ? (
                <button
                  onClick={() => handleStart(timer.id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Start
                </button>
              ) : (
                <button
                  onClick={() => handlePause(timer.id)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                >
                  Pause
                </button>
              )}
              <button
                onClick={() => handleReset(timer.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Reset
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```
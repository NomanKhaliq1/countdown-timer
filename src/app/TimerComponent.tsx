import { useState, useEffect } from "react";

export default function TimerComponent() {
  const [hoursInput, setHoursInput] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [IsRunning, setIsRunning] = useState<boolean>(false);

  const days = Math.floor(timeLeft / (24 * 60 * 60));
  const years = Math.floor(days / 365);
  const months = Math.floor(days / 30);
  const displayDays = days % 30;
  const hours = Math.floor((timeLeft % (24 * 60 * 60)) / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = Math.floor(timeLeft % 60);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (IsRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => Math.max(prevTime - 1, 0));
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }

    return () => clearInterval(timer);
  }, [IsRunning, timeLeft]);

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(0);
  };

  const setTimer = () => {
    const totalSeconds = hoursInput * 3600;
    setTimeLeft(totalSeconds);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 bg-gray-800 flex items-center flex-col justify-center h-auto rounded-lg p-6 shadow-lg">
        <h1 className="text-xl md:text-2xl font-bold mb-6 text-white text-center">Countdown Timer App 🙌</h1>

        <div className="flex flex-col md:flex-row items-center gap-2 mb-4 w-full timer-input">
          <input
            type="text"
            min="0"
            value={hoursInput}
            onChange={(e) => setHoursInput(Number(e.target.value))}
            className="p-2 border bg-gray-700 text-white text-center rounded-lg md:rounded-l-lg md:rounded-r-none w-full md:w-auto flex-grow placeholder-gray-400 outline-none"
            placeholder="Hours"
          />
          <button onClick={setTimer} className="px-4 py-2 bg-blue-600 text-white rounded-lg md:rounded-r-lg md:rounded-l-none hover:bg-blue-700 w-full md:w-auto">
            Set Time
          </button>
        </div>

        <div className="text-center mb-4 w-full text-gray-300 gap-2 counter-style roboto-mono-body-500 text-lg">
          {years > 0 && <span>{years} Y </span>}
          {months > 0 && <span>{months} M </span>}
          {displayDays > 0 && <span>{displayDays} Days </span>}
          <span>{hours.toString().padStart(2, "0")}:</span>
          <span>{minutes.toString().padStart(2, "0")}:</span>
          <span>{seconds.toString().padStart(2, "0")}</span>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4 w-full btncontrols-area">
          <button onClick={startTimer} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 w-full sm:w-auto">Start</button>
          <button onClick={pauseTimer} className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 w-full sm:w-auto">Pause</button>
          <button onClick={resetTimer} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 w-full sm:w-auto">Reset</button>
        </div>
      </div>
    </div>
  );
}

"use client";
import { act, FormEvent, useEffect, useRef, useState } from "react";

export default function CountdownTimer() {
  const [timerDetails, setTimerDetails] = useState({
    hours: 10,
    minutes: 0,
    seconds: 12,
  });

  const [timerStarted, setTimerStarted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const interval = useRef<number>(null);
  useEffect(() => {
    if (
      timerDetails.seconds === 0 &&
      timerDetails.minutes === 0 &&
      timerDetails.hours === 0
    ) {
      clearInterval(interval.current);
    }

    if (timerDetails.seconds === 0) {
      if (timerDetails.minutes > 0) {
        setTimerDetails({
          ...timerDetails,
          minutes: timerDetails.minutes - 1,
          seconds: 59,
        });
      } else if (timerDetails.hours > 0) {
        setTimerDetails({
          ...timerDetails,
          hours: timerDetails.hours - 1,
          minutes: 59,
          seconds: 59,
        });
      }
    }
  }, [timerDetails]);

  useEffect(() => {}, []);

  const timer = () => {
    interval.current = setInterval(() => {
      setTimerDetails((prev) => ({
        ...prev,
        seconds: prev.seconds - 1,
      }));
    }, 1000);
  };

  const toggleTimer = (action) => {
    setIsEditing(false);
    if (action == "start") {
      if (validateTimerDetails()) {
        console.log("Started");
        setTimerStarted(true);
        timer();
      }
    } else if (action == "stop") {
      setTimerStarted(false);
      clearInterval(interval.current);
    }
  };

  const validateTimerDetails = () => {
    const { hours, minutes, seconds } = timerDetails;

    if (hours == 0 && minutes == 0 && seconds == 0) {
      alert("invalid Time");
      return false;
    }
    if (hours < 0 || hours > 12 || isNaN(hours)) {
      alert("Hours should be between 0 and 12");
      return false;
    }
    if (minutes < 0 || minutes > 59 || isNaN(minutes)) {
      alert("Minutes should be between 0 and 59");
      return false;
    }
    if (seconds < 0 || seconds > 59 || isNaN(seconds)) {
      alert("Seconds should be between 0 and 59");
      return false;
    }
    return true;
  };

  const onChangeHandler = (e) => {
    if (timerStarted) return;
    const { id, value } = e.target;
    setTimerDetails({ ...timerDetails, [id]: value });
  };

  const reset = () => {
    setTimerStarted(false);
    clearInterval(interval.current);
    setTimerDetails({
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="timer text-center">
        <h1 className="text-2xl">Countdown Timer</h1>
        <div className="flex gap-10 text-4xl my-6">
          <div className="">
            <h3>Hours</h3>
            <input
              className="w-16 border-none bg-transparent outline-none appearance-none"
              onChange={onChangeHandler}
              disabled={timerStarted}
              id="hours"
              type="number"
              value={timerDetails.hours}
            />
          </div>
          <span className="relative top-9">:</span>
          <div>
            <h3>Minutes</h3>
            <input
              id="minutes"
              disabled={timerStarted}
              onChange={onChangeHandler}
              className="w-16 border-none bg-transparent outline-none"
              type="text"
              value={timerDetails.minutes}
            />
          </div>
          <span className="relative top-9">:</span>
          <div>
            <h3>Seconds</h3>
            <input
              id="seconds"
              disabled={timerStarted}
              onChange={onChangeHandler}
              className="w-16 border-none bg-transparent outline-none"
              type="text"
              value={timerDetails.seconds}
            />
          </div>
        </div>
        <div className="flex">
          {!timerStarted ? (
            <button
              type="button"
              onClick={() => toggleTimer("start")}
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 w-full"
            >
              Start
            </button>
          ) : (
            <button
              type="button"
              onClick={() => toggleTimer("stop")}
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 w-full"
            >
              Stop
            </button>
          )}
          <button
            type="button"
            onClick={() => reset()}
            className="focus:outline-none text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800 w-full"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

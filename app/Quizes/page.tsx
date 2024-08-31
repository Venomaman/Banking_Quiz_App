"use client";

import { useEffect, useState } from "react";
import { generateQuestions, Question } from "@/utils/generateQuestions";
import Footer from "@/components/Footer";

const Quiz: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentSet, setCurrentSet] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number | null>(null); // Track quiz start time
  const [elapsedTime, setElapsedTime] = useState<number>(0); // Track elapsed time
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(
    null
  ); // Timer interval reference
  const [isPaused, setIsPaused] = useState<boolean>(false); // Timer pause state

  // Initialize questions and userAnswers on client-side
  useEffect(() => {
    const initialQuestions = generateQuestions(20);
    setQuestions(initialQuestions);
    setUserAnswers(Array(initialQuestions.length).fill(""));
  }, []);

  // Start or resume the timer
  useEffect(() => {
    if (questions.length > 0) {
      if (!isPaused && startTime !== null) {
        const interval = setInterval(() => {
          setElapsedTime(Math.floor((Date.now() - startTime) / 1000)); // Update elapsed time in seconds
        }, 1000); // Update every second

        setTimerInterval(interval);

        return () => clearInterval(interval); // Cleanup interval on unmount
      } else if (isPaused && timerInterval) {
        clearInterval(timerInterval); // Clear the interval when paused
      }
    }
  }, [questions, startTime, isPaused]);

  const handleInputChange = (index: number, value: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentSet * 5 + index] = value;
    setUserAnswers(newAnswers);
  };

  const handleStartQuiz = () => {
    setStartTime(Date.now()); // Set start time when the quiz starts
    setIsPaused(false); // Ensure the timer is running
  };

  const handleNextSet = () => {
    if (currentSet < questions.length / 5 - 1) {
      setCurrentSet(currentSet + 1);
    } else {
      setShowResults(true);
      setIsPaused(true); // Pause the timer when submitting
    }
  };

  const handlePreviousSet = () => {
    if (currentSet > 0) {
      setCurrentSet(currentSet - 1);
    }
  };

  const handlePauseTimer = () => {
    setIsPaused(true); // Pause the timer
  };

  const handleResumeTimer = () => {
    setStartTime(Date.now() - elapsedTime * 1000); // Adjust start time to account for paused time
    setIsPaused(false); // Resume the timer
  };

  const calculateScore = (): number => {
    let score = 0;
    questions.forEach((q, i) => {
      if (parseFloat(userAnswers[i]) === q.answer) {
        score++;
      }
    });
    return score;
  };

  if (showResults) {
    const score = calculateScore();
    const totalTime =
      Math.floor(elapsedTime / 60) +
      ":" +
      (elapsedTime % 60).toString().padStart(2, "0");
    return (
      <div className="flex flex-col min-h-screen pt-8 sm:pt-5 pl-3 sm:pl-32 pr-3 sm:pr-32">
        <main className="flex-grow bg-zinc-900 text-white p-4 md:p-10 flex flex-col justify-center items-center text-xl md:text-4xl gap-3 rounded-3xl shadow-xl shadow-slate-500">
          <h2 className="text-lg md:text-2xl">
            Your Score: {score}/{questions.length}
          </h2>
          <h3 className="text-md md:text-xl">Total Time Taken: {totalTime}</h3>
          <button
            className="border-2 border-white p-2 md:p-3 text-sm md:text-base rounded-xl hover:opacity-40"
            onClick={() => {
              const newQuestions = generateQuestions(20);
              setQuestions(newQuestions);
              setUserAnswers(Array(newQuestions.length).fill(""));
              setCurrentSet(0);
              setShowResults(false);
              setStartTime(null); // Reset start time
              setElapsedTime(0); // Reset elapsed time
              if (timerInterval) {
                clearInterval(timerInterval); // Clear the timer interval
              }
            }}
          >
            Retake Quiz
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen pt-2 sm:pt-0 pl-3 sm:pl-24 pr-3 sm:pr-24">
      <main className="flex-grow bg-zinc-900 text-white p-4 md:p-9 flex flex-col justify-center items-center text-sm md:text-xl gap-3 rounded-3xl shadow-xl shadow-slate-500">
        <h1 className="font-mono font-bold text-2xl md:text-4xl">
          Banking Maths Quiz Sets:{" "}
        </h1>
        <h2 className="font-bold flex items-center">
          <button
            onClick={handleStartQuiz}
            className="text-xs md:text-sm font-mono border-2 border-slate-50 p-2 md:p-2 rounded-2xl gap-2 hover:bg-slate-600"
          >
            Count_Time
          </button>
          {startTime && !isPaused
            ? ` ${Math.floor(elapsedTime / 60)}:${(elapsedTime % 60)
                .toString()
                .padStart(2, "0")}`
            : ""}
        </h2>
        <h3 className="font-light text-sm md:text-xl">
          Question Set {currentSet + 1}
        </h3>
        {questions.slice(currentSet * 5, currentSet * 5 + 5).map((q, index) => (
          <div key={index} className="w-full max-w-xs">
            <p className="font-mono text-xs md:text-sm p-1">{q.question}</p>
            <input
              className="text-black bg-slate-400 rounded-xl w-full p-2"
              type="text"
              value={userAnswers[currentSet * 5 + index]}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          </div>
        ))}
        <div className="flex flex-col md:flex-row gap-2 md:gap-3 mb-5">
          <button
            className="border-2 border-white p-2 md:p-3 text-xs md:text-sm rounded-xl hover:opacity-40"
            onClick={handlePreviousSet}
            disabled={currentSet === 0}
          >
            Previous Set
          </button>
          <button
            className="border-2 border-white p-2 md:p-3 text-xs md:text-sm rounded-xl hover:opacity-40"
            onClick={handleNextSet}
          >
            {currentSet < questions.length / 5 - 1 ? "Next Set" : "Submit Quiz"}
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Quiz;

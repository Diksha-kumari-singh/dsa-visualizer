import { useState, useEffect, useRef } from "react";
import Nav from "./Nav";
import InsertionSortAnimations from "../algorithm/Insertion";

export default function InsertionSort() {
  const [array, setArray] = useState([]);
  const [speed, setSpeed] = useState(50);
  const [isSorting, setIsSorting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const [activeIndices, setActiveIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);

  const [animations, setAnimations] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  const intervalRef = useRef(null);

  // 🔹 Generate random array
  const generateArray = () => {
    if (isSorting) return;
    const arr = Array.from({ length: 15 }, () =>
      Math.floor(Math.random() * 200) + 20
    );
    resetState();
    setArray(arr);
  };

  // 🔹 Manual input
  const handleInput = (e) => {
    if (isSorting) return;
    const values = e.target.value
      .split(",")
      .map((v) => Number(v.trim()))
      .filter((v) => !isNaN(v));
    resetState();
    setArray(values);
  };

  // 🔹 Start Sorting
  const startSorting = () => {
    if (array.length === 0) return;

    const anims = InsertionSortAnimations(array);
    resetState();

    setAnimations(anims);
    setIsSorting(true);
    setIsPaused(false);
    setCurrentStep(0);
  };

  // 🔹 Animation runner
  useEffect(() => {
    if (!isSorting || isPaused) return;

    intervalRef.current = setInterval(() => {
      setCurrentStep((prev) => prev + 1);
    }, speed);

    return () => clearInterval(intervalRef.current);
  }, [isSorting, isPaused, speed]);

  // 🔹 Apply step
  useEffect(() => {
    if (!isSorting) return;

    if (currentStep >= animations.length) {
      clearInterval(intervalRef.current);
      setIsSorting(false);
      setActiveIndices([]);
      setSortedIndices(array.map((_, i) => i));
      return;
    }

    const step = animations[currentStep];

    if (step.type === "compare") {
      setActiveIndices(step.indices);
    }

    if (step.type === "swap") {
      setArray((prev) => {
        const newArr = [...prev];
        const [a, b] = step.indices;
        [newArr[a], newArr[b]] = [newArr[b], newArr[a]];
        return newArr;
      });
    }

    if (step.type === "sorted") {
      setSortedIndices((prev) => {
        if (prev.includes(step.index)) return prev;
        return [...prev, step.index];
      });
    }
  }, [currentStep, animations, isSorting]);

  // 🔹 Controls
  const pauseSorting = () => {
    clearInterval(intervalRef.current);
    setIsPaused(true);
  };

  const resumeSorting = () => setIsPaused(false);

  const resetState = () => {
    clearInterval(intervalRef.current);
    setIsSorting(false);
    setIsPaused(false);
    setCurrentStep(0);
    setAnimations([]);
    setActiveIndices([]);
    setSortedIndices([]);
  };

  return (
    <div className="flex bg-linear-to-br from-gray-900 via-black to-gray-900 min-h-screen text-white">
      <Nav />

      <div className="ml-64 w-full p-8">

        {/* 🔥 HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold bg-linear-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Insertion Sort Visualizer
          </h1>
          <p className="text-gray-400 mt-2">
            Builds sorted array one element at a time by inserting correctly
          </p>
        </div>

        {/* 🔥 CONTROLS */}
        <div className="bg-gray-800/80 backdrop-blur-md p-5 rounded-2xl shadow-lg mb-8 flex flex-wrap gap-4 items-center">

          <button onClick={generateArray} className="btn-blue">
            🎲 Generate
          </button>

          <input
            type="text"
            placeholder="5,3,8,1"
            onChange={handleInput}
            className="input w-60"
          />

          <button
            onClick={startSorting}
            disabled={isSorting && !isPaused}
            className="btn-green disabled:opacity-50"
          >
            ▶ Start
          </button>

          <button
            onClick={pauseSorting}
            disabled={!isSorting || isPaused}
            className="btn-yellow disabled:opacity-50"
          >
            ⏸ Pause
          </button>

          <button
            onClick={resumeSorting}
            disabled={!isPaused}
            className="btn-blue disabled:opacity-50"
          >
            ⏯ Resume
          </button>

          <button onClick={resetState} className="btn-red">
            🔄 Reset
          </button>

          <div className="flex items-center gap-2 ml-auto">
            <span className="text-sm text-gray-300">Speed</span>
            <input
              type="range"
              min="5"
              max="400"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="accent-green-500"
            />
          </div>
        </div>

        {/* 📊 BARS */}
        <div className="flex items-end h-96 bg-gray-800/70 rounded-2xl p-4 mb-8 shadow-inner">

          {array.map((value, idx) => {
            let color = "bg-blue-400";

            if (activeIndices.includes(idx)) color = "bg-yellow-400";
            else if (sortedIndices.includes(idx)) color = "bg-green-400";

            return (
              <div
                key={idx}
                style={{ height: `${value}px` }}
                className={`${color} w-4 mx-1 rounded-t-md transition-all duration-300`}
              />
            );
          })}

        </div>

        {/* 📌 INFO SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="panel">
            <h2>Complexity</h2>
            <p>Time: O(n²)</p>
            <p>Space: O(1)</p>
          </div>

          <div className="panel">
            <h2>Legend</h2>
            <p>🔵 Default</p>
            <p>🟡 Comparing</p>
            <p>🟢 Sorted</p>
          </div>

          <div className="panel overflow-auto">
            <h2>Code</h2>
            <pre className="text-green-400 text-sm">
{`for (let i = 1; i < n; i++) {
  let key = arr[i];
  let j = i - 1;

  while (j >= 0 && arr[j] > key) {
    arr[j + 1] = arr[j];
    j--;
  }

  arr[j + 1] = key;
}`}
            </pre>
          </div>

        </div>

      </div>
    </div>
  );
}
import { useState, useEffect, useRef } from "react";
import Nav from "./Nav";
import BubbleSortAnimations from "../algorithm/Bubble";

export default function BubbleSort() {
  const [array, setArray] = useState([]);
  const [speed, setSpeed] = useState(100);
  const [isSorting, setIsSorting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const [activeIndices, setActiveIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);

  const [animations, setAnimations] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  const [status, setStatus] = useState("Idle");
  const [tab, setTab] = useState("code");

  const intervalRef = useRef(null);

  // 🔹 Generate array
  const generateArray = () => {
    if (isSorting) return;

    const arr = Array.from({ length: 12 }, () =>
      Math.floor(Math.random() * 150) + 20
    );

    resetState();
    setArray(arr);
  };

  // 🔹 User input
  const handleInput = (e) => {
    if (isSorting) return;

    const values = e.target.value
      .split(",")
      .map((v) => Number(v.trim()))
      .filter((v) => !isNaN(v));

    resetState();
    setArray(values);
  };

  // 🔹 Start sorting
  const startSorting = () => {
    if (array.length === 0) return;

    const anims = BubbleSortAnimations(array);
    setSortedIndices([]); // add this
    setAnimations(anims);
    setCurrentStep(0);
    setIsSorting(true);
    setIsPaused(false);
    setStatus("Sorting Started...");
  };

  // 🔹 Animation runner
  useEffect(() => {
  if (!isSorting || isPaused) return;

  intervalRef.current = setInterval(() => {
    setCurrentStep((prev) => {
      if (prev >= animations.length - 1) {
        clearInterval(intervalRef.current);
        return prev;
      }
      return prev + 1;
    });
  }, speed);

  return () => clearInterval(intervalRef.current);
}, [isSorting, isPaused, speed, animations.length]);
  // 🔹 Apply steps
  useEffect(() => {
    if (!isSorting) return;

    if (currentStep >= animations.length) {
  clearInterval(intervalRef.current);
  setIsSorting(false);
  setActiveIndices([]);
  setSortedIndices(array.map((_, i) => i));
  setStatus("Array Sorted Successfully ✅");

  // 🔥 ensure final sorted array
  setArray((prev) => [...prev].sort((a, b) => a - b));

  return;
}

    const step = animations[currentStep];

    if (step.type === "compare") {
      setActiveIndices(step.indices);
      setStatus(`Comparing ${step.indices[0]} and ${step.indices[1]}`);
    }

    if (step.type === "swap") {
      setStatus("Swapping elements");

      setArray((prev) => {
        const newArr = [...prev];
        const [a, b] = step.indices;
        [newArr[a], newArr[b]] = [newArr[b], newArr[a]];
        return newArr;
      });
    }

    if (step.type === "sorted") {
      setSortedIndices((prev) =>
  prev.includes(step.index) ? prev : [...prev, step.index]
);
      setStatus(`Index ${step.index} sorted`);
    }
  },  [currentStep, animations, isSorting]);

  // 🔹 Controls
  const pauseSorting = () => {
    clearInterval(intervalRef.current);
    setIsPaused(true);
    setStatus("Paused ⏸");
  };

  const resumeSorting = () => {
    setIsPaused(false);
    setStatus("Resumed ▶");
  };

  const resetState = () => {
    clearInterval(intervalRef.current);
    setIsSorting(false);
    setIsPaused(false);
    setCurrentStep(0);
    setAnimations([]);
    setActiveIndices([]);
    setSortedIndices([]);
    setStatus("Reset Done");
  };

  return (
    <div className="flex bg-linear-to-br from-gray-900 via-black to-gray-900 min-h-screen text-white">
      <Nav />

      <div className="ml-64 w-full p-8">

        {/* 🔥 HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold tracking-wide bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Bubble Sort Visualizer
          </h1>
          <p className="text-gray-400 mt-2">
            Watch how adjacent elements are compared and swapped
          </p>
        </div>

        {/* 🔥 CONTROLS */}
        <div className="bg-gray-800/80 backdrop-blur-md p-5 rounded-2xl shadow-lg mb-8 flex flex-wrap gap-4 items-center">

          <button onClick={generateArray} disabled={isSorting} className="btn-blue disabled:opacity-50">
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
              min="50"
              max="500"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
            />
          </div>
        </div>

        {/* 🔥 ARRAY DISPLAY */}
        {array.length > 0 && (
          <div className="flex justify-center mb-4">
            <div className="bg-purple-500/80 px-4 py-2 rounded-lg shadow">
              [{array.join(", ")}]
            </div>
          </div>
        )}

        {/* 🔥 STATUS */}
        <div className="text-center mb-3 text-yellow-400 font-semibold">
          {status}
        </div>

        {/* 📊 BARS */}
        <div className="flex items-end h-96 bg-gray-800/70 rounded-2xl p-4 mb-8 shadow-inner">

          {array.map((value, idx) => {
            let color = "bg-blue-400";

            if (activeIndices.includes(idx)) color = "bg-red-400";
            else if (sortedIndices.includes(idx)) color = "bg-green-400";

            return (
              <div key={idx} className="flex flex-col items-center mx-1">

                <div
                  style={{ height: `${value}px` }}
                  className={`${color} w-6 flex items-end justify-center text-xs rounded-t-md transition-all duration-300 hover:scale-110`}
                >
                  <span className="text-black font-bold mb-1">
                    {value}
                  </span>
                </div>

                <span className="text-xs mt-1 text-gray-400">
                  {idx}
                </span>

              </div>
            );
          })}
        </div>

        {/* 🔥 FINAL MESSAGE */}
        {!isSorting && sortedIndices.length === array.length && (
          <div className="flex justify-center mt-6">
            <div className="bg-green-500 px-6 py-3 rounded-lg font-bold shadow-lg">
              ✅ Array Sorted Successfully
            </div>
          </div>
        )}

        {/* 🔥 TABS */}
        <div className="flex justify-center gap-4 mt-8">

          <button onClick={() => setTab("code")} className={`px-4 py-2 rounded-lg ${tab === "code" ? "bg-blue-500" : "bg-gray-700"}`}>
            Code
          </button>

          <button onClick={() => setTab("complexity")} className={`px-4 py-2 rounded-lg ${tab === "complexity" ? "bg-green-500" : "bg-gray-700"}`}>
            Complexity
          </button>

          <button onClick={() => setTab("legend")} className={`px-4 py-2 rounded-lg ${tab === "legend" ? "bg-purple-500" : "bg-gray-700"}`}>
            Legend
          </button>
        </div>

        {/* 🔥 TAB CONTENT */}
        <div className="mt-6 bg-gray-800 p-5 rounded-xl max-w-3xl mx-auto shadow-lg">

          {tab === "code" && (
            <pre className="text-green-400 text-sm">
{`for (let i = 0; i < n; i++) {
  for (let j = 0; j < n-i-1; j++) {
    if (arr[j] > arr[j+1]) {
      swap(arr[j], arr[j+1]);
    }
  }
}`}
            </pre>
          )}

          {tab === "complexity" && (
            <div className="text-lg space-y-2">
              <p>⏱ Time: O(n²)</p>
              <p>💾 Space: O(1)</p>
            </div>
          )}

          {tab === "legend" && (
            <div className="space-y-2">
              <p>🔵 Default</p>
              <p>🔴 Comparing</p>
              <p>🟢 Sorted</p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
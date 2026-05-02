import { useState, useEffect, useRef } from "react";
import Nav2 from "./Nav2";
import BinarySearchAnimations from "../algorithm/Binary";

export default function BinarySearch() {
  const [array, setArray] = useState([]);
  const [target, setTarget] = useState("");
  const [speed, setSpeed] = useState(400);

  const [isSearching, setIsSearching] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const [animations, setAnimations] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  const [low, setLow] = useState(null);
  const [high, setHigh] = useState(null);
  const [mid, setMid] = useState(null);

  const [foundIndex, setFoundIndex] = useState(null);
  const [result, setResult] = useState(null);

  const intervalRef = useRef(null);

  // 🔹 Generate Sorted Array
  const generateArray = () => {
    if (isSearching) return;

    let arr = Array.from({ length: 12 }, () =>
      Math.floor(Math.random() * 100) + 10
    ).sort((a, b) => a - b);

    resetState();
    setArray(arr);
  };

  // 🔹 User Input
  const handleInput = (e) => {
    if (isSearching) return;

    const values = e.target.value
      .split(",")
      .map((v) => Number(v.trim()))
      .filter((v) => !isNaN(v))
      .sort((a, b) => a - b); // 🔥 important

    resetState();
    setArray(values);
  };

  // 🔹 Start Search
  const startSearch = () => {
    if (array.length === 0 || target === "") return;

    const anims = BinarySearchAnimations(array, Number(target));

    setAnimations(anims);
    setCurrentStep(0);
    setIsSearching(true);
    setIsPaused(false);
    setResult(null);
  };

  // 🔹 Animation Runner
  useEffect(() => {
    if (!isSearching || isPaused) return;

    intervalRef.current = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= animations.length - 1) {
          clearInterval(intervalRef.current);
          setIsSearching(false);

          if (foundIndex !== null) {
            setResult("FOUND");
          } else {
            setResult("NOT FOUND");
          }

          return prev;
        }
        return prev + 1;
      });
    }, speed);

    return () => clearInterval(intervalRef.current);
  }, [isSearching, isPaused, animations, speed, foundIndex]);

  // 🔹 Apply Step
  useEffect(() => {
    if (!isSearching) return;

    const step = animations[currentStep];
    if (!step) return;

    if (step.type === "check") {
      setLow(step.low);
      setHigh(step.high);
      setMid(step.mid);
    }

    if (step.type === "found") {
      setFoundIndex(step.index);
      setMid(step.index);
    }
  }, [currentStep]);

  // 🔹 Controls
  const pause = () => {
    clearInterval(intervalRef.current);
    setIsPaused(true);
  };

  const resume = () => setIsPaused(false);

  const resetState = () => {
    clearInterval(intervalRef.current);
    setIsSearching(false);
    setIsPaused(false);
    setCurrentStep(0);
    setAnimations([]);
    setLow(null);
    setHigh(null);
    setMid(null);
    setFoundIndex(null);
    setResult(null);
  };

  return (
  <div className="flex bg-linear-to-br from-gray-900 via-black to-gray-900 min-h-screen text-white">
    <Nav2 />

    <div className="ml-64 w-full p-8">

      {/* 🔥 HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold bg-linear-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          Binary Search Visualizer
        </h1>
        <p className="text-gray-400 mt-2">
          Efficiently search in a sorted array using divide & conquer
        </p>
      </div>

      {/* 🔥 CONTROLS */}
      <div className="bg-gray-800/80 backdrop-blur-md p-5 rounded-2xl shadow-lg mb-8 flex flex-wrap gap-4 items-center">

        <button onClick={generateArray} className="btn-blue">
          🎲 Generate
        </button>

        <input
          type="text"
          placeholder="Enter sorted array"
          onChange={handleInput}
          className="input w-60"
        />

        <input
          type="number"
          placeholder="Target"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          className="input w-24"
        />

        <button onClick={startSearch} className="btn-green">
          ▶ Start
        </button>

        <button onClick={pause} className="btn-yellow">
          ⏸ Pause
        </button>

        <button onClick={resume} className="btn-blue">
          ⏯ Resume
        </button>

        <button onClick={resetState} className="btn-red">
          🔄 Reset
        </button>

        <div className="flex items-center gap-2 ml-auto">
          <span className="text-sm text-gray-300">Speed</span>
          <input
            type="range"
            min="100"
            max="1000"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="accent-blue-500"
          />
        </div>
      </div>

      {/* 🔥 ARRAY */}
      {array.length > 0 && (
        <div className="flex justify-center mb-6">
          <div className="bg-purple-500 px-5 py-2 rounded-lg shadow-md">
            [{array.join(", ")}]
          </div>
        </div>
      )}

      {/* 📊 BARS */}
      <div className="flex items-end h-96 bg-gray-800/70 rounded-2xl p-6 mb-8 shadow-inner">
        {array.map((value, idx) => {
          let color = "bg-blue-400";

          if (idx === mid) color = "bg-yellow-400"; // mid
          else if (idx >= low && idx <= high) color = "bg-purple-400"; // range

          if (idx === foundIndex) color = "bg-green-400";

          return (
            <div key={idx} className="flex flex-col items-center mx-1">
              <div
                style={{ height: `${value}px` }}
                className={`${color} w-6 flex items-end justify-center text-xs rounded-t-md transition-all duration-300`}
              >
                <span className="mb-1 text-black font-bold">
                  {value}
                </span>
              </div>
              <span className="text-xs mt-1 text-gray-400">{idx}</span>
            </div>
          );
        })}
      </div>

      {/* 🔥 RESULT */}
      {result && (
        <div className="flex justify-center mb-8">
          <div
            className={`px-6 py-3 rounded-xl text-lg font-bold shadow-lg ${
              result === "FOUND"
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          >
            {result === "FOUND"
              ? `✅ Found at index ${foundIndex}`
              : "❌ Element Not Found"}
          </div>
        </div>
      )}

      {/* 📌 INFO */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Complexity */}
        <div className="bg-gray-800 p-5 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-2">⚡ Complexity</h2>
          <p>Time: O(log n)</p>
          <p>Space: O(1)</p>
        </div>

        {/* Legend */}
        <div className="bg-gray-800 p-5 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-2">🎨 Legend</h2>
          <p>🔵 Default</p>
          <p>🟣 Search Range</p>
          <p>🟡 Mid</p>
          <p>🟢 Found</p>
        </div>

        {/* Code */}
        <div className="bg-gray-800 p-5 rounded-xl shadow-md overflow-auto">
          <h2 className="text-lg font-semibold mb-2">💻 Code</h2>
          <pre className="text-green-400 text-sm">
{`while (low <= high) {
  let mid = Math.floor((low + high) / 2);

  if (arr[mid] === target) return mid;

  if (arr[mid] < target) low = mid + 1;
  else high = mid - 1;
}`}
          </pre>
        </div>

      </div>

    </div>
  </div>
);
}
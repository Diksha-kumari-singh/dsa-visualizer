import { useState, useEffect, useRef } from "react";
import Nav2 from "./Nav2";
import LinearSearchAnimations from "../algorithm/Linear";

export default function LinearSearch() {
  const [array, setArray] = useState([]);
  const [target, setTarget] = useState("");
  const [speed, setSpeed] = useState(300);

  const [isSearching, setIsSearching] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const [animations, setAnimations] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  const [activeIndex, setActiveIndex] = useState(null);
  const [foundIndex, setFoundIndex] = useState(null);
  const [result, setResult] = useState(null); // ✅ NEW

  const intervalRef = useRef(null);

  // 🔹 Generate random array
  const generateArray = () => {
    if (isSearching) return;

    const arr = Array.from({ length: 12 }, () =>
      Math.floor(Math.random() * 100) + 10
    );

    resetState();
    setArray(arr);
  };

  // 🔹 User input array
  const handleInput = (e) => {
    if (isSearching) return;

    const values = e.target.value
      .split(",")
      .map((v) => Number(v.trim()))
      .filter((v) => !isNaN(v));

    resetState();
    setArray(values);
  };

  // 🔹 Start Search
  const startSearch = () => {
    if (array.length === 0 || target === "") return;

    const anims = LinearSearchAnimations(array, Number(target));

    setAnimations(anims);
    setCurrentStep(0);
    setIsSearching(true);
    setIsPaused(false);
    setResult(null); // reset result
  };

  // 🔹 Animation runner
  useEffect(() => {
    if (!isSearching || isPaused) return;

    intervalRef.current = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= animations.length - 1) {
          clearInterval(intervalRef.current);
          setIsSearching(false);

          // ✅ result logic
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

  // 🔹 Apply animation step
  useEffect(() => {
    if (!isSearching) return;

    const step = animations[currentStep];
    if (!step) return;

    if (step.type === "check") {
      setActiveIndex(step.index);
    }

    if (step.type === "found") {
      setFoundIndex(step.index);
      setActiveIndex(null);
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
    setActiveIndex(null);
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
          Linear Search Visualizer
        </h1>
        <p className="text-gray-400 mt-2">
          Search elements sequentially and visualize each comparison
        </p>
      </div>

      {/* 🔥 CONTROLS */}
      <div className="bg-gray-800/80 backdrop-blur-md p-5 rounded-2xl shadow-lg mb-8 flex flex-wrap gap-4 items-center">

        <button onClick={generateArray} className="btn-blue">
          🎲 Generate
        </button>

        <input
          type="text"
          placeholder="Enter array (e.g. 5,3,8,1)"
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

      {/* 🔥 ARRAY DISPLAY */}
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

          if (idx === activeIndex) color = "bg-yellow-400";
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
          <p>Time: O(n)</p>
          <p>Space: O(1)</p>
        </div>

        {/* Legend */}
        <div className="bg-gray-800 p-5 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-2">🎨 Legend</h2>
          <p>🔵 Default</p>
          <p>🟡 Checking</p>
          <p>🟢 Found</p>
        </div>

        {/* Code */}
        <div className="bg-gray-800 p-5 rounded-xl shadow-md overflow-auto">
          <h2 className="text-lg font-semibold mb-2">💻 Code</h2>
          <pre className="text-green-400 text-sm">
{`for (let i = 0; i < n; i++) {
  if (arr[i] === target) {
    return i;
  }
}
return -1;`}
          </pre>
        </div>

      </div>

    </div>
  </div>
); 
}
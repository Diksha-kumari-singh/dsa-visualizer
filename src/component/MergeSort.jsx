import { useState, useEffect, useRef } from "react";
import Nav from "./Nav";
import MergeSortTree from "../algorithm/Merge";
const TreeNode = ({ node }) => {
  if (!node) return null;

  return (
    <div className="flex flex-col items-center">

      {/* Node */}
      <div className="bg-linear-to-r from-blue-500 to-purple-500 px-4 py-2 rounded-lg mb-4 text-sm shadow-lg">
        [{node.value.join(",")}]
      </div>

      {/* Children */}
      {node.children.length > 0 && (
        <div className="flex justify-center gap-16 relative">

          {/* LEFT */}
          <div className="flex flex-col items-center">
            <div className="w-px h-6 bg-gray-400"></div>
            <TreeNode node={node.children[0]} />
          </div>

          {/* RIGHT */}
          <div className="flex flex-col items-center">
            <div className="w-px h-6 bg-gray-400"></div>
            <TreeNode node={node.children[1]} />
          </div>

        </div>
      )}
    </div>
  );
};
export default function MergeSort() {
  const [array, setArray] = useState([]);
  const [speed, setSpeed] = useState(50);
  const [isSorting, setIsSorting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
 const [treeSteps, setTreeSteps] = useState([]);
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

  clearInterval(intervalRef.current);

  const steps = MergeSortTree(array);

  setTreeSteps(steps);
  setCurrentStep(0);
  setIsSorting(true);
  setIsPaused(false);
};

  // 🔹 Core animation runner
 useEffect(() => {
  if (!isSorting || isPaused) return;

  intervalRef.current = setInterval(() => {
    setCurrentStep((prev) => {
      if (prev >= treeSteps.length - 1) {
        clearInterval(intervalRef.current);
        setIsSorting(false);
        return prev;
      }
      return prev + 1;
    });
  }, speed * 10); // 🔥 control speed

  return () => clearInterval(intervalRef.current);
}, [isSorting, isPaused, treeSteps, speed]);

  // 🔹 Apply animation step


  // 🔹 Pause
  const pauseSorting = () => {
    clearInterval(intervalRef.current);
    setIsPaused(true);
  };

  // 🔹 Resume
  const resumeSorting = () => {
    setIsPaused(false);
  };

  // 🔹 Reset
  const resetState = () => {
  clearInterval(intervalRef.current);
  setIsSorting(false);
  setIsPaused(false);
  setCurrentStep(0);
  setTreeSteps([]);   // 🔥 IMPORTANT
};

  return (
  <div className="flex bg-linear-to-br from-gray-900 via-black to-gray-900 min-h-screen text-white">
    <Nav />

    <div className="ml-64 w-full p-8">

      {/* 🔥 HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Merge Sort Visualizer
        </h1>
        <p className="text-gray-400 mt-2">
          Visualize divide & conquer using recursion tree
        </p>
      </div>

      {/* 🔥 CONTROLS */}
      <div className="bg-gray-800/80 backdrop-blur-md p-5 rounded-2xl shadow-lg mb-8 flex flex-wrap gap-4 items-center">

        <button onClick={generateArray} className="btn-blue">
          🎲 Generate
        </button>

        <input
          type="text"
          placeholder="Enter values (e.g. 5,3,8,1)"
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
            className="accent-blue-500"
          />
        </div>
      </div>

      {/* 🔥 INITIAL ARRAY */}
      {array.length > 0 && !isSorting && (
        <div className="flex justify-center mb-6">
          <div className="bg-purple-500 px-5 py-2 rounded-lg shadow-md">
            [{array.join(", ")}]
          </div>
        </div>
      )}

      {/* 🌳 TREE VISUAL */}
      <div className="bg-gray-800/70 rounded-2xl p-6 shadow-inner flex justify-center mb-8 overflow-auto">
        {treeSteps.length > 0 && (
          <TreeNode node={treeSteps[currentStep]} />
        )}
      </div>

      {/* 📌 INFO SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Complexity */}
        <div className="bg-gray-800 p-5 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-2">⚡ Complexity</h2>
          <p>Time: O(n log n)</p>
          <p>Space: O(n)</p>
        </div>

        {/* Legend */}
        <div className="bg-gray-800 p-5 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-2">🎨 Legend</h2>
          <p>🔵 Sub-array</p>
          <p>🟣 Current split</p>
        </div>

        {/* Code */}
        <div className="bg-gray-800 p-5 rounded-xl shadow-md overflow-auto">
          <h2 className="text-lg font-semibold mb-2">💻 Code</h2>
          <pre className="text-green-400 text-sm">
{`function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  let mid = Math.floor(arr.length / 2);
  let left = mergeSort(arr.slice(0, mid));
  let right = mergeSort(arr.slice(mid));

  return merge(left, right);
}`}
          </pre>
        </div>

      </div>

    </div>
  </div>
);
}
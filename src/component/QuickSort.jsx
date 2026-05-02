import { useState, useEffect, useRef } from "react";
import Nav from "./Nav";
import QuickSortTree from "../algorithm/Quick";

function quickSortFinal(arr) {
  if (arr.length <= 1) return arr;

  let pivot = arr[arr.length - 1];

  let left = arr.filter(x => x < pivot);
  let equal = arr.filter(x => x === pivot);
  let right = arr.filter(x => x > pivot);

  return [
    ...quickSortFinal(left),
    ...equal,
    ...quickSortFinal(right)
  ];
}

const TreeNode = ({ node }) => {
  if (!node) return null;

  return (
    <div className="flex flex-col items-center">

      {/* Node */}
      <div className="bg-blue-500 px-4 py-2 rounded-lg mb-2 text-sm shadow-md">
        [
        {node.value.map((v, i) => (
          <span
            key={i}
            className={v === node.pivot ? "text-yellow-300 font-bold" : ""}
          >
            {v}
            {i !== node.value.length - 1 ? "," : ""}
          </span>
        ))}
        ]
      </div>

      {/* Pivot */}
      {node.pivot !== null && (
        <div className="text-yellow-400 text-xs mb-2">
          Pivot: {node.pivot}
        </div>
      )}

      {/* Children */}
      {node.children.length > 0 && (
        <div className="flex gap-10">
          <TreeNode node={node.children[0]} />
          <TreeNode node={node.children[1]} />
        </div>
      )}
    </div>
  );
};

export default function QuickSort() {
  const [array, setArray] = useState([]);
  const [speed, setSpeed] = useState(50);
  const [isSorting, setIsSorting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const [treeSteps, setTreeSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [sortedArray, setSortedArray] = useState([]);
  const intervalRef = useRef(null);

  // 🔹 Generate array (smaller for better tree view)
  const generateArray = () => {
    if (isSorting) return;

    const arr = Array.from({ length: 7 }, () =>
      Math.floor(Math.random() * 50) + 10
    );

    resetState();
    setArray(arr);
  };

  // 🔹 Input
  const handleInput = (e) => {
    if (isSorting) return;

    const values = e.target.value
      .split(",")
      .map((v) => Number(v.trim()))
      .filter((v) => !isNaN(v));

    resetState();
    setArray(values);
  };

  // 🔹 Start
  const startSorting = () => {
  if (array.length === 0) return;

  clearInterval(intervalRef.current);

  const steps = QuickSortTree(array);
  setTreeSteps(steps);

  // 🔥 ADD THIS LINE
  setSortedArray(quickSortFinal(array));

  setCurrentStep(0);
  setIsSorting(true);
  setIsPaused(false);
};

  // 🔹 Animation
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
    }, speed * 10);

    return () => clearInterval(intervalRef.current);
  }, [isSorting, isPaused, treeSteps, speed]);

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
    setTreeSteps([]);
  };

  return (
  <div className="flex bg-linear-to-br from-gray-900 via-black to-gray-900 min-h-screen text-white">
    <Nav />

    <div className="ml-64 w-full p-8">

      {/* 🔥 HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Quick Sort Visualizer
        </h1>
        <p className="text-gray-400 mt-2">
          Visualize pivot-based divide & conquer algorithm
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
            max="200"
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

      {/* 🔥 FINAL SORTED ARRAY */}
      {!isSorting && sortedArray.length > 0 && (
        <div className="flex justify-center mb-8">
          <div className="bg-green-500 px-6 py-3 rounded-xl text-lg font-semibold shadow-lg">
            ✅ Sorted: [{sortedArray.join(", ")}]
          </div>
        </div>
      )}

      {/* 📌 INFO SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Complexity */}
        <div className="bg-gray-800 p-5 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-2">⚡ Complexity</h2>
          <p>Time: O(n log n)</p>
          <p>Worst: O(n²)</p>
          <p>Space: O(log n)</p>
        </div>

        {/* Legend */}
        <div className="bg-gray-800 p-5 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-2">🎨 Legend</h2>
          <p>🔵 Array</p>
          <p>🟡 Pivot</p>
        </div>

        {/* Code */}
        <div className="bg-gray-800 p-5 rounded-xl shadow-md overflow-auto">
          <h2 className="text-lg font-semibold mb-2">💻 Code</h2>
          <pre className="text-green-400 text-sm">
{`function quickSort(arr) {
  if (arr.length <= 1) return arr;

  let pivot = arr[arr.length - 1];

  let left = arr.filter(x => x < pivot);
  let right = arr.filter(x => x > pivot);

  return [...quickSort(left), pivot, ...quickSort(right)];
}`}
          </pre>
        </div>

      </div>

    </div>
  </div>
);
}
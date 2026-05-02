import { Link } from "react-router-dom";
const token = localStorage.getItem("token");
export default function Front() {
  const token = localStorage.getItem("token");

  const handleStart = () => {
    if (!token) {
      window.location.href = "/login";
    } else {
      window.location.href = "/dsa";
    }
  };
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-800 text-white relative">

      {/* 🔥 Top Right Buttons */}
      <div className="absolute top-6 right-6 flex gap-4">

        {token ? (
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.reload();
            }}
            className="px-4 py-2 bg-red-500 rounded-lg"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login">
              <button className="px-4 py-2 bg-blue-500 rounded-lg">
                Login
              </button>
            </Link>

            <Link to="/signup">
              <button className="px-4 py-2 border border-gray-500 rounded-lg">
                Signup
              </button>
            </Link>
          </>
        )}

      </div>
      {/* 🔥 Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen">

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center">
          DSA Visualizer
        </h1>

        {/* Subtitle */}
        <p className="text-gray-400 text-lg md:text-xl mb-10 text-center max-w-xl">
          Learn Data Structures & Algorithms through beautiful visualizations.
          Understand concepts faster with interactive animations.
        </p>

        {/* Buttons */}
        <div className="flex gap-6">
          <button
            onClick={handleStart}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-xl text-lg font-semibold"
          >
            Start Learning
          </button>

          <Link to="/dsa">
            <button className="border border-gray-500 hover:bg-gray-700 px-6 py-3 rounded-xl text-lg transition duration-300">
              Explore Algorithms
            </button>
          </Link>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 px-6">

          <div className="bg-gray-800 p-6 rounded-xl shadow-md hover:scale-105 transition">
            <h2 className="text-xl font-semibold mb-2">📊 Sorting Visualizer</h2>
            <p className="text-gray-400">
              See how sorting algorithms work step-by-step.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl shadow-md hover:scale-105 transition">
            <h2 className="text-xl font-semibold mb-2">🔍 Searching Algorithms</h2>
            <p className="text-gray-400">
              Understand binary search and more visually.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl shadow-md hover:scale-105 transition">
            <h2 className="text-xl font-semibold mb-2">🧠 Interactive Learning</h2>
            <p className="text-gray-400">
              Control speed, steps, and explore deeply.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
import {Link} from "react-router-dom";
export default function Start() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-800 text-white px-6 py-10">

      {/* Heading */}
      <h1 className="text-4xl font-bold text-center mb-10">
        DSA Algorithms
      </h1>

      {/* Cards */}
      <div className="flex flex-wrap justify-center gap-8">

        <Link to="/sorting">
        <div className="bg-gray-800 w-60 h-40 rounded-2xl flex items-center justify-center text-xl font-semibold shadow-lg hover:bg-blue-500 hover:scale-105 transition duration-300 cursor-pointer">
          📊 Sorting
        </div>
        </Link>
        <Link to="/Searching">
        <div className="bg-gray-800 w-60 h-40 rounded-2xl flex items-center justify-center text-xl font-semibold shadow-lg hover:bg-green-500 hover:scale-105 transition duration-300 cursor-pointer">
          🔍 Searching
        </div>
        </Link>
        <div className="bg-gray-800 w-60 h-40 rounded-2xl flex items-center justify-center text-xl font-semibold shadow-lg hover:bg-purple-500 hover:scale-105 transition duration-300 cursor-pointer">
          🌳 Tree
        </div>
        <Link to="/graph">
        <div className="bg-gray-800 w-60 h-40 rounded-2xl flex items-center justify-center text-xl font-semibold shadow-lg hover:bg-red-500 hover:scale-105 transition duration-300 cursor-pointer">
          🌐 Graph
        </div>
        </Link>
      </div>
    </div>
  );
}
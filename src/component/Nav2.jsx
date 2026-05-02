import { useNavigate } from "react-router-dom";

export default function Nav2() {
  const navigate = useNavigate();

  const algorithms = [
    { name: "Linear search", path: "/linear" },
    { name: "Binary Search", path: "/binary" },
   
  ];

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-linear-to-b from-gray-900 via-black to-gray-800 text-white shadow-lg p-6">

      <h1 className="text-2xl font-bold mb-8 text-center">
        searching
      </h1>

      <div className="flex flex-col gap-4">
        {algorithms.map((algo, index) => (
          <div
            key={index}
            onClick={() => navigate(algo.path)}
            className="p-3 rounded-lg cursor-pointer hover:bg-blue-500 hover:translate-x-2 transition duration-300"
          >
            {algo.name}
          </div>
        ))}
      </div>

      <div className="absolute bottom-6 left-6 text-gray-400 text-sm">
        DSA Visualizer
      </div>
    </div>
  );
}
import React from "react";
import { createRoot } from "react-dom/client";
import Front from "./component/firstpage.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom"; 
import Start from "./component/Start.jsx";
import BubbleSort from "./component/BubbleSort.jsx";
import SelectionSort from "./component/SelectionSort.jsx";
import InsertionSort from "./component/InsertionSort.jsx";
import MergeSort from "./component/MergeSort.jsx";
import QuickSort from "./component/QuickSort.jsx";
import LinearSearch from "./component/LinearSearch.jsx";
import BinarySearch from "./component/BinarySearch.jsx";
import BFS from "./component/BFS.jsx";
import DFS from "./component/DFS.jsx";
import Login from "./component/login.jsx";
import Signup from "./component/Signup.jsx";
import ProtectedRoute from "./component/ProtectedRoute";
function App(){
    return(
        <BrowserRouter>
           <Routes>
             <Route path="/" element={<Front></Front>}></Route>
             <Route path="/dsa" element={<ProtectedRoute><Start></Start></ProtectedRoute>}></Route>
             <Route path="/sorting" element={<BubbleSort></BubbleSort>}></Route>
             <Route path="/bubble" element={<BubbleSort></BubbleSort>}></Route>
             <Route path="/insertion" element={<InsertionSort></InsertionSort>}></Route>
             <Route path="/selection" element={<SelectionSort></SelectionSort>}></Route>
              <Route path="/merge" element={<MergeSort></MergeSort>}></Route>
             <Route path="/quick" element={<QuickSort></QuickSort>}></Route>
             <Route path="/Searching" element={<LinearSearch></LinearSearch>}></Route>
             <Route path="/linear" element={<LinearSearch></LinearSearch>}></Route>
             <Route path="/binary" element={<BinarySearch></BinarySearch>}></Route>
             <Route path="/graph" element={<BFS></BFS>}></Route>
             <Route path="/bfs" element={<BFS></BFS>}></Route>
             <Route path="/dfs" element={<DFS></DFS>}></Route>
             <Route path="/login" element={<Login></Login>}></Route>
             <Route path="/signup" element={<Signup></Signup>}></Route>
           </Routes>
        </BrowserRouter>
    )
}

const root = createRoot(document.getElementById("root"));
root.render(<App/>); 
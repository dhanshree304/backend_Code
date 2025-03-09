import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Signup } from "./Components/signup";
import { Login } from "./Components/login";
import { CalculateBMI } from "./Components/calculateBMI";

import { BMIHistory } from "./Components/history";


import { Home } from "./Components/Home";

function App() {
  return (
    <div className="App">
    

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/calculateBMI" element={<CalculateBMI />} />

        <Route path="/getCalculation" element={<BMIHistory />} />
      </Routes>
    </div>
  );
}

export default App;

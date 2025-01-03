
import './App.css';
import { Routes, Route } from "react-router-dom";
import { Signup } from './Components/signup';
import { Login } from './Components/login';
import { CalculateBMI } from './Components/calculateBMI';

import { BMIHistory} from "./Components/history";

import { Navbar } from './Components/Navbar';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<h1>Welcome to ur BMI calculator</h1>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/calculateBMI" element={<CalculateBMI />} />
      
        <Route path="/getCalculation" element={<BMIHistory />} />
      </Routes>
    </div>
  );
}

export default App;

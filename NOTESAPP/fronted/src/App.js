
import './App.css';
import {Routes,Route} from "react-router-dom"
import { CreateNote} from './Components/CreateNote';
import { Login } from './Components/Login';
import { Register } from './Components/Register';
// import { Notes } from './Components/Notes';


function App() {
  return (
    <div >
    
      <Routes>
        
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        {/* <Route path="/notes" element={<Notes />} /> */}
        <Route path="/notes/create" element={<CreateNote />} />
      </Routes>
    </div>
  );
}

export default App;

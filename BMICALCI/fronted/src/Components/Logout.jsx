import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate()
  const handleSubmit = () => {
    localStorage.removeItem("token");
navigate("/login")

  };


  const token =localStorage.getItem("token") || ""


  useEffect(()=>{

  },[token])
  return token ? (
    
     
      <button onClick={handleSubmit}>Logout</button>
   
  ) : (
    <Link to="/login">LOGIN</Link>
  );
};

export { Logout };

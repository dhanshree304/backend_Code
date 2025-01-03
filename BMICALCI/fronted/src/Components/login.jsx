import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Login = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const navigate=useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
     
      email,
      password,
    };
    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
       return res.json();
      })
      .then((res) => {
        console.log(res)
        localStorage.setItem("token",res.token)
        alert("successfully login")
        navigate("/")
      });
  };
  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
      
        <input
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder=" Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="SUBMIT" />
      </form>
    </div>
  );
};

export { Login };

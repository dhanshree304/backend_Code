import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
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
        console.log(res);
        localStorage.setItem("token", res.token);
        alert("successfully login");
        navigate("/calculateBMI");
      });
  };
  //https:cdn-icons-png.flaticon.com/512/4140/4140039.png
  return (
    <div className="mainDiv">
      <img
        src="https://tse1.mm.bing.net/th?id=OIP.r2WgI0BAeoQEQh4cp441hQHaHa&pid=Api&P=0&h=220"
        alt=""
        className="blend"
      />
      <div className="subDiv">
        <form onSubmit={handleSubmit}>
          <label>Enter Your Email</label>
          <input
            type="email"
         
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <br />
          <label>Whats Your Password ?</label>
          <input
            type="password"

            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <input type="submit" value="LOGIN" />
        </form>
      </div>
    </div>
  );
};

export { Login };

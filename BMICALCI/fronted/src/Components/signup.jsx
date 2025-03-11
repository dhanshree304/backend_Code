import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name,
      email,
      password,
    };
    fetch("https://bmi-calculator-api.onrender.com/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        res.json();
      })
      .then((res) => {
        console.log(res);
        alert("Successfully Signup");
        navigate("/login");
      });
  };
  return (
    <div className="mainDiv">
      <div className="subDiv">
        <form onSubmit={handleSubmit}>
          <label>Whats Your Name</label>
          <input type="text" onChange={(e) => setName(e.target.value)} />
          <br />
          <br />
          <label>Enter Your Email </label>
          <input type="email" onChange={(e) => setEmail(e.target.value)} />
          <br />
          <br />
          <label>Set Your Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <input
            type="submit"
            value="SIGNUP"
            style={{ backgroundColor: "rgba(33, 229, 229, 0.69)",height:"40px",width:"110px",fontSize:"1.2rem" }}
          />
          <br />
        </form>
      </div>
    </div>
  );
};

export { Signup };

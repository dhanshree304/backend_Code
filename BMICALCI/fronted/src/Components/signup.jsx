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
    fetch("http://localhost:8080/signup", {
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
          <input type="submit" value="SIGNUP" />
          <br />
        </form>
      </div>
    </div>
  );
};

export { Signup };

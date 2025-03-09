import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      email,
      age,
      password,
    };

    fetch("http://localhost:9091/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        alert("Successfully Signup");
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="App">
      <div className="loginCard">
        <h1> Welcome !!</h1>
        <h4>Signup to Your Notes app</h4>
        <form onSubmit={handleSubmit}>
          <div
            style={{
              fontWeight: "bold",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label>Email</label>
            <input
              className="input-login"
              type="email"
              placeholder="a.@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div
            style={{
              fontWeight: "bold",
              marginTop: "30px",
            }}
          >
            <label>password</label>
            <input
              className="input-login"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <div
            style={{
              fontWeight: "bold",
              marginTop: "30px",

              display: "flex",
              flexDirection: "column",
            }}
          >
            <label>Age</label>
            <input
              className="input-login"
              type="number"
              placeholder="Age"
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="SUBMIT"
            style={{
              width: "95%",
              height: "30px",
              marginTop: "30px",
              borderRadius: "3px",
              backgroundColor: "black",
              color: "white",
            }}
          />
        </form>
      </div>
    </div>
  );
};

export { Register };

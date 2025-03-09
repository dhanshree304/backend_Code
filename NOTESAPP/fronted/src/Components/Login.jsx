import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Context/NotesContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {setToken}=useAuth()

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      email,
      password,
    };

    fetch("http://localhost:9091/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);

     setToken(res.token)
        
        alert("successfully login");
      
     navigate("/notes/create")
      })

      .catch((err) => console.log(err));
  };
  return (
    <div className="App">
      <div className="loginCard">
        <h1> Welcome back</h1>
        <h4>Login to Your Notes app</h4>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ fontWeight: "bold" }}>Email</label>
            <input
              className="input-login"
              type="email"
              placeholder="a.@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div
            style={{
              display: "flex",
              //justifyContent: "space-around",
              fontWeight: "bold",
              marginTop: "30px",
              gap: "60px",
            }}
          >
            <div>password</div>
            <div>Forgot Your Password ?</div>
          </div>

          <input
            className="input-login"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />

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
        <br />

        <hr />
        <p>
          Don't Have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export { Login };

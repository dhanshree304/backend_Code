import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        if (res.token) {
          localStorage.setItem("token", res.token);
        }
      })

      .catch((err) => console.log(err));
  };
  return (
    <div>
      <h1> LOGIN PAGE</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input type="submit" value="SUBMIT" />
      </form>
    </div>
  );
};

export { Login };

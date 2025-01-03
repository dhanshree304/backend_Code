import { useState } from "react";

const CalculateBMI = () => {
  const [height, setHeight] = useState("");
  const [weight, setweight] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      height,
      weight,
    };
    fetch("http://localhost:8080/calculateBMI", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setResult(res.BMI || 0);
      });
  };
  return (
    <div>
      <h1>Calculate BMI</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter height in feet"
          onChange={(e) => setHeight(e.target.value)}
        />
        <input
          type="text"
          placeholder=" Enter weight"
          onChange={(e) => setweight(e.target.value)}
        />
        <input type="submit" value="SUBMIT" />
      </form>

      {result && (
        <div>
          <h1>Your BMI is {result.toFixed(2)}</h1>
        </div>
      )}
    </div>
  );
};

export { CalculateBMI };

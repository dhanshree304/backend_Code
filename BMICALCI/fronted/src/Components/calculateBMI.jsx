import { useState } from "react";
import "./calculateBmi.css";
const CalculateBMI = () => {
  const [height, setHeight] = useState("");
  const [weight, setweight] = useState("");
  const [result, setResult] = useState(null);

  const [gender, setGender] = useState("");

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
    <div className="mainDiv">
      {gender === "" && (
        <div className="imgDiv">
          <div>
            <img
              src="https://tse1.mm.bing.net/th?id=OIP.On4mTZwiOs77-u2E97-A6QHaHa&pid=Api&P=0&h=220"
              alt=""
            />
            <button
              onClick={() => setGender("female")}
              style={{
                backgroundColor:
                  gender === "female" ? "rgb(35, 236, 236)" : "unset",
              }}
            >
              FEMALE
            </button>
          </div>
          <div>
            <img
              src="https://tse4.mm.bing.net/th?id=OIP.IkLYdobJ8Ux8CAX0AfuXIQHaHa&pid=Api&P=0&h=220"
              alt=""
            />
            <button
              onClick={() => setGender("male")}
              style={{
                backgroundColor:
                  gender === "male" ? "rgb(35, 236, 236)" : "unset",
              }}
            >
              MALE
            </button>
          </div>
        </div>
      )}

      <div className="subDiv">
        <form onSubmit={handleSubmit}>
          <label>Enter height in feet</label>
          <input type="text" onChange={(e) => setHeight(e.target.value)} />
          <br />
          <br />
          <label>Enter weight</label>
          <input type="number" onChange={(e) => setweight(e.target.value)} />
          <br />
          <br />
          <input type="submit" value="CALCULATE BMI" />
        </form>

        {result && (
          <div>
            <h1>Your BMI is {result.toFixed(2)}</h1>
          </div>
        )}
      </div>




      
    </div>
  );
};

export { CalculateBMI };

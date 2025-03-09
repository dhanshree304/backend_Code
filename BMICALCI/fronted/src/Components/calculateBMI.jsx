import { useState } from "react";
import "./calculateBmi.css";

import { Link } from "react-router-dom";
const CalculateBMI = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState(null);

  const [gender, setGender] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      height,
      weight,
    }
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

      {gender !== "" && (
        <div className="card">
          <form onSubmit={handleSubmit}>
            <label>Enter height in feet</label>
            <input type="text" onChange={(e) => setHeight(e.target.value)} />
            <br />
            <br />
            <label>Enter weight</label>
            <input type="number" onChange={(e) => setWeight(e.target.value)} />
            <br />
            <br />
            <input
              type="submit"
              value="CALCULATE BMI"
              style={{
                backgroundColor: "rgba(33, 229, 229, 0.69)",
                height: "40px",
                width: "190px",
                fontSize: "1.2rem",
              }}
            />
          </form>

          {result && (
            <div>
              <h1>Your BMI is {result.toFixed(2)}</h1>
              <img
                src={
                  gender === "male"
                    ? "https://tse4.mm.bing.net/th?id=OIP.TrEE1CCkYP0gJVa2Xoc5WgHaEK&pid=Api&P=0&h=220"
                    : "https://cmkt-image-prd.freetls.fastly.net/0.1.0/ps/3657446/1820/1213/m1/fpnw/wm1/cmldcmwnrwsaxnv9krdznol2qtw8d6ifiedpieb84mxw2bv8nk0e3xvwuwdkdfpu-.jpg?1511936279&s=66d4ab4cb3138f8351200b809c6638f0"
                }
                width="100%"
                alt=""
              />

              <Link to="/getCalculation">
                <img
                  className="bblend"
                  style={{ height: "30px", width: "30px" }}
                  src="https://tse3.mm.bing.net/th?id=OIP.1kL136ZPN4jfL7DVsndKPwHaGB&pid=Api&P=0&h=220"
                  alt=""
                />
              </Link>
            </div>
          )}
        </div>
      )}

      {/* <div>
        
        
      </div> */}
    </div>
  );
};

export { CalculateBMI };

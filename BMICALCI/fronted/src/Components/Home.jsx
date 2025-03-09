import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="mainDiv">
      <h1>Well-Come To The BMI Calculator</h1>
      <Link to="/signup">
        <button
          style={{
            height: "40px",
            width: "100px",
            border: "none",
            borderRadius: "20px",
            fontWeight: "bold",
            fontSize: "1rem",
            margin: "10px",
            backgroundColor: "white",
          }}
        >
          SIGNUP
        </button>
      </Link>
      <Link to="/login">
        <button
          style={{
            height: "40px",
            width: "100px",
            border: "none",
            borderRadius: "20px",
            fontWeight: "bold",
            fontSize: "1rem",
            margin: "10px",
            backgroundColor: "white",
          }}
        >
          LOGIN
        </button>
      </Link>
    </div>
  );
};

export { Home };

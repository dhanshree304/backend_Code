// src/components/BMIHistory.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";


const BMIHistory = () => {
  const [bmiHistory, setBmiHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBMIHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/getCalculation`, // Replace with your backend URL
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data);
        setBmiHistory(response.data.history);
      } catch (err) {
        setError("Error fetching BMI history.");
      } finally {
        setLoading(false);
      }
    };

    fetchBMIHistory();
  }, []);

  return (
    <div
      className="mainDiv"
      style={{
        maxHeight:"100%",
        overflowY:"scroll",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontWeight: "bold",
      }}
    >
      <h2>BMI History</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && (
        <table border="1" cellPadding="20">
          <thead>
            <tr>
              <th>Date</th>
              <th>BMI</th>
            </tr>
          </thead>
          <tbody>
            {bmiHistory.length > 0 ? (
              bmiHistory.map((record, index) => (
                <tr key={index}>
                  <td>{new Date(record.createdAt).toLocaleDateString()}</td>
                  <td>{record.BMI.toFixed(2)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No BMI history found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export { BMIHistory };

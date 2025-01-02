const express = require("express");
const { connection } = require("./Config/db");

const { studentRouter } = require("./Routers/student.route");
const { iaRouter } = require("./Routers/ia.route");

const app = express();
//comming from /student path ,send it to the student router.
app.use(express.json());
//untill we add express middleWare the object json
//we are posting into the db will not post

app.get("/", (req, res) => {
  res.send("Its a Home page");
});

app.use("/students", studentRouter); //everything which is related to student post patch put delete will be
//like /students/
app.use("/ias", iaRouter); //everything which is

app.listen(9090, async () => {
  try {
    await connection;
    console.log("Connected to DB successfully");
  } catch (err) {
    console.log("Error connecting to DB");
    console.log(err);
  }
  console.log("Listening at PORT 9090");
});

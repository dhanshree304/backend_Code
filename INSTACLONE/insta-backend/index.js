const express = require("express");

const { connection } = require("./Config/db");
const { authRouter } = require("./Routers/authRouter");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", authRouter);

app.listen(6767, async () => {
  try {
    await connection;
    console.log("connected to DB successfully");
  } catch (err) {
    console.log("err to connecting DB");
    console.log(err);
  }

  console.log("listening on port 6767");
});

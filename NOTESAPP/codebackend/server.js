const express = require("express");
const { usersController } = require("./Routes/userRoutes");
const { connection } = require("./Config/db");
const { notesController } = require("./Routes/noteRoutes");
const { authentication } = require("./Middleware/authentication");
const  cors  = require ("cors");

const app = express();
const PORT = 9091;
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Home page");
});

app.use("/users", usersController);

app.use("/notes",authentication, notesController);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("connected to DB");
  } catch (err) {
    console.log("error connecting to DB");
  }
  console.log(`listening on PORT ${PORT}`);
});

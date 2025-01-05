const express = require("express");
const mongoose = require("mongoose")
const argon2 = require("argon2");
const { UserModel } = require("./models/people");
const jwt=require("jsonwebtoken")


const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  const { username, password, age } = req.body;
  const hash = await argon2.hash(password);//32 letter string mde convert
  const user = new UserModel({ username, hash,age });
  await user.save();
  res.status(201).send("User created successfully");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
const user = await UserModel.findOne({ username });
  const verification = await argon2.verify(user.hash, password);
console.log({"one":user.hash, "two":password});
  console.log("Password verification", verification);

if (verification) {//mhnje hased pass and given pass match then
    const primaryToken = jwt.sign(
      { id: user._id, name: user.username, age: user.age },
      "SECRET1234",
      {
        expiresIn: "5 min",
      }
    );
    const refreshToken = jwt.sign(
      { id: user._id, name: user.username, age: user.age },
      "SECRETREFRESH1234",
      { expiresIn: "7 days" }
    );

    return res.send({
      message: "Logged in successfully",
      token: primaryToken,
      refreshToken: refreshToken,
    });
  }else{
      res.status(401).send("Unauthorized");
  }
});

app.get("/profile/:userid", async (req, res) => {
  const token = req.headers["authorization"];

  const { userid } = req.params;
  try {
    const validity = jwt.verify(token, "SECRET1234");
    if (validity) {
      res.send({ name: "john" });
    }
  } catch (e) {
    //if token is expired
    //push it in blacklist
    console.log("Error", e);
    return res.status(403).send("Token is expired");
  }
});

app.post("/refresh", (req, res) => {
  const refreshToken = req.headers["authorization"];
  try {
    const verification = jwt.verify(refresh, "SECRETREFRESH1234");
    if (verification) {
      const decode = jwt.decode(refreshToken);
      const primary = jwt.sign(decode, "SECRET12345", { expiresIn: "5 min" });
      res.send(primary);
    }
  } catch (err) {
    //tell fronted user need to login
  }
});
mongoose.connect("mongodb://localhost:27017/people").then(() => {
  app.listen(6754, () => {
    console.log("server started on port 6754");
  });
});

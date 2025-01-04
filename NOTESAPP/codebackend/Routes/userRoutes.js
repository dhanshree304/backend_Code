const { Router } = require("express");
const { userModel } = require("../Models/userModel");
//const router = express.Router();
const usersController = Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

usersController.post("/signup",async (req, res) => {
  const { email, password, age } = req.body;
   console.log(req.body);
  const isUser = await userModel.findOne({ email });
  if (isUser) {
    res.send({"msg":"User already exist,try loggin in"});
  } else {
    bcrypt.hash(password, 5, async function (err, hash) {
      if (err) {
        res.send("Something went wrong,plz try again later");
      }
      const user = new userModel({
        email,
        password: hash,
        age,
      });
      try {
        await user.save();
        res.send("Signup successful");
      } catch (err) {
        console.log(err);
        res.send("try again something went wrong");
      }
    });
  }
});

usersController.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if(!user){
   return  res.send("user not found")
  }
  const hash = user.password;
  bcrypt.compare(password, hash, function (err, result) {
    if (err) {
      res.send("Something went wrong, plz try again later");
    }
    const secretKey = "abcd@123";
    if (result) {
      const token = jwt.sign({ userId: user._id }, secretKey);
      res.send({ message: "Login Successful", token });
    } else {
      res.send("Invalid credientials,plz signup if u have not");
    }
    res.send("Login successful...");
  });
});

module.exports = { usersController };

const express = require("express");
const { connection } = require("./Config/db");
const { userModel } = require("./Models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { authentication } = require("./middlewares/authentication");
const { bmiModel } = require("./Models/bmiModel");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello");
});
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  const isUser = await userModel.findOne({ email });
  if (isUser) {
    res.send({"msg":"User already exist,try loggin in"});
  }{

  bcrypt.hash(password, 4, async function (err, hashed_password) {
    console.log(err);
    if (err) {
      res.send({"msg":"something went wrong....."});
    }
    const new_user = new userModel({
      email,
      name,
      password: hashed_password,
    }); //here we r inserting many {} without using insertMany

    try {
      await new_user.save();
      res.send({"msg":"Sign up successfull"});
    } catch (err) {
      res.send({"msg":"Something went wrong"});
    }
  });
}
});

//675fde7e9d51377d5d48462f pooja1  675fde7e9d51377d5d48462f every single user has an id generated by mongodb
//675fde4c6c15e147a1d31bc5 pooja

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  console.log(user); //{_id,name,email,password}_id->675fde7e9d51377d5d48462f->pooja1
  const hashed_password = user.password; //**** */
  const user_id = user._id; //**** */
  console.log(user_id); //675fde7e9d51377d5d48462f->pooja1
  bcrypt.compare(password, hashed_password, function (err, result) {
    if (err) {
      res.send("Something went wrong,try again");
    }
    const secretKey = "abcd12345";
    if (result) {
      const token = jwt.sign({ user_id }, secretKey); //token ya provide data vrun create hot .
      // //.aani ha data aapn decode krto when needed
      res.send({ msg: "Login successful", token }); //*** */why obj
    } else {
      res.send("Login failed");
    }
  });
});

app.get("/getProfile", authentication, (req, res) => {
  //const {user_id} =req.body
  const user = userModel.findOne({ user_id });
  const { name, email } = user;
  res.send({ name, email });
});

app.post("/calculateBMI", authentication, async (req, res) => {
  const { height, weight, user_id } = req.body;
  const height_in_metre = Number(height) * 0.3048;
  const BMI = Number(weight) / height_in_metre ** 2;
  const new_bmi = new bmiModel({
    BMI,
    height: height_in_metre,
    weight,
    user_id,
  });
  await new_bmi.save();
  res.send({ BMI }); //****why object */
});

app.get("/getCalculation", authentication, async (req, res) => {
  const { user_id } = req.body;
  const all_bmi = await bmiModel.find({ user_id });
  res.send({ history: all_bmi });
});

app.listen(8080, async () => {
  try {
    await connection;
    console.log("connection to DB is successful");
  } catch (err) {
    console.log("Error connecting to db");
    console.log(err);
  }
  console.log("Listening on PORT 8080");
});

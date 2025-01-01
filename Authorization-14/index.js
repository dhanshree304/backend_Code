const express = require("express");
const jwt = require("jsonwebtoken");
const { connection } = require("./Config/db");
const bcrypt = require("bcrypt");
const { UserModel } = require("./Models/autho.model");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Home Page");
});

//create a middleware for repeatable code
const authentication = (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];
  console.log(token);
  try {
    var decoded = jwt.verify(token, "abcd12345");
    console.log(decoded); //{ email: 'p@gmail.com', iat: 1735563570 }
    req.body.email = decoded.email;
    //const { email } = decoded;

    //req.body.name="xyz";
    next(); //next mhnje next app.whatever
  } catch (err) {
    res.send("Please login again");
  }
};

const authorization = (permittedRole) => {
  return async (req, res, next) => {
    //console.log(req.body.name)
    const email = req.body.email;
    const user = await UserModel.findOne({ email: email });//ya email cha comp {}
    const role = user.role;
    if (permittedRole.includes(role)) {
      next();
    } else {
      res.send("Not Authorised");
    }
  };
};

// app.use(authentication);
// app.use(authorization);

app.get("/dashboard", authentication, (req, res) => {
  res.send("your dashboard data is here...");
});

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  bcrypt.hash(password, 5, async function (err, hashed_password) {
    if (err) {
      res.send("Something went wrong , please signup later");
    }

    const new_user = new UserModel({
      email: email,
      password: hashed_password,
    });

    await new_user.save();
    res.send("Sign up successfull");
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    res.send("signup up please");
  }
  const hashed_password = user.password;
  console.log(user);
  bcrypt.compare(password, hashed_password, function (err, result) {
    if (result) {
      const token = jwt.sign({ email: email }, "abcd12345"); //secret key
      res.send({ msg: "Login successful", token: token });
    } else {
      res.send("Login falied");
    }
  });
});

//only authentication
app.get("/products/cart", authentication, (req, res) => {
  res.send("Here are cart products");
});

//needs authentication and authorization (seller-->allow to this route)
app.post(
  "/products/create",
  authentication,
  authorization("seller"),
  async (req, res) => {
    res.send("product is created");
  }
);

app.post(
  "/productsFeedback",
  authentication,
  authorization("customer"),//jo role schema mde set krto toch assign hot asto
  async (req, res) => {
    res.send("Here is a feedback");
  }
);

app.post(
  "/assign/edit",
  authentication,
  authorization(["ia", "instructor"]),
  async (req, res) => {
    res.send("assignment is edited");
  }
);

app.listen(3456, async () => {
  try {
    await connection;
    console.log("Connected to DB successfully");
  } catch (err) {
    console.log("Error connected to DB");
    console.log(err);
  }
  console.log("Listening on port 3456");
});

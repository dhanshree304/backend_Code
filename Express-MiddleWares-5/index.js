const express = require("express");
const fs = require("fs");

const app = express();
const { messagesRouter } = require("./routes/messages.route");
const { employeesRouter } = require("./routes/employees.route");

//function --> which has access to request object and response object and next()
// app.use((req, res,next) => {
//   console.log(`The method is ${req.method} and the URL is ${req.url}`);
//   next();
// })//this is a middleWare and kept at top becoz if not kept at top it will
// //not print method and url for above code.
// //next() nhi use kel ki line 7 paryant code run hoil

//custom middleWare .use is keyword.
// app.use((req, res, next) => {
//   const startTime = new Date().getTime();
//   console.log(startTime);
//   next();
//   const endTime = new Date().getTime();
//   console.log(endTime);
//   console.log(endTime - startTime + "ms");
// }); //time taken = endTime-startTime

// const char = (req, res, next) => {
//   console.log("m");
//   next(); //next direct (here urlLogger)refer krt.
//   console.log("y");
// };

// const urlLogger = (req, res, next) => {
//   console.log("g");
//   next();
//   console.log("f");
// };
// app.use(char);
// app.use(urlLogger); ///m g f y

//inbuild middleWares
app.use(express.json());
app.use(express.text());

app.get("/", (req, res) => {
  res.send("welcome to home page");
});

app.get("/about", (req, res) => {
  res.send("welcome to about page");
});

app.use("/messages", messagesRouter);
app.use("/employees", employeesRouter);

app.get("/employees", (req, res) => {
  res.send("employees data...");
});

app.get("/contact", (req, res) => {
  const file = fs.readFileSync("./package.json", { encoding: "utf-8" });
  res.send("contact details are...");
});

app.listen(8080, () => {
  console.log("Listening on port 8080");
});

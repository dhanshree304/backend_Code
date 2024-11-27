const express = require("express");
const app = express();

//function --> which has access to request object and response object and next()
// app.use((req, res,next) => {
//   console.log(`The method is ${req.method} and the URL is ${req.url}`);
//   next();
// })//this is a middleWare and kept at top becoz if not kept at top it will
// //not print method and url for above code.
// //next() nhi use kel ki line 7 paryant code run hoil

app.get("/", (req, res) => {
  res.send("welcome to home page");
});
//custom middleWare .use is keyword.
app.use((req, res, next) => {
  const startTime = new Date().getTime();
  console.log(startTime);
  next();
  const endTime = new Date().getTime();
  console.log(endTime);
  console.log(endTime - startTime + "ms");
}); //time taken = endTime-startTime

app.get("/about", (req, res) => {
  res.send("welcome to about page");
});

app.get("/contact", (req, res) => {
  const file = fs.readFileSync("./package.json", { encoding: "utf-8" });
  res.send("contact details are...");
});

app.listen(8080, () => {
  console.log("Listening on port 8080");
});

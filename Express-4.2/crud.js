const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Well-come to home page");
});

app.get("/products", (req, res) => {
    const {price} =req.query
//   const data = fs.readFileSync("./db.json", { encoding: "utf-8" });
//   const parseData = JSON.parse(data);
//   const products = parseData.products;
//   console.log(products);
  res.send("Here are your products of price" + price);
});


app.get("/products/:id",(req,res)=>{
    const {id} = req.params;
    res.send("here is your product" + id);
})

app.post("/addproducts", (req, res) => {
  //1.accessing the product which client is sending.
  //req.body
  //2.read the file
  const file = fs.readFileSync("./db.json", { encoding: "utf-8" });
  let parsedFile = JSON.parse(file); //ithe simple object create hoto
  //3.Modify the products in the file
  parsedFile.products.push(req.body); //db.json mdhlya products key chya array mde product add hoil.
  console.log(parsedFile);
  //4.stringify the file
  parsedFile = JSON.stringify(parsedFile);
  //5. Write the file back //db.json mde push hot products array [] mde
  fs.writeFileSync("./db.json", parsedFile, {
    encoding: "utf-8",
  });

  res.send("your product was added");
});
// {"id":"1","price":"200"}.. .appendFileSync ni kuthehi db.json mde append hot
//bt aaplyla [] mde havy so...ha ek json object aahe tyatli key product . notesion ni nhi gheta yet ...
//so we have to convert that json object into simple object parsed
app.listen(8181, () => {
  console.log("Listening on port 8181");
});

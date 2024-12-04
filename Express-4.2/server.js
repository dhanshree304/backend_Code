

const express = require("express");
const fs =require("fs")

const app = express();
app.use(express.json())//middleWare

app.get("/",(req,res)=>{
    res.send("welcome to homePage")
})

app.get("/profile",(req,res)=>{
    res.send("profile page")
})

app.post("/uploaddata",(req,res)=>{
    //console.log(req.body)//will print in console what we send as a body {"msg":"Hi from postman"}
    fs.appendFileSync("./data.txt",JSON.stringify(req.body),{encoding:"utf-8"})//appendFileSync will keep posting (adding) new data in data.txt
    res.send("thanks");//data will show data in data.txt
})

app.listen(8500,()=>{
    console.log("Listening on PORT 8500")
})
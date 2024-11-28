
const express = require("express")
const messagesRouter = express.Router()

messagesRouter.post("/add", (req, res) => {
  console.log(req.body);
  res.send("received your messages");
});

messagesRouter.get("/", (req, res) => {
  res.send("messages");
});

messagesRouter.delete("/delete", (req, res) => {
  res.send("messages delete");
});

module.exports ={messagesRouter}
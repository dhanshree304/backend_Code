


const express = require("express");

const employeesRouter = express.Router()


employeesRouter.get("/",(req,res)=>{
    res.send("employees data...")
})

module.exports = {employeesRouter}
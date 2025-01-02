const {Router} = require("express");
const { studentController } = require("../Controllers/student.controller");



const studentRouter =Router()

studentRouter.get("/",studentController.getStudent);

studentRouter.get("/:studentname", studentController.getStudentByName);

studentRouter.post("/addStudent", studentController.postStudent);
    //10 lines of code


module.exports={studentRouter}








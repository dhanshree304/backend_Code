const {studentModel } = require("../Models/Student.model");

const getStudent = async (req, res) => {
  const students_data = await studentModel.find();
  res.send(students_data);
};

const getStudentByName = async (req, res) => {
  console.log(req.params.studentname); //http://localhost:9090/students/sudarshan 
  // //got the diff between query param and param
  const students_data = await studentModel.find({
    name: req.params.studentname,
  });
  //url path will be like /students/amol
  res.send(students_data);
};

const postStudent = async (req, res) => {
  //http://localhost:9090/students/addStudent
  const payload = req.body;
  if (!payload.age || !payload.name || !payload.course) {
    res.send("Please send all required Fields");
  }
  if (payload.course === "NEM-111") {
    await studentModel.insertMany([payload]);
    res.send("Student data created successfully");
  } else {
    res.send("Please enter a valid course");
  }
};
const studentController={getStudent,getStudentByName,postStudent}

module.exports = { studentController };
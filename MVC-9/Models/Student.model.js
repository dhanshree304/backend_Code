
const mongoose = require("mongoose")

const studentSchema = mongoose.Schema({
  name: String,
  age: {type:Number,required:true},
  course: String,
});

const studentModel = mongoose.model("student", studentSchema);


module.exports={studentModel}
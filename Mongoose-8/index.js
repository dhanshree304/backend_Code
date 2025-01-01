const mongoose = require("mongoose")

const main = async() =>{
    try{
      const connection = await mongoose.connect(
        "mongodb://127.0.0.1:27017/first_db"
      );
      console.log("connection successfully");

      await StudentModel.insertMany([
        { name: "Dhanshree", age: 23, course: "MERN" },
        { name: "Amol", age: 25, course: "JAVA" },
      ]);
      //...we commet it out
      //becoz every time fun run it will create it.
      const result = await StudentModel.find({name:"Dhanshree"});
      console.log(result);
      //await instructorModel.insertMany([{name:"",age:23,course:"MERN"}])
      connection.disconnect();
    }catch(err){
console.log(err);
    }
}
main();

const studentSchema=mongoose.Schema({
    name:String,
    age:Number,
    course:String
})

//collection name must be singular always...
const StudentModel = mongoose.model("student",studentSchema)
//model create krne mhnje db mde collection create krne.


const instructorSchema = mongoose.Schema({
  name: String,
  age: Number,//1234->"1234"-->1234 no errror ...it will convert the string into the no
  course: String, //"two"--> throw error..
});

const instructorModel = mongoose.model("students", instructorSchema);

//command prompt mongosh 
//show dbs--> all available databases
//

//this is notr running
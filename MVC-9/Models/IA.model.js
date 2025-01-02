const mongoose  = require("mongoose");



const iaSchema = new mongoose.Schema({
  name: String,
  course: String,
})

const Ia = mongoose.model("ia", iaSchema);

module.exports={Ia}


const mongoose = require("mongoose")

const bmiSchema = new mongoose.Schema({
  BMI: { type: Number, required: true },
  height: { type: String, required: true },
  weight: { type: Number, required: true },
  user_id: { type: String, required: true },
},{
    timestamps:true,//**** */whats that..
    versionKey:false
})

const bmiModel = mongoose.model("bmi",bmiSchema)

module.exports={bmiModel}
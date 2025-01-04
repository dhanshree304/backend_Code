const mongoose = require("mongoose");


const noteSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  Heading: { type: String, required: true },
  Note: { type: String, required: true },
  Tag: { type: String, required: true },
});

const noteModel = mongoose.model("note",noteSchema)

module.exports={
    noteModel
}
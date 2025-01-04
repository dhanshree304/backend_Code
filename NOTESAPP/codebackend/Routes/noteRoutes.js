const { Router } = require("express");

//const router = express.Router();
const notesController = Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { noteModel } = require("../Models/noteModel");

notesController.get("/", async (req, res) => {
  const notesOfUserWithId = await noteModel.find({
    userId: req.body.userId,
  });
  console.log(req.body)
  res.send(notesOfUserWithId);
});

notesController.post("/create", async (req, res) => {
  const { Heading, Note, Tag, userId } = req.body;
  console.log(req.body)
  const note = new noteModel({
    Heading,
    Note,
    Tag,
    userId,
  });
  try {
    await note.save();
    res.send("note created");
  } catch (err) {
    res.send("something went wrong");
  }
});


notesController.delete("/delete/:noteId",async(req,res)=>{
  const {noteId} = req.params;
  const deletedNote = await noteModel.findOneAndDelete({_id:noteId,userId:req.body.userId})
  if(deletedNote){
    res.send("Deleted")
  }else{
    res.send("couldnt delete")
  }
})

notesController.patch("/edit/:noteId",async(req,res)=>{
  const {noteId}=req.params
  const updatedNote = await noteModel.findOneAndUpdate({_id:noteId,userId:req.body.userId},req.body)
if(updatedNote){
  res.send("Updated")
}else{
  res.send("Couldn't update")
}
})
module.exports = { notesController };

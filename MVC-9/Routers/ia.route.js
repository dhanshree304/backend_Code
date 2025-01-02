

const {Router} = require("express");
const {Ia} = require("../Models/IA.model")


const iaRouter = Router()

iaRouter.get("/ias", async (req, res) => {
  const ias_data = await Ia.find();
  res.send(ias_data);
});

module.exports={iaRouter}
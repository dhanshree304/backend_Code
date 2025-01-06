

const {Router} = require("express");
const { userModel } = require("../Models/userModel");

const authRouter = Router()



authRouter.post("/signup",(req,res)=>{
   const user = new userModel(...req.body)
   user.save((err,success)=>{
    if(err){
        return res.status(500).send({msg:"Error occoured"})
    }
    return res.status(201).send({msg:"Signup success",...success})
   })

})


authRouter.post("/login", async(req, res) => {
const {username,password} = req.body;
const validUser = await userModel.find({username,password});
return res.send(validUser)


});

module.exports={authRouter}





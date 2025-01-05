const {Schema,model} = require("mongoose");

const UserSchema = new Schema({
    username:String,
    hash:String,
    age:Number
})

const UserModel=model("user",UserSchema);

module.exports = {UserModel};
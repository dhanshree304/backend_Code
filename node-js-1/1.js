



const {add,mul,sub,div} = require("./cacl");
//here u import in same obj in any order..import funs and file both
console.log(add(3,4));
console.log(sub(3,1));
console.log(mul(3,4));
console.log(div(20,4));

 console.log("hello");//1

const fs = require("fs")
const data = fs.readFileSync("./cacl.js",{encoding:"utf-8"})
console.log(data);//2

console.log("Hope u read the file")//3

const checkEven=require("is-even")
console.log(checkEven(7))
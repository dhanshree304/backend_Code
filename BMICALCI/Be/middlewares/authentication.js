const jwt = require("jsonwebtoken")

const secretKey = "abcd12345";

const authentication =(req,res,next)=>{
  const token = req.headers?.authorization?.split(" ")[1];
  if (!token) {
    res.send("please login");
  }
  const decoded = jwt.verify(token, secretKey);
  console.log(decoded); //{ user_id: '675fde7e9d51377d5d48462f', iat: 1734338181 }-->pooja1 token mdhun user_id kadhne

  if (decoded) {
    req.body.user_id = decoded.user_id;
    //{ req.body=pooja1 user mdhli id==decoded token mdhun aleli id same asel//
    //aani ithe route nusar req.body diff asel <---/getProfile...../calculatebmi-->{ heighgt: '5.7', weight: '73', user_id: '675fde7e9d51377d5d48462f' }
    //   name: 'pooja1',
    //   email: 'pooja1@gmail.com',
    //   password: 'pooja1@123',
    //   user_id: '675fde7e9d51377d5d48462f'
    // }
    console.log(req.body); //{ height: '5.7', weight: '73', user_id: '675fc5a74c1026777c112d15' }
    next();
  } else {
    res.send("Please login");
  }
}
module.exports={authentication}
const Admin = require( "../models/admin.js");
const bcrypt = require("bcrypt");

const registerAdmin = async(req,res,next) => {
	try{
		const {username,password} = req.body;
		const user = await Admin.findOne({username});
		console.log(user);
		if(user) 
			return res.status(400)
				.json({"message":"admin already exist"});
		const passhash = await bcrypt.hash(password,10);

		await Admin.create({
			username,password:passhash
		});

		return res.status(200).json({message:"Admin successfully registered"});
	}
	catch(err){
		next(err);
	}
}

const adminLogin = async(req,res,next) => {
	try{
		const {username,password} = req.body;
		const user = await Admin.findOne({username});
		if(!user) return res.status(400).json({message:"Email unknown pls retry"});
		const passcheck = await bcrypt.compare(password,user.password);
		if(!passcheck) return res.status(400).json({message:"Incorrect password"});
		else{
			const option = {httpOnly:true,secure:true}
		const token = user.generateToken();
		return res.status(200)
				.cookie('token',token,option)
				.json({message:"User logged in"})
		}
	}
	catch(err){
		next(err);
	}
}


const authCheck = (req,res,next) => {
try{
const token = req.cookie?.token;
  if(!token) return res.status(400).json({auth:false,
message:"Token not found"
  });
  const passcheck =  jwt.verify(token,process.env.TOKEN_SECRET);
  if(passcheck) return res.status(200).json({auth:true,
message:"User logged in"});
    else return res.status(400).json({auth:false,
message:"Invalid token"
 });

}
catch(err){
next(err);
}
}
module.exports = {authCheck,registerAdmin,adminLogin};

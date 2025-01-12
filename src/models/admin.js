const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const adminSchema = new mongoose.Schema({
	username:{
		type:String,
		required:true,
		unique:true
	},
	password:{
		type:String,
		required:true
	}

});

adminSchema.methods.generateToken = function(){
	const token = jwt.sign({
		username:this.username
	},process.env.TOKEN_SECRET,
		{expiresIn:process.env.TOKEN_EXPIRY})
	return token;	
}

const Admin = mongoose.model("admin",adminSchema);
module.exports = Admin;

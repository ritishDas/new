const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
	name:{
		required:true,
		type:String
	},
	poster:{
		type:String,
		required:true
	},
	winners:[{
		type:mongoose.Schema.Types.ObjectId,
		ref:"participant"
		
	}],
	photos:[{
		type:String
	}],
	rules:[{
		type:String,
		required:true
	}],
	participants:[{
		type:mongoose.Schema.Types.ObjectId,
		ref:"participant"
	
	}],
	venue:{
		type:String,
		required:true
	},
	date:{
		type:Date,
		required:true
	}
});	

const Event = mongoose.model("event",eventSchema);

module.exports = Event;

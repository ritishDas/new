const mongoose = require("mongoose");

async function connect(){
	await mongoose.connect(process.env.MONGO_URL);
	console.log("Mongodb connected !!");
}

module.exports = connect;

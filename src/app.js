require("dotenv").config();
const express = require("express");
const cors = require("cors");

const db = require("./db.js");
const adminroute = require("./routes/admin.js");
const eventroute = require("./routes/event.js");

const app = express();

app.use(cors({
	origin: process.env.CORS_O,
	credentials:true
}));

app.use(express.json());
app.use(express.urlencoded());

app.use("/api/admin",adminroute);
app.use("/api/event",eventroute);

const port = process.env.PORT || 5000;

db().then(app.listen(port,()=>{console.log("server is listening on port: ",port)}));

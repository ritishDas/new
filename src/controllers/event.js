const Event = require("../models/event.js");
const Participant = require("../models/participant.js");
const cloudinary = require("../utils/cloudinary");


const addEvent = async(req,res,next) => {
  try{
    const {name,venue,rules,date} = req.body;
    const {url} = await cloudinary(req.file.path);
    await Event.create({
      name,venue,rules,poster:url,date:new Date(date)});
    return res.status(200).json(
      {message:"New Event added"}
    );
  }

  catch(err){
    next(err);
  }	
}

const fetchEvent = async (req, res, next) => {
  try {
    const events = await Event.findOne({ _id: req.params.id }).populate("participants").populate("winners");
    res.json(events);
  } catch (err) {
    next(err);
  }
};

const allEvent = async (req,res,next) => {
  try{
    const events = await Event.find().select({_id:1,name:1,poster:1,date:1});
    res.status(200).json(events);
  }
  catch(err){
    next(err);
  }
}

const addParticipation = async (req,res,next) => {
  try{
    const data = req.body;
    const participant = await Participant.create({
      name:data.name,email:data.email,year:Number(data.year)
    });
    console.log(participant);
    const event = await Event.findById(req.params.id);
    if(!event) return res.status(404).json({"message":"This event was not found"})

    event.participants.push(participant._id);
    await event.save();
    res.status(200).json({"message":"Your participatin is added for the event"});
  }
  catch(err){
    next(err);
  }

}

const setWinners = async (req,res,next) => {
  try{
    const data = req.body;
    console.log(req.params.id);
    for(let i=0;i<3;i++){
     let ind = await Participant.find({_id:data[i]});
      if(!ind) return res.status(404).json({"message":"winners not valid"});
    }
    const event = await Event.findById(req.params.id);
    if(!event) return res.status(404).json({"message":"This event was not found"})

    event.winners = data;
    await event.save();
    res.status(200).json({"message":"Winners are declared !!!"});
  }
  catch(err){
    next(err);
  }
}

const submitPhotos = async(req,res,next) => {
  try{
const id = req.params.id;
    console.log(id);
  const links = [];
for(let i=0;i<req.files.length;i++){
  const {url} = await cloudinary(req.files[i].path)
links.push(url);
}
const event = await Event.findById(id);
event.photos = links;
await event.save();
return res.json({message:"photos submitted"});
  }
  catch(err){
next(err);
  }
}

module.exports = {setWinners, allEvent, addEvent, fetchEvent, addParticipation,submitPhotos };

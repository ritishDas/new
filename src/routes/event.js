const express = require("express");
const auth = require("../middlewares/auth.js");
const {setWinners,allEvent,addEvent,fetchEvent,addParticipation,submitPhotos} = require("../controllers/event.js");

const multer = require("../middlewares/multer.js");

const router = express.Router();

router.route("/addevent").post(auth,
  multer.single("poster")
  ,addEvent);
router.route("/:id/pics").post(auth,
  multer.array("photos",10)
  ,submitPhotos);
router.route("/allevent").get(allEvent);
router.route("/fetch/:id").get(fetchEvent);
router.route("/:id/addp").post(addParticipation);
router.route("/:id/winner").post(auth,setWinners);

module.exports = router;


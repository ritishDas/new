const express = require("express");
const {registerAdmin,adminLogin,authCheck} = require("../controllers/admin.js");

const router = express.Router();

router.route("/auth").post(authCheck);
router.route("/register").post(registerAdmin);
router.route("/login").post(adminLogin);

module.exports = router;

const express = require("express");
const router = express.Router();
const registerController = require("../controllers/resgisterController");

router.post("/", registerController.handleNewUser);

module.exports = router;

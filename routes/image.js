const express = require("express");
const router = express.Router();
const imageLib = require("../lib/image");

router.post("/resize", imageLib.resizeImage);

module.exports = router;

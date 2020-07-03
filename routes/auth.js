const express = require("express");
const router = express.Router();
const authLib = require("../lib/auth");

router.post("/login", authLib.loginUser);

module.exports = router;

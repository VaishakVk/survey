const express = require("express");
const router = express.Router();
const surveyLib = require("../lib/survey");

router.post("/", surveyLib.createSurvey);
router.get("/stats/:id", surveyLib.getSurveyStats);
router.get("/:id", surveyLib.getSurvey);
router.post("/:surveyId", surveyLib.takeSurvey);

module.exports = router;

const surveyRepo = require("./surveyRepo");
const {
	createSurveySchema,
	takeSurveySchema,
} = require("../../schema/files/survey");
const validator = require("../../schema/validator");

/**
 * @function createSurvey
 * @param {Request} req
 * @param {Response} res
 * @returns API response
 */
const createSurvey = async (req, res) => {
	try {
		const surveyFields = req.body;
		const valid = validator.validate(createSurveySchema, surveyFields);
		if (valid.status) {
			const surveyResponse = await surveyRepo.createSurvey(
				surveyFields.title,
				req.user,
				surveyFields.questions
			);
			return res.status(200).send({
				status: true,
				response: surveyResponse,
			});
		} else {
			return res
				.status(400)
				.send({ status: false, response: valid.message });
		}
	} catch (err) {
		console.log(err);
		return res
			.status(err.status || 500)
			.send({ status: false, response: err.message || err });
	}
};

/**
 * @function getSurvey
 * @param {Request} req
 * @param {Response} res
 * @returns API response
 */
const getSurvey = async (req, res) => {
	try {
		const surveyId = req.params.id;
		if (!surveyId)
			return res
				.status(400)
				.send({ status: false, response: "Survery ID is missing" });
		else {
			const surveyResponse = await surveyRepo.getSurvey(surveyId);
			return res
				.status(200)
				.send({ status: true, response: surveyResponse });
		}
	} catch (err) {
		console.log(err);
		return res
			.status(err.status || 500)
			.send({ status: false, response: err.message || err });
	}
};

/**
 * @function takeSurvey
 * @param {Request} req
 * @param {Response} res
 * @returns API response
 */
const takeSurvey = async (req, res) => {
	try {
		const surveyFields = {
			...req.body,
			surveyId: Number(req.params.surveyId),
		};
		const valid = validator.validate(takeSurveySchema, surveyFields);
		if (valid.status) {
			const surveyResponse = await surveyRepo.takeSurvey(
				req.params.surveyId,
				req.body.questions,
				req.user
			);
			return res.status(200).send({
				status: true,
				response: surveyResponse,
			});
		} else {
			return res
				.status(400)
				.send({ status: false, response: valid.message });
		}
	} catch (err) {
		console.log(err);
		return res
			.status(err.status || 500)
			.send({ status: false, response: err.message || err });
	}
};

/**
 * @function getSurveyStats
 * @param {Request} req
 * @param {Response} res
 * @returns API response
 */
const getSurveyStats = async (req, res) => {
	try {
		const surveyId = req.params.id;
		if (!surveyId)
			return res
				.status(400)
				.send({ status: false, response: "Survey Id is missing" });
		else {
			const surveyResponse = await surveyRepo.getSurveyStats(surveyId);
			return res
				.status(200)
				.send({ status: true, response: surveyResponse });
		}
	} catch (err) {
		console.log(err);
		return res
			.status(err.status || 500)
			.send({ status: false, response: err.message || err });
	}
};

module.exports = {
	createSurvey,
	getSurvey,
	takeSurvey,
	getSurveyStats,
};

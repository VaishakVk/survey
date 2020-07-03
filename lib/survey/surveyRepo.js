const db = require("../../db");

const createSurvey = (title, user, questions) => {
	try {
		return new Promise((resolve, reject) => {
			const now = new Date();
			console.log({ user });
			db.serialize(function () {
				db.run("BEGIN");
				db.run(
					`INSERT INTO survey(title, created_at, created_by) VALUES (?,?,?)`,
					[title, now, user],
					function (err) {
						if (err) {
							console.log(err);
							reject(err);
						}
						const surveyId = this.lastID;
						console.log(surveyId);
						let questionPlaceHolder = questions
							.map(() => "(?, ?, ?)")
							.join(", ");
						const insertQuestions = [];
						questions.forEach((ques) => {
							insertQuestions.push.apply(insertQuestions, [
								surveyId,
								ques.question,
								now,
							]);
						});
						db.run(
							`INSERT INTO survey_question(survey_id, question, created_at) 
                            VALUES ${questionPlaceHolder}`,
							insertQuestions,
							(err) => {
								if (err) {
									console.log(err);
									db.run("ROLLBACK");
									reject(err);
								}
								db.run("COMMIT");
								resolve(surveyId);
							}
						);
					}
				);
			});
		});
	} catch (err) {
		console.log(err);
		throw err;
	}
};

const getSurvey = (surveyId) => {
	try {
		return new Promise((resolve, reject) => {
			db.all(
				`
                SELECT s.id as surveyId, s.title, q.id as questionId, q.question, s.created_by
                FROM survey s,
                survey_question q
                WHERE s.id = q.survey_id
                AND s.id = ?
            `,
				[surveyId],
				(err, rows) => {
					if (err) reject(err);
					resolve(rows);
				}
			);
		});
	} catch (err) {
		console.log(err);
		throw err;
	}
};

const takeSurvey = (surveyId, questions, user) => {
	try {
		return new Promise((resolve, reject) => {
			const now = new Date();
			db.serialize(function () {
				db.run("BEGIN");
				db.all(
					`SELECT id FROM survey_question WHERE survey_id = ?`,
					[surveyId],
					function (err, rows) {
						if (err) {
							console.log(err);
							reject(err);
						}
						const questionIds = rows.map((row) => row.ID);
						questions.forEach((qn) => {
							if (!questionIds.includes(qn.questionId))
								reject({
									status: 400,
									message: `${qn.questionId} is not part of this survey ${surveyId}`,
								});
						});
						let responsePlaceHolder = questions
							.map(() => "(?, ?, ?, ?, ?)")
							.join(", ");
						const insertResponses = [];
						questions.forEach((ques) => {
							insertResponses.push.apply(insertResponses, [
								surveyId,
								ques.questionId,
								ques.option,
								user,
								now,
							]);
						});
						db.run(
							`INSERT INTO survey_response(survey_id, question_id, option, created_by, created_at) 
                            VALUES ${responsePlaceHolder}`,
							insertResponses,
							(err) => {
								if (err) {
									console.log(err);
									db.run("ROLLBACK");
									reject(err);
								}
								db.run("COMMIT");
								resolve("Your vote is recorded");
							}
						);
					}
				);
			});
		});
	} catch (err) {
		console.log(err);
		throw err;
	}
};

const getSurveyStats = (surveyId) => {
	try {
		return new Promise((resolve, reject) => {
			getSurvey(surveyId).then((surveyData) => {
				if (!surveyData || !surveyData.length)
					reject({ status: 400, message: "Survey does not exist" });
				else {
					db.all(
						`
                        SELECT s.id as surveyId, s.title, q.id as questionId, q.question, r.option, COUNT(*) as votes
                        FROM survey s,
                        survey_question q,
                        survey_response r
                        WHERE s.id = q.survey_id
                        AND r.question_id = q.id
                        AND r.survey_id = s.id
                        AND s.id = ?
                        GROUP BY s.id, s.title, q.id, q.question, r.option
                    `,
						[surveyId],
						(err, rows) => {
							if (err) reject(err);
							resolve(rows);
						}
					);
				}
			});
		});
	} catch (err) {
		console.log(err);
		throw err;
	}
};

module.exports = { createSurvey, getSurvey, takeSurvey, getSurveyStats };

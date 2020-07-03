const db = require("../index");
const models = require("../models");
try {
	const modelsKeys = Object.keys(models);
	for (let i = 0; i < modelsKeys.length; i++) {
		let currentQuery = models[modelsKeys[i]];
		db.run(currentQuery);
	}
} catch (err) {
	console.log(err);
	throw err;
}

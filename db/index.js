const sqlite3 = require("sqlite3").verbose();
const path = require("path");

let db = new sqlite3.Database(
	path.join(__dirname, process.env.DATABASE),
	(err) => {
		if (err) {
			console.log("Error connecting to database", err);
			process.exit(0);
		}
		console.log("Connected to Database");
	}
);

module.exports = db;

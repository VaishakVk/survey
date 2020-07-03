const query = `CREATE TABLE
IF NOT EXISTS survey_response
(
   ID INTEGER PRIMARY KEY AUTOINCREMENT,
   question_id INTEGER,
   survey_id INTEGER,
   option INTEGER CHECK (option IN (0,1)),
   created_at TEXT,
   created_by TEXT
)`;

module.exports = query;

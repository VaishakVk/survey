const query = `CREATE TABLE
IF NOT EXISTS survey_question
(
   ID INTEGER PRIMARY KEY AUTOINCREMENT,
   question TEXT,
   survey_id INTEGER,
   created_at TEXT
)
`;

module.exports = query;

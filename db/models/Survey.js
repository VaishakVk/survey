const query = `CREATE TABLE
IF NOT EXISTS survey
(
   ID INTEGER PRIMARY KEY AUTOINCREMENT,
   title TEXT,
   created_at TEXT,
   created_by TEXT
)`;

module.exports = query;

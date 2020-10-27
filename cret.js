const sqlite = require('sqlite3').verbose();

let db = new sqlite.Database('./db/test.db');

db.run(`CREATE TABLE filestest(
	id INTEGER,	
	name TEXT)`);
db.close();


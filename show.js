const sqlite = require('sqlite3').verbose();

let db = new sqlite.Database('./db/test.db');
let sql = `SELECT Id id,Name name FROM filestest ORDER BY name`;

db.all(sql,[], (err,rows) => {
	if(err){
		throw err;
	}
	rows.forEach((row) => {
		console.log(row);
			// .name + " " + row.text);
	});
});

db.close();
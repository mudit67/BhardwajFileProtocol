const sqlite = require('sqlite3').verbose();

let db = new sqlite.Database('./db/test.db');

db.run(`INSERT INTO test1(id,name,pres,description) VALUES(?,?,?,?)`, [1,"mudit",1,"movie"],function(err){
	if (err) {
		console.log(err.message);
	}
	console.log(`A row has been inserted with rowid ${this.lastID}`);
});

// let sql = `SELECT DISTINCT Name name FROM langs ORDER BY name`;

// db.all(sql,[], (err,rows) => {
// 	if(err){
// 		throw err;
// 	}
// 	rows.forEach((row) => {
// 		console.log(row.name + " ");
// 	});
// });

db.close();
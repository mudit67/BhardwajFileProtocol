const express = require('express');
const app = express();
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./db/test.db');

app.use('/',express.static('./client/build/'));

app.listen(8000, () =>{
    console.log("server is running \n");
});

var reqUp = "";
let sql = `SELECT Name name FROM filestest WHERE name = ? ORDER BY name`;
app.get('/search', function (req, res) {
	var flag = true;
	reqUp = req.query.q.toUpperCase();
	console.log(reqUp);
	// for (var i = 0; i < count ; i++ ) {
	// 	if (filesArr[i]==(reqUp)) {
	// 		console.log("Found.");
	// 		res.send(JSON.stringify({ data: req.query.q.toUpperCase() + "\n Found. "}));
	// 		flag = false;
	// 		break;
	// 	}
	// }
	db.each(sql, [reqUp],(err, row) => {
		if(err){
			throw err;
		}
		res.send(JSON.stringify({ data: req.query.q.toUpperCase() + "\n Found. "}));
		flag = false;
		if(flag){
  		res.send(JSON.stringify({ data: req.query.q.toUpperCase()}));
  		}
	});
	
})


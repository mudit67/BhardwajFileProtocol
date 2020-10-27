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
function check (searchParamsUp,searchParams,res,flag,callback) {
	db.each(sql, searchParamsUp,(err, row) => {
		if(err){
			throw err;
		}
		console.log("flag = found")
		flag=false;
		res.send(JSON.stringify({ data: searchParams.query.q.toUpperCase() + "\n Found. "}));
		
	
	});	
	console.log("callback");
	callback(null,searchParams,res,flag);
	
}

// function checkAbsent (searchParams,res,flag){
// 	if(flag){
//   	res.send(JSON.stringify({ data: searchParams.query.q.toUpperCase()}));
//   	console.log(searchParams);
//   	}
// }
app.get('/search', function (req, res) {
	var flag = true;
	reqUp = req.query.q.toUpperCase();
	// for (var i = 0; i < count ; i++ ) {
	// 	if (filesArr[i]==(reqUp)) {
	// 		console.log("Found.");
	// 		res.send(JSON.stringify({ data: req.query.q.toUpperCase() + "\n Found. "}));
	// 		flag = false;
	// 		break;
	// 	}
	// }
	// db.each(sql, [reqUp],(err, row) => {
	// 	if(err){
	// 		throw err;
	// 	}
	// 	res.send(JSON.stringify({ data: req.query.q.toUpperCase() + "\n Found. "}));
	// 	flag = false;
	// 	if(flag){
 //  		res.send(JSON.stringify({ data: req.query.q.toUpperCase()}));
 //  		}
	// });
	
	// check(reqUp,req,res,flag);
	check(reqUp,req,res,(err,searchParams,res,flag) => {
		if(flag){
  			res.send(JSON.stringify({ data: searchParams.query.q.toUpperCase()}));
  			console.log(searchParams);
  		}
	});
	
});


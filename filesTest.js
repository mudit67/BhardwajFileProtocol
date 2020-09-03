const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
let db = new sqlite3.Database('./db/test.db');

var count=1;
fs.readdir('files', (err, files) => {
    if(err){
        console.log("unable to read the directory \"files\"");
    }
    files.forEach(function(file){
        fileUP = file.substring(0,(file.length-4)).toUpperCase();
        db.run(`INSERT INTO filestest(id,name) VALUES(?,?)`, [count, fileUP],function(err){
            if (err) {
                console.log(err.message);
            }
            console.log(`A row has been inserted with rowid ${this.lastID}`);
        });
        count++;
    });
});

var reqUp = "";

app.get('/search', function (req, res) {
	var flag = true;
	reqUp = req.query.q.toUpperCase();
	console.log(reqUp);
	for (var i = 0; i < count ; i++ ) {
		if (filesArr[i]==(reqUp)) {
			console.log("Found.");
			res.send(JSON.stringify({ data: req.query.q.toUpperCase() + "\n Found. "}));
			flag = false;
			break;
		}
	}
	if(flag){
  	res.send(JSON.stringify({ data: req.query.q.toUpperCase()}));
  	}
})

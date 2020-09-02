const express = require('express');
const app = express();
const fs = require('fs');
app.use('/',express.static('./client/build/'));

app.listen(8000, () =>{
    console.log("server is running \n");
});

// app.use('localhost:8000/search?q=:ser', ()=>{
// 	console.log(req.params.ser);
// 	res.statusCode = 200;
// 	res.setHeader('Content-Type', 'JSON');
// 	res.end({Found : true});
// });
var fileUP;
var fileUPe;
var fileLen;
var count = 0;
let filesArr = [];
var listarr = '';
filesJson = [];
fs.readdir('files',(err, files) => {
	if(err){
		console.log("Unable to Read the Directory " + err);
	}
	files.forEach(function (file) {
		// fileUP = file.toUpperCase();
		fileUPe = file.substring(0,(file.length-4)).toUpperCase();
		filesArr[count] = [fileUPe];
		listarr = listarr.concat('\n',fileUPe);
		console.log(fileUPe);
		countstr = count.toString();
		// fileJson = {
		// 	i : fileUPe
		// };
	 filesJson.push(fileUPe);
		count++
	});
	console.log("\n");
});

app.get('/', function (req, res) {
  res.send('hello world')
})
var reqUp = "";
var reqUP

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

app.get('/printarr',(req,res)=>{
		res.send(JSON.stringify({filesJson}));
		console.log(JSON.stringify({filesJson}));	
});
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
		fileUP = file.toUpperCase();
		fileUPe = fileUP.substring(0,(fileUP.length-4))
		filesArr[count] = [fileUPe];
		listarr = listarr.concat('\n',fileUP);
		console.log(fileUPe);
		countstr = count.toString();
		fileJson = {
			i : fileUP
		};
	 filesJson.push(file);
		count++
	});
	console.log("\n");
});

app.get('/', function (req, res) {
  res.send('hello world')
})
var reqUp = "";
// var reqUP remove this 
app.get('/search', function (req, res) {
	reqUp = req.query.q.toUpperCase();
	console.log(reqUp);
	var respArr =[]
	for (var i = 0; i < count ; i++ ) {
		if (filesArr[i].match(reqUp)) {
			console.log("Found.");
			respArr.push(filesArr[i])
			// res.send(JSON.stringify({ data: req.query.q.toUpperCase() + "\n Found. "})); // you should only send response once 
			break;
		}
	}
//   res.send(JSON.stringify({ data: req.query.q.toUpperCase()}));// why are you still sending this 
  	res.send(JSON.stringify(respArr));// why are you still sending this 
})

app.get('/printarr',(req,res)=>{
		res.send(JSON.stringify({filesJson}));
		console.log(JSON.stringify({filesJson}));	
});
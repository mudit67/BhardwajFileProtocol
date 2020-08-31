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
		filesArr[count] = [fileUP];
		listarr = listarr.concat('\n',fileUP);
		console.log(fileUP);
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
app.get('/search', function (req, res) {
	console.log(req.query)
	//  some  dumm ylogic 
	
  res.send(JSON.stringify({ data:req.query.q.toUpperCase()}));
})

app.get('/printarr',(req,res)=>{
		res.send(JSON.stringify({filesJson}));
		console.log(JSON.stringify({filesJson}));	
});
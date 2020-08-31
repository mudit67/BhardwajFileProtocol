const express = require('express');
const app = express();
app.use('/',express.static('./client/build/'));

app.listen(8000, () =>{
    console.log("server is running");
});

// app.use('localhost:8000/search?q=:ser', ()=>{
// 	console.log(req.params.ser);
// 	res.statusCode = 200;
// 	res.setHeader('Content-Type', 'JSON');
// 	res.end({Found : true});
// });


app.get('/', function (req, res) {
  res.send('hello world')
})
app.get('/search', function (req, res) {
	console.log(req.query)
	//  some  dumm ylogic 
	
  res.send(JSON.stringify({ data:req.query.q.toUpperCase()}))
})
const express = require("express");
const _ = require("./backendjobs")
const app = express();
const fs = require("fs");
const path = require('path');
const formidable = require("formidable");

app.use("/", express.static("./client/build"));
app.use("/files", express.static("./files"));

app.listen(8000, () => {
  console.log("server is running \n");
});

let filesArr = [];
filesJson = [];
setInterval(() => {
  fs.readdir("files", (err, files) => {
    if (err) {
      console.log("Unable to Read the Directory " + err);
    }

    filesArr = files;
  });
}, 2000);

app.get("/search", function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  var regex = new RegExp(req.query.q, "i");
  var numberOfSearchResults = req.query.l;
  var matchedFiles = filesArr.filter((obj) => obj.substring(0,obj.length-4).match(regex));
  if (numberOfSearchResults) {
    matchedFiles = matchedFiles.slice(0,numberOfSearchResults);
  }
  res.send(matchedFiles);
});

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With,X-metadata');
    res.header('Access-Control-Expose-Headers': 'content-type', 'content-disposition', 'x-metadata');
})
// app.options('*', cors({
//   origin: '*',
//   methods: [ 'GET', 'POST' ],
//   allowedHeaders: [ 'content-type', 'authorization', 'x-metadata', 'x-to' ],
//   exposedHeaders: [ 'content-type', 'content-disposition', 'x-metadata' ],
//   optionsSuccessStatus: 200
// }));

app.post("/uploadFile", function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    console.log("yash file received");
    var oldpath = files.file.path;
    var newpath = "./files/" + files.file.name;
    fs.rename(oldpath, newpath, function (err) {
      if (err) {
        console.log(err)
        res.send("can upload :SAD:");
      }else{
        res.send("File uploaded and moved! :happy: ");
      }
    });
  });

});

app.get("/printarr", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send(JSON.stringify({ filesJson }));
  console.log(JSON.stringify({ filesJson }));
});

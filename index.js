const express = require("express");
const _ = require("./backendjobs")
const app = express();
const fs = require("fs");
const path = require('path');
const formidable = require("formidable");
const checkIfFile = path => fs.lstatSync(path).isFile();
const filesDir = "/home/agent67/Downloads/"; // Use absolute path
app.use("/", express.static("./client/build"));
app.use("/files", express.static(filesDir));

app.listen(8000, () => {
  console.log("server is running on 8000");
});
let filesArr = [];
filesJson = [];
setInterval(() => {
  let filesArrTemp = [];
  fs.readdir(filesDir, (err, files) => {
    if (err) {
      console.log("Unable to Read the Directory " + err);
    }
    files.forEach(file => {
      if (checkIfFile(path.join(filesDir,file))) {
        filesArrTemp = filesArrTemp.concat(file);
        // console.log(file);
        // console.log(filesArrTemp);
      }
      else {
        filesArrTemp = filesArrTemp.concat(returnDaughterFiles(file));
      }
    });
    filesArr = filesArrTemp;
  });
}, 2000);
// setTimeout(() => {  console.log(filesArrTemp);},2000);
function returnDaughterFiles(dirToCheck) { //function to return all the files present in the dirToCheck Directory and all sub-directory
  let ReturnArr = []; // temporary arr to hold all files in dirToCheck and also in its sub-folders
  let contents = []; // temporary arr to hold files and folder contained in dirToCheck and not in its sub-folders maxDepth=0
  try {
    contents = fs.readdirSync(path.join(filesDir,dirToCheck));
  } catch (err) {
    console.log(err);
  }
  contents.forEach(file => {
    if (fs.lstatSync(path.join(filesDir,dirToCheck, file)).isFile()) { //check if "file" is a file or not
      ReturnArr.push(path.join(dirToCheck, file));
    }
    else {
      ReturnArr.push(...returnDaughterFiles(path.join(dirToCheck, file)));
    }
  });
  return (ReturnArr);
}
app.get("/search", function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  var regex = new RegExp(req.query.q, "i");
  var numberOfSearchResults = req.query.l;
  var matchedFiles = filesArr.filter((obj) => obj.substring(0, obj.length - 4).match(regex));
  if (numberOfSearchResults) {
    matchedFiles = matchedFiles.slice(0, numberOfSearchResults);
  }
  res.send(matchedFiles);
});

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With,X-metadata');
  res.header('Access-Control-Expose-Headers', 'content-type', 'content-disposition', 'x-metadata');
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
      } else {
        res.send("File uploaded and moved! :happy: ");
      }
    });
  });

});

app.get("/printarr", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send(JSON.stringify({ filesArr }));
  console.log(JSON.stringify({ filesArr }));
});

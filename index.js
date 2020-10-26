const express = require("express");
const jobs = require("./backendjobs");
const formidable = require("formidable");
const app = express();
const fs = require("fs");
app.use("/", express.static("./client/build/"));
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

// app.get("/", function (req, res) {
//   res.send("hello world");
// });

app.get("/search", function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  var regex = new RegExp(req.query.q, "i");
  var matchedFiles = filesArr.filter((obj) => obj.match(regex));
  res.send(matchedFiles);
});

app.post("/uploadFile", function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    console.log("yash file received");
    console.log("newpath", files);
    var oldpath = files.file.path;
    var newpath = "./files/" + files.file.name;
    fs.rename(oldpath, newpath, function (err) {
      if (err) throw err;
      res.send("File uploaded and moved!");
      res.end();
    });
  });

  console.log(req.data);
  res.send("matchedFiles");
});

app.get("/printarr", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send(JSON.stringify({ filesJson }));
  console.log(JSON.stringify({ filesJson }));
});

app.get("/list.js", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send(JSON.stringify(filesArr));
});

const fs = require('fs');
const express = require("express");
const app = express();
app.use(express.static("."));

var server = app.listen(8000, () => {
    console.log("");
  });

  app.get("/filelist", (req, res) => {
    res.send(musicLibrary);
  });   
 // server running code ends

// code to read directory for media files


fs.readdir("./", (err, list) => {
    musicLibrary = list;
    console.log(musicLibrary);
  });

  function readfiles()
{
  document.getElementById("musicLibrary").innerHTML = musicLibrary;
  console.log(musicLibrary);
}
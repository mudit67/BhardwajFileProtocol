import { readdir } from "fs";
var vid = document.getElementById("myf");
function myf() {
    
    
       vid.src = "./Kaksha Gyarvi.mkv"
}


function myf2() {
    vid.src = "./Movies Arena/Man of Steel/Man of Steel.mp4";
}


readdir("./", (err, list) => {
    musicLibrary = list;
    console.log(musicLibrary);
  });
  app.get("/filelist", (req, res) => {
    res.send(musicLibrary);
  });

 var libfile = getElementById("musicLibrary");
 libfile = musicLibrary;

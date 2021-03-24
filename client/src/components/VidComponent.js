// this handles all the videos
import React, { useEffect, useRef, useState } from 'react';


const VidComponent = (props) => {
	// console.log(this.props.srcName);
	// main player
	const videoRef= useRef();
	const [playbackRate, setPlaybackRate] = useState();
	useEffect(() => {
		videoRef.current.playbackRate = playbackRate;
		videoRef.current.onkeydown = function(e) {
			// console.log(e);
			if(e.which === 38 && videoRef.current.volume !== 1){
				videoRef.current.volume+=0.05;
				// videoRef.current.volume=0;
			}
			else if(e.which === 40 && videoRef.current.volume !== 0){
				videoRef.current.volume-=0.05;
			}
			else if(e.which === 37){
				e.preventDefault();
				videoRef.current.currentTime-=5.0;
			}
			else if(e.which === 39){
				e.preventDefault();
				videoRef.current.currentTime+=5.0;
			}
			else if(e.which === 70){
				var elem = videoRef.current;
				if (elem.requestFullscreen) {
					elem.requestFullscreen();
				} else if (elem.webkitRequestFullscreen) { /* Safari */
					elem.webkitRequestFullscreen();
				  } else if (elem.msRequestFullscreen) { /* IE11 */
					elem.msRequestFullscreen();
				  }
				  if(document.fullscreenElement) {
					document.exitFullscreen();
				  }
				
			}
			else if(e.which === 75){
				e.preventDefault();
				toggle();
			}
		}
	 }, 
	 [playbackRate]);
	 if(!playbackRate){
		 setPlaybackRate(1);
	 }
	 const setPlayBack = (e) => {
		setPlaybackRate(e.target.value);
	  };
	  if(videoRef.current){
		  console.log(videoRef.current);
		  console.log(videoRef.current.fullscreenElement);
		}
	  const toggle = () => {
		  if(videoRef.current.paused){
			  videoRef.current.play()
		  }
		  else{
			videoRef.current.pause()
		  }
	  }
	// //   console.log(videoRef.addEventListener);
	// document.getElementById('videoFrame').onkeypres = function(e){
	// 	console.log(e);
	// }
	return(
		<div className="container">
			<div className="row" >
				<div className="col-12 col-md-7">
					<div className="frame-container">
						<video ref={videoRef} id="videoFrame" className="playerframe" title={props.srcName} src={`${window.backendUrl}/files/${props.srcName}.mp4`} allowFullScreen controls autoPlay={true} volume={0.5}/>
					</div>
				</div>
			</div>
			<h3 style={{color:"white",marginTop:"1rem"}}>
				{props.srcName.substring(props.srcName.lastIndexOf('/')+1)}
			</h3>
			<form>
				<input onChange={setPlayBack} type="range" value={playbackRate} min="0.5" max="4" step="0.1" />
			</form>
			<div style={{color:"white"}}>
				{playbackRate}
			</div>
			<button onClick={toggle}>
				toggle
			</button>
		</div>
	);
}
export default VidComponent;
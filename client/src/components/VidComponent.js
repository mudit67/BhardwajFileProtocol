// this handles all the videos
import React from 'react';


const VidComponent = (props) => {
	// console.log(this.props.srcName);
	return(
		// main player
		<div className="container">
			<div className="row" >
				<div className="col-12 col-md-7">
						<div className="frame-container">
							<iframe className="playerframe" title={props.srcName} src={`http://localhost:8000/files/${props.srcName}.mp4`} allowFullScreen />
						</div>
				</div>
			</div>
		</div>
	);
}

export default VidComponent;

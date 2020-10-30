// this handles all the videos
import React from 'react';


const VidComponent = (props) => {
	// console.log(this.props.srcName);
	// main player
	return(
		<div className="container">
			<div className="row" >
				<div className="col-12 col-md-7">
						<div className="frame-container">
							<iframe className="playerframe" title={props.srcName} src={`${window.backendUrl}/files/${props.srcName}.mp4`} allowFullScreen />
						</div>
				</div>
			</div>
		</div>
	);
}

export default VidComponent;

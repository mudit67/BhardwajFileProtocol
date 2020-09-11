import React from 'react';
import {Player} from 'video-react';

const VidComponent = (props) => {
	return(
		<div className="container">
			<div className="row" >
				<div className="col-6 offset-2">
					<div className="col"></div>
					<div className="col offset-1 mt-5">
						<Player fluid={false} >
							<source src={`http://localhost:8000/files/${props.srcName}.mp4`} />
						</Player>
					</div>
				</div>
				<div className="col"></div>
			</div>
		</div>
	);
};

export default VidComponent;
import React from 'react';
import {Player} from 'video-react';

const VidComponent = (props) => {
	return(
		<Player>
			<source src={`http://localhost:8000/files/${props.srcName}.mp4`} />
		</Player>
	);
};

export default VidComponent;
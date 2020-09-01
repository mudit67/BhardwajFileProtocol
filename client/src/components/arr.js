import React from 'react';	
class Arr extends React.Component {
    render() {
	    if(this.props.filesJson!=null)
	    {
	        this.props.filesJson.map((file) => {
	    	    return(
	        	    <div key={file.id}>
	            	  {file.data}
	            	</div>
	            );
	        });
	    }
	    else{
	    	return(
	        	<div>
	        	</div>
	        );
	    }
	}
}

export default Arr;
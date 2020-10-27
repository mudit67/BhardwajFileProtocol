import React from 'react';	
// class Arr extends React.Component {
//     constructor(props){
//     	super(props);
//     };
//     const strArr = (props) => {
// 	    	if (len>0){
// 		    	for (var i = 0; i < len; i++) {
// 		    		return(
// 		    			<>
// 		    				this.props.filesJson[i]
// 		    				<br/>
// 		    			</>
// 		    		);	    		
// 		    	}
// 	    	}	
// 	};
// 	var len = this.props.filesJson.length;
//     render() {
    	
// 	    //if(this.props.filesJson!=null)
// 	    //{
// 	        // this.props.filesJson.map((file) => {
// 	    	   //  return(
// 	        // 	    <div >
// 	        //     	  {file}
// 	        //     	</div>
// 	        //     );
// 	        //     // console.log({file});
// 	        // });
// 	    //}
// 	 	//var str1="";
	    
	    
// 		console.log(strArr);
// 	    return(
// 	       	<>
// 		       	<div>
// 		       		this is arr-element
// 		       		{strArr}
// 		       	</div>
// 	       	</>
// 	    );
// 	};
// }
const Arr = (props) => {
	var arr;
	console.log(props.filesJson.length);
	if (props.filesJson.length>0) {
		arr = props.filesJson.map((file, index) => {
			return(
			<div key={index}>
				<ul>{file}</ul>
			</div>
			);
		});		
	}
	
	return(
		<div>{arr}</div>
	);
	


};
 export default Arr;


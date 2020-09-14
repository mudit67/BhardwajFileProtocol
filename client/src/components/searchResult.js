import React from 'react';

const SearchResult = (props) => {
	// console.log("searchResult is running");
	console.log(props.response);
	var result = props.response.map((Val,index) => {
		return(
			<div key={index} className="row">
				&nbsp;&nbsp;{Val.substring(0, Val.length - 4)}
			</div>
		);
	});
	
	
	return(<div>{result}</div>);
	
}

export default SearchResult;
import React from 'react';
import { withRouter } from "react-router-dom";

// const redirectToPlayer = (props,videoName) => {
// 	// props.history.push("/player/" + (videoName) );
// 	debugger
// 	console.log(this);
// 	console.log(videoName);
//
// }
//
// const SearchResult = (props) => {
// 	// console.log(props.response);
//
// 	var result = props.response.map((Val,index) => {
// 		// debugger
// 		var Val2 = Val.substring(0, Val.length - 4);
// 		return(
// 			<div key={index} className="row" onClick={redirectToPlayer.bind(props,Val2)}>
// 				&nbsp;&nbsp;{Val2}
// 			</div>
// 		);
// 	});
// 	return(<div>{result}</div>);
//
// }

class SearchResult extends React.Component {
	constructor(props){
	  super(props);
	  this.state={
			respVal: []
		};
	}
	shouldComponentUpdate(nextProps, nextState){
	  if(nextProps.searchVal!==this.props.searchVal){
			return(true);
		}
			else{
				return(false);
			}
	}
	componentDidMount(){
		fetch ('http://localhost:8000/searchall?q=' + this.props.searchVal)
		.then((response) => response.json())
		.then((data) => {
					// console.log(data + "\n\ncomponentDidMount");
					this.setState({ respVal: data });
					// this.forceUpdate();
					// console.log(this.state.respVal + "\n\nrespVal");
		});
	}
	// componentDidUpdate(prevProps, prevState, snapshot){
	// 	if(prevProps.searchVal!==this.props.searchVal){
	// 		fetch ('http://localhost:8000/searchall?q=' + this.props.searchVal)
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 					// console.log(data);
	// 					if(this.state.respVal!==data){
	// 						this.setState({ respVal: data });
	// 						this.forceUpdate();
	// 					}
	// 		});
	// 	}
	// }

	render(){
		const searchResponse = (searchVal) => {
			fetch ('http://localhost:8000/searchall?q=' + this.props.searchVal)
			.then((response) => response.json())
			.then((data) => {
							data.map((Val,index) => {
								return(
									<div key={index} >
										{Val}
									</div>
								);
							})
			});
		}
		console.log("render is invoked");
		// const searchResult = searchResponse.map((Val,index) => {
		// 	return(
		// 		<div key={index} >
		// 			{Val}
		// 		</div>
		// 	);
		// });
	  return(
	    <div className="container">
				{searchResponse}
	    </div>
	  )
	}

}

export default withRouter(SearchResult);

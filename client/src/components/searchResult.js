import React from 'react';
import { withRouter } from "react-router-dom";

class SearchResult extends React.PureComponent {
	constructor(props){
		super(props);
		this.state={
			respVal: []
		};
		this.getData = this.getData.bind(this);
	}
	componentDidMount(){
		this.getData();
	}
	getSnapshotBeforeUpdate(prevProps, prevState){
		if(prevProps.searchVal!==this.props.searchVal){
			this.getData();
		}
		return(null);

	}
	getData(){
		// console.log("get data");
		fetch ('http://localhost:8000/searchall?q=' + this.props.searchVal)
		.then((response) => response.json())
		.then((data) => {
					// console.log(data + "\n\ncomponentDidMount");
					this.setState({ respVal: data });
					// this.forceUpdate();
					// console.log(this.state.respVal + "\n\nrespVal");
		});
	}
	redirectToPlayer(name,e){
		e.preventDefault();
		var page = `/player/${name}`
    this.props.history.push(page);
	}
	render(){
		// console.log("render is invoked\n\n" + this.state.respVal);
		var searchResponse = [];
		searchResponse = this.state.respVal.map((Val,index) => {
				// console.log(Val);
				return(
					<a
						className="row"
						type="button"
						href={`/player/${Val.substring(0,Val.length - 4)}`}
						key={index}
						onClick={(e) => {this.redirectToPlayer(Val.substring(0,Val.length - 4),e)}}
						>
						{Val.substring(0,Val.length - 4)}
					</a>
				);

			});
	  return(
	    <div className="container">
				{searchResponse}
	    </div>
	  )
	}

}

export default withRouter(SearchResult);

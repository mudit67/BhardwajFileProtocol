import React from 'react';
// import { withRouter } from "react-router-dom";
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
		fetch ('http://localhost:8000/search?q=' + this.props.searchVal)
		.then((response) => response.json())
		.then((data) => {
					this.setState({ respVal: data });
		});
	}
	redirectToPlayer(name,e){
		e.preventDefault();
		// var page = `/player/${name}`
    // this.props.history.push(page);
		this.props.redirectCallback("player",name);
	}
	render(){
		var searchResponse = [];
		searchResponse = this.state.respVal.map((Val,index) => {
				return(
					<a
						className="row nav-button search-result ml-2 mb-1"
						type="button"
						href={`/player/${Val.substring(0,Val.length - 4)}`}
						key={index}
						onClick={(e) => {this.redirectToPlayer(Val.substring(0,Val.length - 4),e)}}
						>
						{Val.substring(0,Val.length - 4)}
					</a>
				);
			});
	  return (
	    <div>
				{searchResponse}
	    </div>
	  );
	}
}
export default SearchResult;

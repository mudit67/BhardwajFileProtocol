import React from "react";
import { Nav, Container, Col, Row,Dropdown, DropdownToggle, DropdownMenu, DropdownItem  } from "reactstrap";
import {withRouter} from 'react-router-dom';


class Search extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			respVal: [],
			vidName: null
		};
	this.debounceTimeout = 0;
    this.handleChange = this.handleChange.bind(this);
    this.logArr = this.logArr.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateList = this.updateList.bind(this);
    // this.redirectToPlayer = this.redirectToPlayer.bind(this);
	}
	handleSubmit(e) {
    e.preventDefault();
    //this.sendRequest();
    if((this.state.searchVal + ".mp4")===(this.state.respVal[0])){
      this.props.parentCallback(this.state.searchVal);
       this.props.history.push("/player");
      console.log(this.state.vidName);
    }
   console.log(this.state.respVal[0]);
   console.log(this.state.searchVal + ".mp4");
  }

  updateList(){
    // this is debounced update list 
    clearTimeout(this.debounceTimeout)
    this.debounceTimeout = setTimeout(()=>{
      fetch("http://localhost:8000/search?q=" + this.state.searchVal)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({ respVal: data });
      });  
    }, 1000 /*this the wait interval before sending call to backend*/)
  }

  handleChange(event) {
    this.setState({ searchVal: event.target.value });
    this.updateList()
  }
  logArr() {
    fetch("http://localhost:8000/printarr")
      .then((response) => response.json())
      .then((data) => {
        let dataArr = Object.entries(data);
        this.setState({ serResArr: dataArr[0][1] });
        console.log( "state = "+ this.state.serResArr);
      });
  }
  redirectToPlayer(videoName) {
  	this.props.parentCallback(videoName.substring(0,videoName.length -4));
  	this.props.history.push("/player");

  }
  render() {
    const respVal = this.state.respVal;
    var rows = [];
    rows = respVal.map((Val, index) => {
    	return(
    	<DropdownItem key={index} type="button" className="btn" onClick={this.redirectToPlayer.bind(this, Val)}>
   		 		{Val.substring(0,Val.length -4)}
    	</DropdownItem>
    	);
    });
    return (
	      <>
	        <Nav className="offset-1 mt-5">
	          <form onSubmit={this.handleSubmit}> 
	          
	          <label htmlFor="search">Search</label>
	          <button
	            type="button"
	            onClick={this.logArr}
	            style={{ marginLeft: 1 + "em" }}
	          >
	            Print
	          </button>
	        </form>
	        </Nav>
	        <Container>
	          <Row>
	            <Col>
	            	
	            	
	            </Col>
	          </Row>
	          <Row>
	          </Row>
	          <Row>
	            <div className="col-8 offset-2">
	           		<Col>
	          	<input
	            type="search"
	            placeholder="Search..."
	            id="search"
	            value={this.state.searchVal}
	            onChange={this.handleChange}
	            onSubmit={this.handleSubmit}
	          	className="col-4"
	          	/>
	          	<Dropdown isOpen={true}>
	          	<DropdownToggle className="d-none" />
	          	  <DropdownMenu className="col-4" style={{position: "realtive"}}> 	
	          	   	{rows}
			      </DropdownMenu>
		       	</Dropdown>
		       </Col>
	          <button
	            type="button"
	            onClick={(e) => {
	              this.handleSubmit(e);
	            }}
	            className= "m-1 search-button"
	          >
	            Search
	          </button>
	            </div>
	          </Row>
	        </Container>

	      </>
    	);
	}
}

export default withRouter(Search);
// <div class="dropdown" isOpen={true} toggle={() => {return(true);}}  inNavbar= {true} nav={true} className="list-unstyled">
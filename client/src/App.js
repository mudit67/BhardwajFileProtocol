import React from "react";
import {Switch, Redirect, Route,BrowserRouter} from "react-router-dom";
// import { Nav, Container, Col, Row } from "reactstrap";
// import Arr from "./components/arr.js";
import Search from './components/search.js';
import VidComponent from './components/VidComponent.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // searchVal: "",
      // respVal: [],
      // serResArr: [],
      vidName: null,
      redirect: false
    };
    // this.debounceTimeout =0
    // this.handleChange = this.handleChange.bind(this);
    // this.logArr = this.logArr.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.updateList = this.updateList.bind(this);
    // function callbackVid (srcName)=> {
    //   this.setState({vidName: srcName});
    //   console.log(this.state.vidName);
    // };
  }
  // handleSubmit(e) {
  //   e.preventDefault();
  //   //this.sendRequest();
  //   if((this.state.searchVal + ".mp4")===(this.state.respVal[0])){
  //     this.setState({vidName:this.state.searchVal });
  //     console.log(this.state.vidName);
  //   }
  //  console.log(this.state.respVal[0]);
  //  console.log(this.state.searchVal + ".mp4");
  // }

  // updateList(){
  //   // this is debounced update list 
  //   clearTimeout(this.debounceTimeout)
  //   this.debounceTimeout = setTimeout(()=>{
  //     fetch("http://localhost:8000/search?q=" + this.state.searchVal)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       this.setState({ respVal: data });
  //     });  
  //   }, 1000 /*this the wait interval before sending call to backend*/)
  // }

  // handleChange(event) {
  //   this.setState({ searchVal: event.target.value });
  //   this.updateList()
  // }
  // logArr() {
  //   fetch("http://localhost:8000/printarr")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       let dataArr = Object.entries(data);
  //       this.setState({ serResArr: dataArr[0][1] });
  //       console.log( "state = "+ this.state.serResArr);
  //     });
  // }

  // // handleSearchChange(event) {
  // //   this.setState({ searchVal: event.target.value });
  // // }

  // // sendRequest() {
  // //   fetch("http://localhost:8000/search?q=" + this.state.searchVal)
  // //     .then((response) => response.json())
  // //     .then((data) => {
  // //       console.log(data.data);
  // //       this.setState({ respVal: data.data });
  // //     });
  // // }

  // render() {
  //   const respVal = this.state.respVal;
  //   var rows = [];
  //   for (var i = 0; i < respVal.length; i++) {
  //     rows.push(<li>{respVal[i]}</li>);
  //   }
  //   // const vidName="Mudit";
  //   return (
  //     <>
  //       <Nav className="offset-1 mt-5">
  //         <form onSubmit={this.handleSubmit}> 
  //         <label htmlFor="search">Search</label>
  //         <input
  //           type="search"
  //           placeholder="Search..."
  //           id="search"
  //           value={this.state.searchVal}
  //           style={{ marginLeft: 1 + "em" }}
  //           onChange={this.handleChange}
  //           onSubmit={this.handleSubmit}
  //         />

  //         <button
  //           type="button"
  //           onClick={(e) => {
  //             this.handleSubmit(e);
  //           }}
  //           style={{ marginLeft: 1 + "em" }}
  //         >
  //           Search
  //         </button>
  //         <button
  //           type="button"
  //           onClick={this.logArr}
  //           style={{ marginLeft: 1 + "em" }}
  //         >
  //           Print
  //         </button>
  //       </form>
  //       </Nav>
  //       <Container>
  //         <Row>
  //           <Col>{rows}</Col>
  //         </Row>
  //         <Row>
  //           <Arr filesJson={this.state.serResArr} />
  //         </Row>
  //         <Row>
  //           <div className="col-8 offset-2">
  //             <VidComponent srcName={this.state.vidName} />
  //           </div>
  //         </Row>
  //       </Container>

  //     </>
  //   );
  // }
  render() {
    return(
      <BrowserRouter>
        <div>
          <Switch>
            
              <Route path="/player" component={() => <VidComponent srcName={this.state.vidName}/>}/>
              <Route path='/search' component={() => <Search parentCallback = {(callbacksrc) => {this.setState({vidName: callbacksrc, redirect:true}); console.log(this.state.vidName);}  }/> }/>
              <Redirect to='/search'/>
          </Switch>
        </div>
      </BrowserRouter>
      
    );
  };
}

export default App;

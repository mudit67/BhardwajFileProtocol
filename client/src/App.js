import React from 'react';
import {Nav} from 'reactstrap';
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchVal: null,
      respVal:""
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event){
    // console.log(this.state.searchVal);
    this.setState({searchVal: event.target.value});
  };
  sendRequest(){
    // debugger

    var resp     
    fetch('http://localhost:8000/search?q='+this.state.searchVal)
    .then(response => response.json())
    .then((data)=> {console.log(data);this.setState({respVal:data.data})} );
  }
  render(){
    const { searchVal,respVal } = this.state;
    return (
      <>
        <Nav>
          <form>
            <pre>
              <label htmlFor="search">Search</label> 
              <input type="search" placeholder="Search..." id="search" onChange={this.handleChange} style={{marginLeft: 1 + 'em'}}/>
            </pre>
             
              <button type="button" onClick={(e) => {this.sendRequest(e)}}> search </button>
            {respVal}
          </form>
        </Nav>
        
      </>
    );
  }  
}

export default App;

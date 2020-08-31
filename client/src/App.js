import React from 'react';
import {Nav} from 'reactstrap';
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchVal: null,
      respVal:"",
      serResArr:[]
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event){
    // console.log(this.state.searchVal);
    this.setState({searchVal: event.target.value});
  };
  logArr(){
    fetch('http://localhost:8000/printarr')
    .then(response => response.json())
    .then((data) => 
      {
        let dataArr = Object.entries(data);
        console.log(dataArr);
        this.setState({ serResArr: dataArr.filesJson})
      } 
    );
  }
  sendRequest(){
    
    fetch('http://localhost:8000/search?q='+this.state.searchVal)
    .then(response => response.json())
    .then((data)=> 
      {
        console.log(data);
        this.setState({respVal:data.data})
      } 
    );
  }
  render(){
    const {respVal } = this.state;
    return (
      <>
        <Nav>
          <form>
            <pre>
              <label htmlFor="search">Search</label> 
              <input type="search" placeholder="Search..." id="search" onChange={this.handleChange} style={{marginLeft: 1 + 'em'}}/>
            </pre>
             
              <button type="button" onClick={(e) => {this.sendRequest(e)}}> search </button>
              <button type="button" onClick={this.logArr}> Print </button>
            {respVal}
          </form>
        </Nav>
        
      </>
    );
  }  
}

export default App;

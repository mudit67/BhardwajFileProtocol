import React from 'react';
import {Nav} from 'reactstrap';
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchVal: null
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event){
    console.log(this.state.searchVal);
    this.setState({searchVal: event.target.value});
  };
  render(){
    return (
      <>
        <Nav>
          <form>
            <pre>
              <label htmlFor="search">Search</label> 
              <input type="search" placeholder="Search..." id="search" onChange={this.handleChange} style={{marginLeft: 1 + 'em'}}/>
            </pre>
          </form>
        </Nav>
        <h1>
          This is working again.<br/>
          After Yarn Build.
        </h1>
      </>
    );
  }  
    
}

export default App;

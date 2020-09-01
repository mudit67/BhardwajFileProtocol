import React from 'react';
import {Nav,Container,Col,Row} from 'reactstrap';
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchVal: null,
      respVal:"",
      serResArr:[]
    };
    this.handleChange = this.handleChange.bind(this);
    this.logArr = this.logArr.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this)
  }
  handleSubmit(e){
    e.preventDefault();
    this.sendRequest();
  };
  handleChange(event){
    this.setState({searchVal: event.target.value});
  };
  logArr(){
    fetch('http://localhost:8000/printarr')
    .then(response => response.json())
    .then((data) => 
      {
        let dataArr = Object.entries(data);
        console.log(dataArr);
        this.setState({ serResArr: dataArr.filesJson});
      } 
    );
  }
  sendRequest(){
    
    fetch('http://localhost:8000/search?q='+this.state.searchVal)
    .then(response => response.json())
    .then((data)=> 
      {
        console.log(data.data);
        this.setState({respVal:data.data})
      } 
    );
  }
  render(){
    const {respVal } = this.state;
    const filesArray = () => {
      if(this.state.serResArr!=null){
        this.state.serResArr.map((file) => {
          return(
            <div key={file.id}>
              {file.data}
            </div>
            );
        });
        }
        else{
          return(
          <div></div>
          );
        }
      };   
    return (
      <>
        <Nav className="offset-1 mt-5">
          <form onSubmit={this.handleSubmit}>
              <label htmlFor="search">Search</label> 
              <input type="search" placeholder="Search..." id="search" 
              onChange={this.handleChange} style={{marginLeft: 1 + 'em'}} 
              onSubmit={this.handleSubmit}/>             
              <button type="button" onClick={(e) => {this.sendRequest(e)}} 
              style={{marginLeft: 1 + 'em'}}>
               search </button>
              <button type="button" onClick={this.logArr} 
              style={{marginLeft: 1 + 'em'}} > Print </button>
          </form>
        </Nav>
        <Container>
          <Row>
            <Col>
              {respVal}
            </Col>
          </Row>  
          <Row>
            {filesArray}
          </Row>
        </Container>
      </>
    );
  }  
}

export default App;

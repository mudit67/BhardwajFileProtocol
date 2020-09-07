import React from "react";
import { Nav, Container, Col, Row } from "reactstrap";
import Arr from "./components/arr.js";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchVal: "",
      respVal: [],
      serResArr: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.logArr = this.logArr.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateList = this.updateList.bind(this);
    this.debounce = this.debounce.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.sendRequest();
  }
  debounce(func, wait, immediate) {
    var timeout;
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  }

  updateList(){
    fetch("http://localhost:8000/search?q=" + this.state.searchVal)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      this.setState({ respVal: data });
    });
  }

  handleChange(event) {
    this.setState({ searchVal: event.target.value });
    this.debounce(this.updateList,1000)
  }
  logArr() {
    fetch("http://localhost:8000/printarr")
      .then((response) => response.json())
      .then((data) => {
        let dataArr = Object.entries(data);
        this.setState({ serResArr: dataArr[0][1] });
        console.log(this.state.serResArr);
      });
  }

  handleSearchChange(event) {
    this.setState({ searchVal: event.target.value });
  }

  sendRequest() {
    fetch("http://localhost:8000/search?q=" + this.state.searchVal)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        this.setState({ respVal: data.data });
      });
  }

  render() {
    const respVal = this.state.respVal;
    var rows = [];
    for (var i = 0; i < respVal.length; i++) {
      rows.push(<li>{respVal[i]}</li>);
    }
    return (
      <>
        <Nav className="offset-1 mt-5">
          {/* <form onSubmit={this.handleSubmit}> */}
          <label htmlFor="search">Search</label>
          <input
            type="search"
            placeholder="Search..."
            id="search"
            value={this.state.searchVal}
            style={{ marginLeft: 1 + "em" }}
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
          />

          <button
            type="button"
            onClick={(e) => {
              this.sendRequest(e);
            }}
            style={{ marginLeft: 1 + "em" }}
          >
            Search
          </button>
          <button
            type="button"
            onClick={this.logArr}
            style={{ marginLeft: 1 + "em" }}
          >
            Print
          </button>
          {/* </form> */}
        </Nav>
        <Container>
          <Row>
            <Col>{rows}</Col>
          </Row>
          <Row>
            <Arr filesJson={this.state.serResArr} />
          </Row>
        </Container>
      </>
    );
  }
}

export default App;

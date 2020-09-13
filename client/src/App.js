import React from "react";
import { Nav, Container, Col, Row } from "reactstrap";
import Arr from "./components/arr.js";
import config from "./config.json";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchVal: "",
      respVal: [],
      serResArr: [],
    };
    this.debounceTimeout = 0;
    this.handleChange = this.handleChange.bind(this);
    this.logArr = this.logArr.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateList = this.updateList.bind(this);
    this.currentBackend = config.url
  }
  handleSubmit(e) {
    debugger
    e.preventDefault();
    this.sendRequest();
  }

  updateList() {
    // this is debounced update list
    clearTimeout(this.debounceTimeout);
    this.debounceTimeout = setTimeout(() => {
      fetch(this.currentBackend+ "/search?q=" + this.state.searchVal)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.setState({ respVal: data });
        });
    }, 1000 /*this the wait interval before sending call to backend*/);
  }

  handleChange(event) {
    this.setState({ searchVal: event.target.value });
    this.updateList();
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
          <label htmlFor="search">Search</label>
          <input
            placeholder="Search..."
            id="search"
            value={this.state.searchVal}
            style={{ marginLeft: 1 + "em" }}
            onChange={this.handleChange}
          />

          <button
            type="button"
            onClick={(e) => {
              this.handleSubmit(e);
            }}
            style={{ marginLeft: 1 + "em" }}
          >
            Search
          </button>
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

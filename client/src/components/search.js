import React from "react";
import config from "../config.json"
import {
  Container,
  Col,
  Row,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavLink
} from "reactstrap";
import { withRouter } from "react-router-dom";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      respVal: [],
      vidName: null,
      menuToggle: false,
    };

    // CONSTANTS
    this.DEBOUNCETIME = 400; /*this the wait interval before sending call to backend*/
    if (window.location.host.match("localhost")) {
      this.backendUrl = config.local
    }else{
      this.backendUrl = config.url
    }
    this.debounceTimeout = 0;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateList = this.updateList.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    // console.log(event);
    this.setState({menuToggle: false});
    this.props.searchResponseCallback(this.state.respVal);
    this.props.history.push("/search/" + this.state.searchVal);
  }

  updateList() {
    // this is debounced update list
    this.debounceTimeout = setTimeout(() => {
        fetch( this.backendUrl + "/search?q=" + this.state.searchVal)
        .then((response) => response.json())
        .then((data) => {
              // console.log(data);
              this.setState({ respVal: data });
        });
    }, this.DEBOUNCETIME);
  }

  handleChange(event) {
    this.setState({ searchVal: event.target.value, menuToggle: true });
    // console.log(event.target.value);
    this.updateList();
    if(event.target.value===""){
        this.setState({menuToggle: false});
    }
  }
  redirectToPlayer(videoName) {
    this.props.parentCallback(videoName.substring(0, videoName.length - 4));
    this.props.history.push("/player");
    this.setState({ menuToggle: false });
  }
  
  closeMenu() {
    this.setState({ menuToggle: false });
  }
  render() {
    var respVal = this.state.respVal;
    respVal = (respVal.slice(0,8));
    var rows = [];
    rows = respVal.map((Val, index) => {
        return (
            <DropdownItem
                key={index}
                type="button"
                className="btn"
                onClick={this.redirectToPlayer.bind(this, Val)}
                >
                    {Val.substring(0, Val.length - 4)}
            </DropdownItem>
        );
    });
    return (
      <>
        <Container>
          <Row>
            <Col xs="2">
              <NavLink href="/home">Home</NavLink>
            </Col>
            <Col xs="8">
              <form onSubmit={this.handleSubmit} autoComplete="off">
                <input
                  type="search"
                  placeholder="Search..."
                  id="search"
                  value={this.state.searchVal || ""}
                  onChange={this.handleChange}
                  className="col-12"
                />
              </form>
              <UncontrolledDropdown isOpen={this.state.menuToggle} toggle={()=> {return(this.state.menuToggle);}} >
                <DropdownToggle className="d-none" />
                <DropdownMenu
                  className="col-12"
                  style={{ position: "realtive" }}
                >
                  {rows}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Col>
            <Col xs={{ size: 2 }}>
              <button
                type="button"
                onClick={this.handleSubmit}
                className="m-1 search-button"
              >
                Search
              </button>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default withRouter(Search);

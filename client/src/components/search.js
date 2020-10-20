import React from "react";
import config from "../config.json"
import {
  Container,
  Row,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  NavLink
} from "reactstrap";
import { withRouter} from "react-router-dom";

class Search extends React.Component {
  shouldComponentUpdate(nextProps, nextState){
    return true;
  }
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
    // this.redirectToPlayer = this.redirectToPlayer.bind(this);
    this.redirectToPage = this.redirectToPage.bind(this);
    this.debounceTimeout = 0;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateList = this.updateList.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    // console.log(event);
    this.props.menuToggleCallback(false);
    // this.props.searchResponseCallback(this.state.respVal);
    var quer = this.state.searchVal.replace(' ','+');
    // console.log(quer);
    if(this.state.searchVal===""){
        this.props.history.push("/search/ ");
    }
    else{
      this.props.history.push("/search/" + quer);
    }
  }

  updateList() {
    this.debounceTimeout = setTimeout(() => {
        fetch( this.backendUrl + "/search?q=" + this.state.searchVal)
        .then((response) => response.json())
        .then((data) => {
              this.setState({ respVal: data });
        });
    }, this.DEBOUNCETIME);
  }

  handleChange(event) {
    this.setState({ searchVal: event.target.value, menuToggle: true });
    this.props.menuToggleCallback(true);
    this.updateList();
    if(event.target.value===""){
        this.props.menuToggleCallback(false);
    }
  }

  closeMenu() {
    this.props.menuToggleCallback(false);
  }
  redirectToPage(page){
    this.props.history.push(page);
    this.props.parentCallback(page);
    // this.forceUpdate();
    this.closeMenu();
  }
  render() {
    var respVal = this.state.respVal;
    var rows = [];
    rows = respVal.map((Val, index) => {
        return (
                <NavLink
                  type="button"
                  onClick={(e) => {e.preventDefault(); this.redirectToPage(`/player/${Val.substring(0, Val.length - 4)}`)}}
                  href = {`/player/${Val.substring(0, Val.length - 4)}`}
                  className="row"
                  key={index}>
                  {Val.substring(0, Val.length - 4)}
                </NavLink>
        );
    });
    return (
      <>
        <Container>
          <Row>
            <div className="col-2 pl-0">
              <NavLink
                type="button"
                onClick={() => {this.redirectToPage("/home")}}>
                Home
              </NavLink>
            </div>
            <div className="col-7">
              <form className="row" onSubmit={this.handleSubmit} autoComplete="off">
                <input
                  type="search"
                  placeholder="Search..."
                  id="search"
                  value={this.state.searchVal || ""}
                  onChange={this.handleChange}
                  className="col-12"
                />
              </form>
              <UncontrolledDropdown isOpen={this.props.menuToggle} toggle={()=> {return(this.props.menuToggle);}} >
                <DropdownToggle className="d-none" />
                <DropdownMenu
                  className="col-12"
                  style={{ position: "realtive" }}
                >
                  {rows}
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
            <div className="col-2 pl-0">
              <button
                type="button"
                onClick={this.handleSubmit}
                className="m-1 search-button"
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

import React from "react";
import config from "../config.json"
import {
  Row,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  NavLink
} from "reactstrap";
import { withRouter} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome,faSearch } from '@fortawesome/free-solid-svg-icons'
import  axios from "axios";

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
    this.fileUpload = this.fileUpload.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    // console.log(event);
    this.props.menuToggleCallback(false);
    // this.props.searchResponseCallback(this.state.respVal);
    // console.log(quer);
    if(this.state.searchVal===""){
    }
    else if(this.state.searchVal){
      var quer = this.state.searchVal.replace(' ','+');
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

  fileUpload(event) {
    const data = new FormData();
    data.append("file", event.target.files[0]);
    axios
      .post(this.backendUrl + "/uploadFile", data, config)
      .then((response) => {
        console.log(response)
        alert(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
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
                  className="row nav-button ml-0 mr-0"
                  key={index}>
                  {Val.substring(0, Val.length - 4)}
                </NavLink>
        );
    });
    return (
      <>
          <Row className="align-items-center navbar-home">
              <NavLink
                className="col-2 col-md-1 pl-2 pl-md-3 pr-0 pt-2 pb-2 d-flex home-button align-items-center"
                type="button"
                onClick={() => {this.redirectToPage("/home")}}>
                <div className="d-none d-md-block mr-md-2">
                  Home
                </div>
                <FontAwesomeIcon icon={faHome} name={"home"} className="m-1" />
              </NavLink>
            <div className="col-7 pl-1 pl-md-2 pr-0">
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
              <UncontrolledDropdown isOpen={this.props.menuToggle} toggle={()=> {return(this.props.menuToggle);}} className="pr-5">
                <DropdownToggle className="d-none" />
                <DropdownMenu
                  className="col-12 search-suggestions-container pt-0"
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
                className="nav-button"
              >
                <FontAwesomeIcon icon={faSearch} name={"search"}/>
              </button>
            </div>
          </Row>
          <Row style={{"max-width": "100%"}}>
            <div class="form-group files">
              <label>Upload Your File </label>
              <input
                type="file"
                class="form-control"
                multiple=""
                onChange={this.fileUpload}
             />
            </div>
          </Row>
      </>
    );
  }
}

export default withRouter(Search);

import React from "react";
import {
  Row,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  NavLink
} from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome,faSearch,faUpload } from '@fortawesome/free-solid-svg-icons';
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
      tip:false
    };

    // CONSTANTS
    this.DEBOUNCETIME = 400; /*this the wait interval before sending call to backend*/
    this.redirectToPage = this.redirectToPage.bind(this);
    this.debounceTimeout = 0;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateList = this.updateList.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    this.closeMenu();
    if(this.state.searchVal===""){
    }
    else if(this.state.searchVal){
      this.redirectToPage("search-result",this.state.searchVal);
    }
  }

  updateList() {
    this.debounceTimeout = setTimeout(() => {
        console.log(window.backendUrl + "/search?q=" + this.state.searchVal+"&l="+8);
        fetch( window.backendUrl + "/search?q=" + this.state.searchVal+"&l="+8, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json"
          }
        })
        .then((response) => response.json())
        .then((data) => {

              this.setState({ respVal: data });
              this.props.menuToggleCallback(true);
        })
    }, this.DEBOUNCETIME);
  }

  handleChange(event) {
    if(event.target.value!==""){
      this.setState({ searchVal: event.target.value});
      this.updateList();
    }
    else{
        this.setState({searchVal: ""})
        this.closeMenu();
    }
  }

  closeMenu() {
    this.props.menuToggleCallback(false);
  }
  redirectToPage(page,param){
    this.closeMenu();
    this.props.redirectCallback(page,param);
  }
  render() {
    var respVal = this.state.respVal;
    var rows = [];
    rows = respVal.map((Val, index) => {
        return (
                <NavLink
                  type="button"
                  onClick={(e) => {e.preventDefault(); this.redirectToPage("player",Val.substring(0, Val.length - 4))}}
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
                className="col-2 col-md-1 pl-md-3 pr-0 pt-2 pb-2 d-flex home-button align-items-center"
                type="button"
                onClick={() => {this.redirectToPage("home"," ")}}>
                <div className="d-none d-md-block mr-md-2">
                  Home
                </div>
                <FontAwesomeIcon icon={faHome} name={"home"} className="ml-1 mt-1 mb-1" />
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
              <button
                type="button"
                onClick={this.handleSubmit}
                className="ml-0 nav-button searchButton"
              >
                <FontAwesomeIcon icon={faSearch} name={"search"}/>
              </button>
              <div>
              <button className="nav-button align-items-center" type="button" onClick={() => this.redirectToPage("upload","")} onMouseOver={() => {this.setState({tip:true})}} onMouseLeave={() => {this.setState({tip:false})}}>
                <FontAwesomeIcon icon={faUpload} name={"upload"}/>
              </button>
              <div className={this.state.tip ? "uploadTip mr-md-2" :"d-none" }>
                Upload Files
              </div>
          </div>
        </Row>
      </>
    );
  }
}

export default Search;

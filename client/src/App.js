import React from "react";
import { Switch, Redirect, Route, BrowserRouter } from "react-router-dom";
import Search from "./components/search.js";
import VidComponent from "./components/VidComponent.js";
import SearchResult from "./components/searchResult.js";
import HomeComponent from "./components/HomeComponent.js";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vidName: null,
      menuToggle: false,
      searchResponse:[]
    };
    if (window.location.host.match("localhost")) {
      this.backendUrl = "localhost:8000"
    }else{
      this.backendUrl = window.config.url
    }
  }
  render() {
    return (
      <>
        <script src="./config.js"/>
        <BrowserRouter>
          <div className="page-wrapper">
            <Search
              parentCallback={ (callbacksrc) => {
                  this.setState({ shouldRender: callbacksrc});
                }
              }
              menuToggleCallback={(toggle) => {
                  if(toggle!==this.state.menuToggle){
                    this.setState({menuToggle: toggle});
                  }
                  // console.log(this.state.menu);
                }
              }
              menuToggle={this.state.menuToggle}
            />
          <MainContent
            maincontentCallback = {(toggle) => {
                this.setState({menuToggle: toggle});
            }}
            shouldRender={this.state.shouldRender}
          />

          </div>
        </BrowserRouter>
      </>
    );
  }
}


//
// MainContent
//
class MainContent extends React.Component{
  shouldComponentUpdate(nextProps,nextState){
    if(nextProps.shouldRender!==this.props.shouldRender){
      console.log(true);
      return(true);
    }
    else{
      console.log(false);
      return(false);
    }
  }
  constructor(props){
    super(props);
    this.state = {
      searchResponse:[],
      shouldRender: false
    };
    this.closeMenu = this.closeMenu.bind(this);
    if (window.location.host.match("localhost")) {
      this.backendUrl = "localhost:8000"
    }else{
      this.backendUrl = window.config.url
    }
  }
  closeMenu() {
      // this.this.setState({shouldRender=true});
      this.props.maincontentCallback(false);
    }
  render(){
    // console.log(this.props.shouldRender);
    const Result=({match}) => {
      // console.log("result");
      var query = match.params.query.replace('+',' ');
      return( <SearchResult searchVal={query} />);
    };
    const videoPlayer =({match}) => {
      console.log("videos");
      var videoName = match.params.videoname.replace('+', ' ');
      return(
        <VidComponent srcName={videoName}/>
      );
    }
    return(
      <div onClick={this.closeMenu}>
          <Switch>
            <Route
              path="/player/:videoname"
              component=
                {videoPlayer}

            />
            <Route
              path="/search/:query"
              component=
                  {Result}
              />

            <Route
              exact path="/home"
              component={
                () => <HomeComponent/>
              }
              />
          <Redirect to="/home"/>
          </Switch>
        </div>
    )
  }
}
export default App;

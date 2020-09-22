import React from "react";
import { Switch, Redirect, Route, BrowserRouter } from "react-router-dom";
import Search from "./components/search.js";
import VidComponent from "./components/VidComponent.js";
import SearchResult from "./components/searchResult.js";
import HomeComponent from "./components/HomeComponent.js";
import config from "./config.json";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vidName: null,
      menuToggle: false,
      searchResponse:[]
    };
    if (window.location.host.match("localhost")) {
      this.backendUrl = config.local
    }else{
      this.backendUrl = config.url
    }
  }
  render() {
    return (
      <>
        <BrowserRouter>
          <div>
            <Search
              parentCallback={(callbacksrc) => {
                  this.setState({ vidName: callbacksrc});
                  // console.log(this.state.vidName);
                }
              }
              searchResponseCallback={(SearchResp) => {
                  this.setState({searchResponse: SearchResp});
                }
              }
              menuToggleCallback={(toggle) => {
                if(toggle!==this.state.menuToggle){
                  this.setState({menuToggle: toggle});
                }
                // console.log(this.state.menu);
              }}
              menuToggle={this.state.menuToggle}
            />
          <MainContent
            maincontentCallback = {(toggle) => {
                this.setState({menuToggle: toggle});
            }}
            vidName = {this.state.vidName}
            menuToggle={this.state.menuToggle}
            searchResponse={this.state.searchResponse}
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
  shouldComponentUpdate(nextProps, nextState){
    // if(this.state.shouldRender){
    if(this.props.vidName!==nextProps.vidName){
      return(true);
    }
      return(false);
    // }
    // else {return(true);}
  }
  constructor(props){
    super(props);
    this.state = {
      searchResponse:[],
      shouldRender: false
    };
    this.closeMenu = this.closeMenu.bind(this);
    this.getData = this.getData.bind(this);
    if (window.location.host.match("localhost")) {
      this.backendUrl = config.local
    }else{
      this.backendUrl = config.url
    }
  }
  closeMenu() {
    if(this.props.menuToggle){
      // this.this.setState({shouldRender=true});
      this.props.maincontentCallback(false);
    }
  }
  getData(params,callback) {
    fetch( this.backendUrl + "/searchall?q=" + params)
      .then((response) => response.json())
      .then((data) => {
            // console.log(data);
            this.setState({ searchResponse: data });
      });
    callback();
  }
  render(){
    const Result=({match}) => {
      var query = match.params.query.replace('+',' ');
      return( <SearchResult searchVal={query} />);
    };
    const videoPlayer =({match}) => {
      var videoName = match.params.videoname.replace('+', ' ');
      return(
        <VidComponent srcName={videoName}/>
      );
    }
    return(
      <div onClick={this.closeMenu}>
          <Switch>
            <Route
              path="/player/:video  name"
              component=
                {videoPlayer}

            />
            <Route
              path="/search/:query"
              component=
                  {Result}
              />

            <Route
              path="/home"
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

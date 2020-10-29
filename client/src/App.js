import React from "react";
// import { Switch, Redirect, Route, BrowserRouter } from "react-router-dom";
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
      searchResponse:[],
      WComponent:"home"
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
          <div className="page-wrapper">
            <Search
              redirectCallback={ (comp,param) => {
                  this.setState({ WComponent: comp,Parameter:param});
                  console.log(comp,param);
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
            compToDis={this.state.WComponent}
            paramForComp={this.state.Parameter}
            redirectCallback={ (comp,param) => {
                this.setState({ WComponent: comp,Parameter:param});
              }
            }
            />
          </div>
      </>
    );
  }
}


//
// MainContent
//
class MainContent extends React.Component{
  shouldComponentUpdate(nextProps,nextState){
    console.log(nextProps + '\n' + nextState);
    if((nextProps.compToDis!==this.props.compToDis) || (nextProps.paramForComp!==this.props.paramForComp)){
      this.setState({ WComponent: nextProps.compToDis,params:nextProps.paramForComp});
      console.log(true);
      return(true);
    }
    else if((nextState.WComponent!==this.state.WComponent) || (nextState.params!==this.state.params)){
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
      WComponent:this.props.compToDis,
      params:this.props.paramForComp
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
    // const Result=() => {
    //   // console.log("result");
    //   // var query = match.params.query.replace('+',' ');
    // };
    // const videoPlayer =() => {
    //   console.log("videos");
    //   // var videoName = match.params.videoname.replace('+', ' ');
    //   return(
    //     <VidComponent srcName={this.state.params}/>
    //   );
    // }
    switch (this.state.WComponent) {
      case "home":{
        // const mainComponent=() => {
        return(
          <HomeComponent
            redirectCallback={ (comp,param) => {
                this.setState({ WComponent: comp,params:param});
              }
            }
            />
        );
        // };
      }
      case "player": {
        // const mainComponent = () => {
          return(
            <VidComponent srcName={this.state.params}/>
          );
        // }
      }
      case "search-result":{
        // const mainComponent= () => {
        return(
           <SearchResult searchVal={this.state.params}
             redirectCallback={ (comp,param) => {
                 this.setState({ WComponent: comp,params:param});
               }
             }
             />
         );
        // }
      }
      default:{
        break;
      }
    }
    // return(
    //   <div onClick={this.closeMenu}>
    //       {mainComponent}
    //   </div>
    // );
  }
}
export default App;

// <Switch>
//   <Route
//     path="/player/:videoname"
//     component=
//       {videoPlayer}
//
//   />
//   <Route
//     path="/search/:query"
//     component=
//         {Result}
//     />
//
//   <Route
//     exact path="/home"
//     component={
//       () => <HomeComponent/>
//     }
//     />
// <Redirect to="/home"/>
// </Switch>

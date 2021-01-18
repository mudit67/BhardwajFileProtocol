import React from "react";
import Upload from './components/upload.js'
import Search from "./components/search.js";
import VidComponent from "./components/VidComponent.js";
import SearchResult from "./components/searchResult.js";
// import HomeComponent from "./components/HomeComponent.js";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vidName: null,
      menuToggle: false,
      searchResponse:[],
      WComponent:"home"
    };
    window.config = window.config || {}
    if (window.location.host.match("localhost")) {
      window.backendUrl = window.config.local
    }else{
      if(window.location.host.match("192.168")){
        window.backendUrl = "http://" + window.location.host.substring(0,window.location.host.indexOf(':')+1) + "8000";
      }
      else{
        window.backendUrl = window.config.url || ""
      }
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
                  console.log(comp + '\n' + param);
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
    // console.log("nextProps = " + nextProps.compToDis + " " + nextProps.paramForComp + '\n' +
    //       "this.props = " + this.props.compToDis + ' ' + this.props.paramForComp + '\n' +
    //       "next state = " + nextState.WComponent + ' ' + nextState.params + '\n' +
    //       "this.state = " + this.state.WComponent + ' ' + this.state.params + '\n'
    // );
    if((nextProps.compToDis!==this.props.compToDis) ||
    (nextProps.paramForComp!==this.props.paramForComp) ||
    (nextProps.compToDis!==this.state.WComponent) ||
    (nextProps.paramForComp!==this.state.params)
    ){
      this.setState({ WComponent: nextProps.compToDis,params:nextProps.paramForComp});
      return(true);
    }
    else if((nextState.WComponent!==this.state.WComponent) || (nextState.params!==this.state.params)){
      // this.setState({ WComponent: nextProps.compToDis,params:nextProps.paramForComp});
      return(true);
    }
    else{
      console.log(false)
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
  }
  closeMenu() {
      this.props.maincontentCallback(false);
    }
  render(){
    switch (this.state.WComponent) {
      case "home":{
        return(
          <div/>
        );
      }
      case "player": {
          return(
            <VidComponent srcName={this.state.params}/>
          );
      }
      case "search-result":{
        return(
           <SearchResult searchVal={this.state.params}
             redirectCallback={ (comp,param) => {
                 this.setState({ WComponent: comp,params:param});
               }
             }
             />
         );
      }
      case "upload": {
        return(
            <Upload url={this.backendUrl}/>
        );
      }
      default:{
        return (
          <div></div>
        );
      }
    }
  }
}
export default App;

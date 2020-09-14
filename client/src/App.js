import React from "react";
import { Switch, Redirect, Route, BrowserRouter } from "react-router-dom";
import Search from "./components/search.js";
import VidComponent from "./components/VidComponent.js";
import SearchResult from "./components/searchResult.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vidName: null,
      redirect: false,
      menuToggle: false,
      searchResponse:[]
    };
  this.closeMenu = this.closeMenu.bind(this);
  }
  closeMenu() {
    this.setState({ menuToggle: false });
  }
  render() {
    const Result=({match}) => {
      // console.log(match);
      return(
        <div className="container">
          <div className="row"> 
            Showing results for:&nbsp;{match.params.query} 
          </div>
          <SearchResult response={this.state.searchResponse} />
        </div>
        
      );
    };
    return (
      <>
        
        <BrowserRouter>
          <div>
            <Search
              parentCallback={(callbacksrc) => {
                  this.setState({ vidName: callbacksrc, redirect: true });
                  console.log(this.state.vidName);
                }
              }
              searchResponseCallback={(SearchResp) => {
                  this.setState({searchResponse: SearchResp});
                }
              }  
            />
            <div>
              <Switch>
                <Route
                  path="/player" 
                  component={() => 
                    <VidComponent srcName={this.state.vidName} />  
                  }
                />
                <Route
                  path="/search/:query"
                  component=
                      {Result}
                  
                />

              <Redirect to="/"/>
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </>
    );
  }
}

export default App;

import React from "react";
import { Switch, Redirect, Route, BrowserRouter } from "react-router-dom";
import Search from "./components/search.js";
import VidComponent from "./components/VidComponent.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vidName: null,
      redirect: false,
      menuToggle: false
    };
  this.closeMenu = this.closeMenu.bind(this);
  }
  closeMenu() {
    this.setState({ menuToggle: false });
  }
  render() {
    return (
      <>
        
        <BrowserRouter>
          <div>
            <Search
              parentCallback={(callbacksrc) => {
                this.setState({ vidName: callbacksrc, redirect: true });
                console.log(this.state.vidName);
              }}
            />
            <div>
              <Switch>
                <Route
                  path="/player" 
                  component={() => 
                    <VidComponent srcName={this.state.vidName} />  
                  }
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

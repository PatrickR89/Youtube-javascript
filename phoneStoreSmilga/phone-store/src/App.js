import logo from "./logo.svg";
import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-6">col one</div>
          <div className="col-6">
            <span>
              <i className="fas fa-home" />
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

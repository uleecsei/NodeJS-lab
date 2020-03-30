import React, { Component } from "react";

import "../styles/App.css";
import Signup from "./LoginForm.js";

class App extends Component {
  render() {
    return (
      <div>
        <h1>My React App!</h1>
        <Signup />
        <p>Hello</p>
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import MainPage from "./components/mainPage";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <MainPage />
      </React.Fragment>
    );
  }
}

export default App;

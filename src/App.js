import React, { Component } from 'react';
import './App.css';
import SensorList from "./SensorList";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
        <Router>
            <div>
                <ul>

                    <li>
                        <Link to="/SensorList">SensorList</Link>
                    </li>
                </ul>

                <hr />

                <Route path="/SensorList" component={SensorList} />
            </div>
        </Router>
    );
  }
}

export default App;

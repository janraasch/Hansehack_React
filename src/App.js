import axios from 'axios';
import React, { Component } from 'react';
import SensorList from "./SensorList";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import MapContainer from './MapContainer';

const channels = {
  76: {
    name: 'Wallstrasse 43',
    lat: 45.1213,
    lng: 51.1123
  }
}
const serverURI = 'http://hansehack.fh-luebeck.de'
const token = 'X8J5RBSQADFV0DO2'

class App extends Component {
  state = {
    data: []
  }

  render() {
    return (
      <Router>
        <div>
            <Route path="/map" component={MapContainer} />
            <Route path="/SensorList" component={SensorList} />
          <ul>
            <li>
              <Link to="/SensorList">SensorList</Link>
            </li>
            <li>
              <Link to="/map">Map</Link>
            </li>
          </ul>
          <hr />

        </div>
      </Router>
    );
  }
}

export default App;

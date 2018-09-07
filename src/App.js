import React, { Component } from 'react';
import SensorList from "./SensorList";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import MapContainer from './components/MapContainer';

export const channels = [
  {
    id: 121,
    token: 'UXPMPOC1TQQXBSAP'
  }, {
    id: 122,
    token: 'KPW4D81CMQ9YZX1G'
  }, {
    id: 123,
    token: '4RIMYW1C4I56I5FR'
  }, {
    id: 77,
    token: '6VF6QMZQSSERJXCG'
  }
]
export const serverURI = 'http://hansehack.fh-luebeck.de'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <NavLink activeClassName="hide" to="/SensorList">SensorList</NavLink>
            </li>
            <li>
              <NavLink to="/map">Map</NavLink>
            </li>
          </ul>
          <hr />

          <Route path="/map" component={() => <MapContainer/>} />
          <Route path="/SensorList" component={() => <SensorList/>} />

        </div>
      </Router>
    );
  }
}

export default App;

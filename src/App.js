import React, { Component } from 'react';
import SensorList from "./SensorList";
import { BrowserRouter as Router, Route} from "react-router-dom";
import MapContainer from './Components/MapContainer';
import { Navbar, Nav, NavDropdown, NavItem, MenuItem } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'

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
        <div className='container'>
          <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">Stadtgeräusche Lübeck</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <LinkContainer to="/SensorList">
                  <NavItem>    
                    SensorList
                  </NavItem>
                </LinkContainer>
                <LinkContainer to="/map">
                  <NavItem>    
                    Map
                  </NavItem>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Route path="/map" component={() => <MapContainer/>} />
          <Route path="/SensorList" component={() => <SensorList/>} />
        </div>
      </Router>
    );
  }
}

export default App;

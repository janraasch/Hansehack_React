import React, { Component } from 'react';
import SensorList from "./SensorList";
import Home from './Home';
import { BrowserRouter as Router, Route} from "react-router-dom";
import MapContainer from './Components/MapContainer';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'

export const channels = [
  {
    id: 70,
    token: '0W80BK3TWTEFH2OK'
  }, {
    id: 76,
    token: 'AXOSSY1ZGI34E1KN'
  }, {
    id: 66,
    token: 'HZ86OFDXBSCWPGNU'
  }, {
    id: 122,
    token: 'KPW4D81CMQ9YZX1G'
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
                    Daten
                  </NavItem>
                </LinkContainer>
                <LinkContainer to="/map">
                  <NavItem>    
                    Stadtplan
                  </NavItem>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Route path="/map" component={() => <MapContainer/>} />
          <Route path="/SensorList" component={() => <SensorList/>} />
          <Route exact path="/" component={() => <Home/>} />
        </div>
      </Router>
    );
  }
}

export default App;

import React from 'react';
import { Well, Jumbotron, Button } from 'react-bootstrap';

import './Home.css'

const Home = () => (
  <div>
    <Jumbotron className="hero">
      <h1>Sensoring</h1>
      <p className="shadowing">
        Sensoring is a system based on sound sensor arrays placed around the city that allows to gather data about sound intensity in wide area. Each array consists of 4 microphones that can sense the sound from 360 degrees. Collected data are sent via LoRaWAN to the cetral database where they are processed by server software.
      </p>
      <p>
      <Button bsStyle="primary">Learn more 😇</Button>
      </p>
    </Jumbotron>
    <Well>
    <small>
    Copyright &copy; TeamKrach 2018
    </small>
    </Well>
  </div>
)

export default Home
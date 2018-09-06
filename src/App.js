import axios from 'axios';
import React, { Component } from 'react';
import SensorList from "./SensorList";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import MapContainer from './MapContainer';

const channels = [
  {
    id: 121,
    token: 'UXPMPOC1TQQXBSAP'
  }, {
    id: 122,
    token: 'KPW4D81CMQ9YZX1G'
  }, {
    id: 123,
    token: '4RIMYW1C4I56I5FR'
  }
]
const serverURI = 'http://hansehack.fh-luebeck.de'

class App extends Component {
  state = {
    channelData: []
  }

  componentDidMount() {
    channels.map((channel) => {
      axios.get(`${serverURI}/channels/${channel.id}/feeds.json?results=1&key=${channel.token}`)
      .then(res => {
        const { name, latitude, longitude } = res.data.channel
        const feeds = res.data.feeds
        
        const { channelData } = this.state;
        const lastLevel = feeds && feeds[0] ? feeds[0].field1 : null

        const fetchedData = channelData.concat([{
          name,
          latitude,
          longitude,
          lastLevel: lastLevel
        }]);
        this.setState({ channelData: fetchedData });
      });
      return null;
    })
  }


  render() {
    const { channelData } = this.state;
    const feeds = channelData.map((channel) => {
      return (<li>{channel.name}:{channel.lastLevel}</li>);
    })
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/SensorList">SensorList</Link>
            </li>
            <li>
              <Link to="/map">Map</Link>
            </li>
          </ul>
          <hr />
          <Route path="/map" component={() => <MapContainer channelData={channelData}/>} />
          <Route path="/SensorList" component={() => <SensorList channelData={channelData}/>} />
          {channelData.length > 0 ? (<ul>{feeds}</ul>) : '... loading server data'}
        </div>
      </Router>
    );
  }
}

export default App;

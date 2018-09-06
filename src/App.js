import axios from 'axios';
import React, { Component } from 'react';
import SensorList from "./SensorList";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
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

    setInterval(() =>
    {
        channels.map((channel) => {
            axios.get(`${serverURI}/channels/${channel.id}/feeds.json?results=1&key=${channel.token}`)
                .then(res => {
                    const { name, latitude, longitude, id } = res.data.channel;
                    const feeds = res.data.feeds;

                    const { channelData } = this.state;
                    const lastLevel = feeds && feeds[0] ? feeds[0].field1 : null;

                    const resId = channelData.findIndex((element) =>
                    {
                        return element.id === id;
                    });

                    if (resId >= 0 && resId !== undefined)
                    {
                        channelData.splice(resId, 1)
                    }

                    const fetchedData = channelData.concat([{
                        name,
                        latitude,
                        longitude,
                        id,
                        lastLevel: lastLevel
                    }]);

                    this.setState({ channelData: fetchedData });
                });
            return null;
        })
    }, 2000);
  }


  render() {
    const { channelData } = this.state;

    channelData.map((channel) => {
      return (<li key={channel.name}>{channel.name}:{channel.lastLevel}</li>);
    });

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

          <Route path="/map" component={() => <MapContainer channelData={channelData}/>} />
          <Route path="/SensorList" component={() => <SensorList channelData={channelData}/>} />

        </div>
      </Router>
    );
  }
}

export default App;

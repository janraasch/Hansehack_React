import axios from 'axios';
import React, {Component, createRef} from 'react';
import { Map, TileLayer, Marker, Popup, Circle } from 'react-leaflet'
import {serverURI, channels} from '../App'

const initialCoordinates = {
  lat: 53.86893,
  lng: 10.68729
}


class MapContainer extends Component {
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

            const resId = channelData.findIndex((element) => {
              return element.id === id;
            });

            if (resId >= 0 && resId !== undefined) {
              channelData.splice(resId, 1)
            }

            const fetchedData = channelData.concat([{
                name,
                latitude: latitude || '53.86893',
                longitude: longitude || '10.68729',
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
    const channels = this.state.channelData
    const markerList = channels.map((channel) => {
      let color = 'gray'
      let radius = 20;
      
      if (channel.lastLevel >= 0 && channel.lastLevel < 50) {
        color = 'green'
        radius = 50;
      } else if (channel.lastLevel >= 50 && channel.lastLevel < 100) {
        color = 'yellow'
        radius = 100;
      } else if(channel.lastLevel >= 100) {
        color = 'red'
        radius = 150;
      }

      return (
        <Circle center={[channel.latitude, channel.longitude]} color={color} fillColor={color} radius={radius} />
      );
    });

    return (
      <div>
        <Map
          animate={true}
          center={initialCoordinates}
          length={4}
          zoom={13}>
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markerList}
        </Map>
      </div>

    );
  }
}

export default MapContainer;


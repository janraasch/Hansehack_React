import axios from 'axios';
import React, { Component } from 'react';

import {serverURI, channels} from './App';

import './App.css';
import './SensorListStyle.css';

class SensorList extends Component {
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

    fetchAllTableRows(jsonResult)
    {
        jsonResult.sort((a, b) =>
        {
            return b.id - a.id;
        });

        return jsonResult.map((channelData) => {

            let lastLevel = (channelData.lastLevel === null) ? 0 : channelData.lastLevel;

            return (<tr key={channelData.id}><td>{channelData.id}</td><td>{channelData.name}</td><td>{lastLevel}</td></tr>)
        });
    }

    render() {

        const channels = this.state.channelData;

        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Listing all sensors</h1>
                </header>
                <table id="table">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Location</th>
                        <th>Noise in DB</th>
                    </tr>
                    </thead>
                    <tbody>
                      {this.fetchAllTableRows(channels)}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default SensorList;

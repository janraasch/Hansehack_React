import axios from 'axios';
import React, { Component } from 'react';
import { PageHeader, Table } from 'react-bootstrap';

import {serverURI, channels} from './App';

import './App.css';

class SensorList extends Component {
    state = {
        channelData: [],
        id: -1
    }

    componentDidMount() {
        setInterval(() =>
        {
          channels.map((channel) => {
            axios.get(`${serverURI}/channels/${channel.id}/feeds.json?results=5&key=${channel.token}`)
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
                    lastLevel: lastLevel,
                    levels: feeds.map((item) => {
                        return {noise: item.field1, timestamp: item.created_at};
                    })
                }]);

                this.setState({ channelData: fetchedData });
              });
            return null;
          })
        }, 1000);
    }

    fetchAllTableRows(jsonResult)
    {
        jsonResult.sort((a, b) =>
        {
            return b.id - a.id;
        });

        return jsonResult.map((channelData) => {

            return (
                <div>
                <h2 className="text-center">{channelData.name}</h2>
                    <Table striped bordered condensed hover>
                        <thead><tr><th>Timestamp</th> <th>Noise</th></tr></thead>
                        <tbody>{channelData.levels.map((el) => {
                            return (<tr key={el.timestamp}><td>{el.timestamp}</td><td>{el.noise}</td></tr>)})}
                        </tbody>
                    </Table>
                </div>)
        });
    }

    render() {

        const channels = this.state.channelData;

        return this.fetchAllTableRows(channels);
    }
}

export default SensorList;

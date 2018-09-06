import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './SensorListStyle.css';

class SensorList extends Component {

    fetchAllTableRows(jsonResult)
    {
        jsonResult.sort((a, b) =>
        {
            return a.name[0] >= b.name[0];
        });

        return jsonResult.map((channelData) => {

            let lastLevel = (channelData.lastLevel === null) ? 0 : channelData.lastLevel;

            return (<tr key={channelData.name}><td>{channelData.name}</td><td>{channelData.name}</td><td>{lastLevel}</td></tr>)
        });
    }

    render() {

        const channels = this.props.channelData;

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

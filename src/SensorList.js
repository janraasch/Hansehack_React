import React, { Component } from 'react';
import './App.css';
import './SensorListStyle.css';

class SensorList extends Component {

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

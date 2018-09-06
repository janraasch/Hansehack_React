import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class SensorList extends Component {

    addTableRow(id, location, noiseInDb)
    {
        return (<tr><td>{id}</td><td>{location}</td><td>{noiseInDb}</td></tr>);
    }

    fetchAllTableRows(jsonResult)
    {
        return jsonResult.data.map((channel) => (
            (<tr key={channel.id}><td>{channel.id}</td><td>{channel.location}</td><td>{channel.noise}</td></tr>)
        ));
    }

    render() {

        const jsonData = {data: [{id: 1, location: "abcd", noise: 20}, {id: 2, location: "abcd", noise: 20}]};

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Listing all sensors</h1>
                </header>
                <table id="table" style={{width: 100 + '%'}}>
                    <tbody>
                      {this.fetchAllTableRows(jsonData)}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default SensorList;

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './SensorListStyle.css';

class SensorList extends Component {

    fetchAllTableRows(jsonResult)
    {
        return jsonResult.data.map((channel) => (
            (<tr key={channel.id}><td>{channel.id}</td><td>{channel.location}</td><td>{channel.noise}</td></tr>)
        ));
    }

    render() {

        const jsonData = {data: [
                {id: 1, location: "geninerstrasse 80", noise: 5},
                {id: 2, location: "strasse 32", noise: 13},
                {id: 3, location: "test 80", noise: 5},
                {id: 4, location: "strasse 3", noise: 15},
                {id: 5, location: "qwe 80", noise: 12},
                {id: 6, location: "abc 32", noise: 55},
                {id: 7, location: "geninerstrasse 80", noise: 34},
                {id: 8, location: "hallo 32", noise: 2}]};

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
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
                      {this.fetchAllTableRows(jsonData)}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default SensorList;

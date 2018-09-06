import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class SensorList extends Component {
    render() {
        return (
            <div className="App">

                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Listing all sensors</h1>
                </header>
                <table style={{width: 100 + '%'}}>
                    <tr>
                        <th>Device ID</th>
                        <th>Street</th>
                        <th>Noise in DB</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Hamburgerstraße 11</td>
                        <td>10</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Geniner Straße 30</td>
                        <td>20</td>
                    </tr>
                </table>
            </div>
        );
    }
}

export default SensorList;

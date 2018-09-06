import React from 'react';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';

class GoogleMapsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {}
        }
        // binding this to event-handler functions
        //this.onMarkerClick = this.onMarkerClick.bind(this);
        //this.onMapClick = this.onMapClick.bind(this);
    }
    // onMarkerClick = (props, marker, e) => {
    //     this.setState({
    //         selectedPlace: props,
    //         activeMarker: marker,
    //         showingInfoWindow: true
    //     });
    // }
    // onMapClick = (props) => {
    //     if (this.state.showingInfoWindow) {
    //         this.setState({
    //             showingInfoWindow: false,
    //             activeMarker: null
    //         });
    //     }
    // }

    render() {
        const style = {
            width: '50vw',
            height: '75vh',
            'marginLeft': 'auto',
            'marginRight': 'auto'
        }
        return (
            <Map
                item
                xs = { 12 }
                style = { style }
                google = { this.props.google }
                //onClick = { this.onMapClick }
                zoom = { 14 }
                initialCenter = {{ lat: 53.86893, lng: 10.68729 }}
            >
                <Marker
                    onClick = { this.onMarkerClick }
                    title = { 'Changing Colors Garage' }
                    position = {{ lat: 53.86893, lng: 10.68729 }}
                    name = { 'Changing Colors Garage' }
                />
            </Map>
        );
    }
}
export default GoogleApiWrapper({
    api: 'AIzaSyAQoBstE_OMe4qNkixYjpjwk1QNhYHAQLE'
})(GoogleMapsContainer)
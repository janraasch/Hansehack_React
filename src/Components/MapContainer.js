import React, {Component, createRef} from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

const initialCoordinates = {
    lat: 53.86893,
    lng: 10.68729
}

class MapContainer extends Component {
    mapRef = createRef()

  render() {
    const channels = this.props.channelData

    const markerList = channels.map((channel) => {
        return (
            <Marker position={[channel.latitude, channel.longitude]}>
                <Popup>TEST</Popup>
            </Marker>);
    });

    return (
      <div>
          <Map
              center={initialCoordinates}
              length={4}
              ref={this.mapRef}
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

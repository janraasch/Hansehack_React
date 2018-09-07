import axios from 'axios'
import React, {Component, createRef} from 'react'
import { Map, TileLayer, Marker, Popup, Circle } from 'react-leaflet'
import { Col, Panel, Row } from 'react-bootstrap'
import Slider, { Range } from 'rc-slider'
import Moment from 'react-moment'
import MomentJS from 'moment'

import 'rc-slider/assets/index.css'
import './MapContainer.css'

import {serverURI, channels} from '../App'

const marks = {
  0: <strong>Jetzt</strong>,
  30: '- 30min'
}
const initialCoordinates = {
  lat: 53.86893,
  lng: 10.68729
}


class MapContainer extends Component {
  state = {
    channelData: [],
    timeshift: 0
  }

  fetchData() {
    const { timeshift } =  this.state
    const endData = MomentJS().subtract(timeshift, 'minutes').format('YYYY-MM-DD%20HH:mm:SS')
    const endParam = timeshift > 0 ? `&end=${endData}` : ''

    channels.map((channel) => {
      axios.get(`${serverURI}/channels/${channel.id}/feeds.json?&timezone=Europe%2FBerlin&results=1&key=${channel.token}${endParam}`)
        .then(res => {
          const { name, latitude, longitude, id } = res.data.channel
          const feeds = res.data.feeds

          const { channelData } = this.state
          const lastLevel = feeds && feeds[0] ? feeds[0].field1 : null

          const resId = channelData.findIndex((element) => {
            return element.id === id
          })

          if (resId >= 0 && resId !== undefined) {
            channelData.splice(resId, 1)
          }

          const fetchedData = channelData.concat([{
              name,
              latitude: latitude || '53.86893',
              longitude: longitude || '10.68729',
              id,
              lastLevel: lastLevel
          }])

          this.setState({ channelData: fetchedData })
        })
      return null
    })
  }

  onChange(val) {
    if(val > 0){
      clearInterval(this.interval)
      this.setState({timeshift: val}, this.fetchData.bind(this))
    } else {
      clearInterval(this.interval)
      this.setState({timeshift: val}, this.startInterval.bind(this))
    }
  }

  startInterval() {
    this.interval = setInterval(this.fetchData.bind(this), 3000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  componentDidMount() {
    this.startInterval()
  }

  render() {
    const { timeshift } = this.state
    
    const channels = this.state.channelData
    const markerList = channels.map((channel) => {
      let color = 'white'
      let radius = 20
      
      if (channel.lastLevel >= 20 && channel.lastLevel < 40) {
        color = 'green'
        radius = 50
      } else if (channel.lastLevel >= 40 && channel.lastLevel < 65) {
        color = 'yellow'
        radius = 100
      } else if(channel.lastLevel >= 65) {
        color = 'red'
        radius = 150
      }

      return (
        <Circle center={[channel.latitude, channel.longitude]} color={color} fillColor={color} radius={radius} />
      )
    })

    return (
      <div>
        <Map
          animate={true}
          center={initialCoordinates}
          length={4}
          zoom={13}>
          <TileLayer
            attribution="&ampcopy <a href=&quothttp://osm.org/copyright&quot>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markerList}
        </Map>
        <hr/>
        <Panel>
          <Panel.Heading>
            Timeshifter:
            <label>
              <Moment 
                subtract={{ minutes: timeshift }}
                format="HH:mm"
              />
            </label>
          </Panel.Heading>
          <Panel.Body>
            <Row>
              <Col md={12} className='timeshifter'>
                <Slider 
                  min={0}
                  max={30}
                  marks={marks}
                  value={timeshift}
                  step={2}
                  dots={true}
                  onChange={this.onChange.bind(this)}
                />
                <br/>
              </Col>
            </Row>
          </Panel.Body>
        </Panel>
        
      </div>

    )
  }
}

export default MapContainer


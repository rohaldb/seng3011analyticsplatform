import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'

const AnyReactComponent = ({ text }) => (
  <div style={{
    // position: 'relative', color: 'white', background: 'red',
    // height: 40, width: 60, top: -20, left: -30,
  }}>
    {text}
  </div>
)

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100%', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyB4LEhl8HxwTvsoXeoteHiq8Ns2EJP_XiU' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={37.532600}
            lng={127.024612}
            text={'Facebook'}
          />
        </GoogleMapReact>
      </div>
    )
  }
}

export default SimpleMap

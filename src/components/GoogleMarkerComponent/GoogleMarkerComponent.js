import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Marker,
  InfoWindow,
} from "react-google-maps";

export default class GoogleMarkerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoWindowOpen: false,
    }
    this.toggleInfoWindow = this.toggleInfoWindow.bind(this);
  }
  toggleInfoWindow() {
    this.setState({
      infoWindowOpen: !this.state.infoWindowOpen,
    })
  }
  render() {
    const { marker } = this.props;
    const infoWindow = (
      <InfoWindow onCloseClick={() => this.toggleInfoWindow()}>
        <div>
          <strong>{marker.name}</strong>
        </div>
      </InfoWindow>
    )
    return (
      <Marker position={{ lat: marker.latitude, lng: marker.longitude }} onClick={() => this.toggleInfoWindow()}>
        {this.state.infoWindowOpen ? infoWindow : null}
      </Marker>
    )
  }
}

GoogleMarkerComponent.propTypes = {
  marker: PropTypes.object.isRequired
}

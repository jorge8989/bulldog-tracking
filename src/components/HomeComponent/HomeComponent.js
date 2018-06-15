import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './HomeComponent.css';
import { compose, withProps } from "recompose";
import MarkerBlock from './../MarkerBlock';
import * as firebase from 'firebase';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
    };
    this.setMarkers = this.setMarkers.bind(this);
    this.deleteMarker = this.deleteMarker.bind(this);
  }

  setMarkers(newMarkers) {
    this.setState({
      markers: newMarkers,
    });
  }

  markerBlocks() {
    const deleteMarker = this.deleteMarker;
    return this.state.markers.map((marker) => {
      return <MarkerBlock
        key={marker.id}
        marker={marker}
        deleteMarker={() => deleteMarker(marker.id)}
      />
    });
  }

  deleteMarker(markerId) {
    const marker = this.markersCollection.doc(markerId);
    marker.delete();
  }
  componentDidMount() {
    const appComponent = this;
    this.firebaseApp = firebase.app();
    const db = firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    db.settings(settings);
    this.markersCollection = db.collection('markers');

    this.markersCollection.onSnapshot(function(querySnapshot) {
      const markers = [];
      querySnapshot.forEach(function(doc) {
        const markerData = doc.data();
        markerData.id = doc.id;
        markers.push(markerData);
      });
      appComponent.setMarkers(markers);
    });
  }

  render() {
    const MyMapComponent = compose(
      withProps({
        googleMapURL:
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyDyXVNvzpGYnZvbPlgkc24u0rdEGgyl46I&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: '100%', width: '100%' }} />,
        containerElement: <div style={{ height: '100%', width: '100%' }} />,
        mapElement: <div style={{ height: '100%', width: '100%' }} />
      }),
      withScriptjs,
      withGoogleMap
    )(props => (
      <GoogleMap defaultZoom={14} defaultCenter={{ lat: -17.7856156, lng: -63.1791842 }}>
      </GoogleMap>
    ));

    return (
      <div className="container-fluid h-100">
        <div className="row h-100">
          <div className="col-md-3 markers-column">
            <div>
              <Link to={'markers/new'} className="btn btn-outline-secondary btn-sm add-marker-btn">
                Añadir marcador
              </Link>
            </div>
            {this.state.markers.length > 0 ? this.markerBlocks() : null}
          </div>
          <div className="col-md-9 map-column">
            <MyMapComponent key="map" />
          </div>
        </div>
      </div>
    );
  }
}

export default HomeComponent;

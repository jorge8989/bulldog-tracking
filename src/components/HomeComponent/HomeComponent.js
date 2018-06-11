import React, { Component } from 'react';
import './HomeComponent.css';
import MarkerBlock from './../MarkerBlock';
import * as firebase from 'firebase';

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
    return (
      <div className="container-fluid">
        <h1>Bulldog tracking</h1>
        {this.state.markers.length > 0 ? this.markerBlocks() : null}
      </div>
    );
  }
}

export default HomeComponent;

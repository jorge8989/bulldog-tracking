import React, { Component } from 'react';
import './App.css';
import MarkerBlock from './components/MarkerBlock';
import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDpLWFgdnn_-3Txc5YWqKaA52PAKovCF2g",
  authDomain: "bulldog-c60eb.firebaseapp.com",
  databaseURL: "https://bulldog-c60eb.firebaseio.com",
  projectId: "bulldog-c60eb",
  storageBucket: "bulldog-c60eb.appspot.com",
  messagingSenderId: "285981530369"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
    };
    this.setMarkers = this.setMarkers.bind(this);
  }

  setMarkers(newMarkers) {
    this.setState({
      markers: newMarkers,
    });
  }

  markerBlocks() {
    return this.state.markers.map((marker) => {
      return <MarkerBlock key={marker.id} marker={marker} />
    });
  }
  componentDidMount() {
    console.log('didmount');
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
    console.log(this.state.markers.length);
    return (
      <div className="container-fluid">
        <h1>Bulldog tracking</h1>
        {this.state.markers.length > 0 ? this.markerBlocks() : null}
      </div>
    );
  }
}

export default App;

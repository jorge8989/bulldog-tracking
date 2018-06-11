import React, { Component } from 'react';
import './App.css';
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
        markers.push(doc.data());
      });
      appComponent.setMarkers(markers);
    });
  }

  render() {
    console.log(this.state.markers.length);
    return (
      <h1>Bulldog tracking</h1>
    );
  }
}

export default App;

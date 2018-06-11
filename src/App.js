import React, { Component } from 'react';
import MarkerBlock from './components/MarkerBlock';
import * as firebase from 'firebase';
import { Route } from "react-router-dom";
import HomeComponent from './components/HomeComponent/HomeComponent';
import EditMarkerComponent from './components/EditMarkerComponent/EditMarkerComponent';

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
  render() {
    return (
      <div className="container-fluid">
        <Route exact path="/" component={HomeComponent} />
        <Route path="/markers/:markerId/edit" component={EditMarkerComponent} />
      </div>
    );
  }
}

export default App;

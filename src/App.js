import React, { Component, Fragment } from 'react';
import * as firebase from 'firebase';
import { Route } from "react-router-dom";
import HomeComponent from './components/HomeComponent/HomeComponent';
import EditMarkerComponent from './components/EditMarkerComponent/EditMarkerComponent';
import NewMarkerComponent from './components/NewMarkerComponent/NewMarkerComponent';

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
      <Fragment>
        <Route exact path="/" component={HomeComponent} />
        <Route path="/markers/:markerId/edit" component={EditMarkerComponent} />
        <Route path="/markers/new" component={NewMarkerComponent} />
      </Fragment>
    );
  }
}

export default App;

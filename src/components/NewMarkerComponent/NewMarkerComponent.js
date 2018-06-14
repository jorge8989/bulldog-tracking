import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router';
import * as firebase from 'firebase';

export default class NewMarkerComponent extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      name: null,
      description: null,
      phone: null,
      processingForm: false,
    }
  }

  componentDidMount() {
    this.firebaseApp = firebase.app();
    const db = firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    db.settings(settings);
    this.markersCollection = db.collection('markers');
  }
  
  handleFormSubmit(e) {
    e.preventDefault();
    this.setState({
      processingForm: true,
    });
    const markerData = {
      name: this.state.name,
      description: this.state.description,
      phone: this.state.phone,
    };
    this.markersCollection.add(markerData).then(() => {
      this.props.history.push('/')
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }


  render() {
    return (
      <div className="row">
        <div className="col-md-6">
          <br />
          <h2>Nuevo marcador</h2>
          <form
            onSubmit={(e) => this.handleFormSubmit(e)}
          >
            <div className="form-group">
              <label>Nombre</label>
              <input type="text" name="name" className="form-control"
                onChange={this.handleInputChange} required="true" />
            </div>
            <div className="form-group">
              <label>Descripción</label>
              <input type="text" name="description" className="form-control"
                onChange={this.handleInputChange} required="true"/>
            </div>
            <div className="form-group">
              <label>Teléfono</label>
              <input type="number" name="phone" className="form-control"
                onChange={this.handleInputChange} required="true"/>
            </div>
            <div className="form-group">
              <input
                type="submit" value="Guardar" className="btn btn-primary"
                disabled={this.state.processingForm}
              />
            </div>
          </form>
          <Link to={'/'} className="btn btn-default" disabled={this.state.processingForm}>
            Volver
          </Link>
        </div>
      </div>
    );
  }
}
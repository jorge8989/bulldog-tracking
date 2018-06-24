import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router';
import * as firebase from 'firebase';

export default class EditMarkerComponent extends Component {
  constructor(props) {
    super(props);
    this.form = React.createRef();
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      name: '',
      description: '',
      phone: '',
      latitude: '',
      longitude: '',
      processingForm: true,
    }
  }
  componentDidMount() {
    const thisComponent = this;
    this.markerId =this.props.match.params.markerId;
    this.firebaseApp = firebase.app();
    const db = firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    db.settings(settings);
    this.markersCollection = db.collection('markers');

    this.markerDoc = this.markersCollection.doc(this.markerId);
    this.markerDoc.get().then(function(doc) {
      if (doc.exists) {
        const docData = doc.data();
        thisComponent.setState({
          name: docData.name,
          description: docData.description,
          phone: docData.phone,
          latitude: docData.latitude,
          longitude: docData.longitude,
          processingForm: false,
        })
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
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
    this.markerDoc.update(markerData).then(() => {
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
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <br />
            <h2>Editar marcador</h2>
            <form onSubmit={(e) => this.handleFormSubmit(e)}>
              <div className="form-group">
                <label>Nombre</label>
                <input type="text" name="name" className="form-control"
                  value={this.state.name} onChange={this.handleInputChange} />
              </div>
              <div className="form-group">
                <label>Descripción</label>
                <input type="text" name="description" className="form-control"
                  value={this.state.description} onChange={this.handleInputChange}/>
              </div>
              <div className="form-group">
                <label>Teléfono</label>
                <input type="number" name="phone" className="form-control"
                  value={this.state.phone} onChange={this.handleInputChange}/>
              </div>
              <div className="form-group">
                <label>Latitud</label>
                <input type="number" name="latitude" className="form-control"
                  value={this.state.latitude} onChange={this.handleInputChange}/>
              </div>
              <div className="form-group">
                <label>Longitud</label>
                <input type="number" name="longitude" className="form-control"
                  value={this.state.longitude} onChange={this.handleInputChange}/>
              </div>
              <div className="form-group">
                <input type="submit" value="Guardar" className="btn btn-primary"
                  disabled={this.state.processingForm}/>
              </div>
            </form>
            <Link to={'/'} className="btn btn-outline-secondary">
              Volver
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

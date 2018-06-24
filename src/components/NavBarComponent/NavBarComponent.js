import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

export default class NavBarComponent extends Component {
  render() {
    return (
      <div className="navbar navbar-dark bg-dark box-shadow main-navbar fixed-top">
        <div className="container-fluid d-flex justify-content-between">
          <a href="#" className="navbar-brand d-flex align-items-center">
            <strong><FontAwesomeIcon icon={faMapMarkerAlt} /> Bulldog Tracking</strong>
          </a>
          <Link to={'markers/new'} className="btn btn-outline-secondary btn-sm add-marker-btn">
            <FontAwesomeIcon icon={faPlus} /> Añadir marcador
          </Link>
        </div>
      </div>
    )
  }
}

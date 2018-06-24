import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './MarkerBlock.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons'

export default class MarkerBlock extends Component {
  handleDeleteClick() {
    const deleteConfirmation = window.confirm('Estás seguro ?');
    if (deleteConfirmation) {
      this.props.deleteMarker();
    }
  }
  render() {
    const { marker } = this.props;
    const photoSrc = 'https://bulldog-c60eb.firebaseapp.com/' + (!!marker.photoUrl ? marker.photoUrl : '/assets/images/profile_pic.png');
    return (
      <div className="marker-block-container">
        <div className="row">
          <div className="col-md-6">
            <img src={photoSrc} className="marker-thumbnail"/>
          </div>
        <div className="col-md-6">
          <p>
            <strong>{marker.name}</strong><br />
            {marker.description}
          </p>
          <a href={marker.phone} className="phone-link">
            <FontAwesomeIcon icon={faPhone} /> {marker.phone}
          </a>
        </div>
        <div className="col-md-12">
          <button className="btn btn-secondary btn-sm">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
          </button>
          <Link to={`markers/${marker.id}/edit`} className="btn btn-info btn-sm">
            <FontAwesomeIcon icon={faEdit} />
          </Link>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => this.handleDeleteClick()}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
      </div>
    );
  }
}

MarkerBlock.propTypes = {
  marker: PropTypes.object.isRequired,
  deleteMarker: PropTypes.func.isRequired,
};

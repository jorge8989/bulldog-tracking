import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './MarkerBlock.css';
import { Link } from 'react-router-dom';

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
        <div className="marker-block">
          <div className="marker-left-block">
            <img src={photoSrc} className="marker-thumbnail"/>
          </div>
        <div className="marker-right-block">
          <p>
            <strong>{marker.name}</strong><br />
            {marker.description}
          </p>
          <a href={marker.phone} className="phone-link">{marker.phone}</a>
        </div>
      </div>
        <button className="btn btn-secondary btn-sm">
          ver en mapa</button>
          <Link to={`markers/${marker.id}/edit`} className="btn btn-info btn-sm">
            edit
          </Link>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => this.handleDeleteClick()}
        >
          delete
        </button>
      </div>
    );
  }
}

MarkerBlock.propTypes = {
  marker: PropTypes.object.isRequired,
  deleteMarker: PropTypes.func.isRequired,
};

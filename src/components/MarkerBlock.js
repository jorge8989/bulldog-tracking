import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './MarkerBlock.css';

export default class MarkerBlock extends Component {
  render() {
    const { marker } = this.props;
    const photoSrc = 'https://bulldog-c60eb.firebaseapp.com/' + (!!marker.photoUrl ? marker.photoUrl : '/assets/images/profile_pic.png');
    return (
      <div>
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
        <button className="btn btn-info btn-sm">
          edit
        </button>
        <button className="btn btn-danger btn-sm">
          delete
        </button>
      </div>
    );
  }
}

MarkerBlock.propTypes = {
  marker: PropTypes.object.isRequired,
};
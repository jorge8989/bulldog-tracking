import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './MarkerBlock.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons'
import * as firebase from 'firebase';

export default class MarkerBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSrc: null,
      ready: false,
    };
    this.getAvatarUrl = this.getAvatarUrl.bind(this);
  }
  componentDidMount() {
    this.getAvatarUrl();
  }
  handleDeleteClick() {
    const deleteConfirmation = window.confirm('Estás seguro ?');
    if (deleteConfirmation) {
      this.props.deleteMarker();
    }
  }

  getAvatarUrl() {
    const self = this;
    if (!!this.props.marker.photoUrl) {
      const storageRef = firebase.storage().ref()
      const avatarRef = storageRef.child(this.props.marker.photoUrl);
      avatarRef.getDownloadURL().then((url) => {
        self.setState({
          avatarSrc: url,
          ready: true,
        });
      }).catch((error) => {
        self.setState({
          avatarSrc: 'https://bulldog-c60eb.firebaseapp.com/assets/images/profile_pic.png',
          ready: true,
        });
        console.log(error);
      });
    } else {
      self.setState({
        avatarSrc: 'https://bulldog-c60eb.firebaseapp.com/assets/images/profile_pic.png',
        ready: true,
      });
    }
  }
  render() {
    const avatarPic = <img src={this.state.avatarSrc} className="marker-thumbnail"/>;
    const { marker } = this.props;
    return (
      <div className="marker-block-container">
        <div className="row">
          <div className="col-md-6">
            {!!this.state.avatarSrc ? avatarPic : null }
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
          <button onClick={() => this.props.moveMapToMarker()}
            className="btn btn-secondary btn-sm" title="ver en el mapa">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
          </button>
          <Link to={`markers/${marker.id}/edit`} className="btn btn-info btn-sm"
            title="editar marcador">
            <FontAwesomeIcon icon={faEdit} />
          </Link>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => this.handleDeleteClick()}
            title="eliminar marcador"
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
  moveMapToMarker: PropTypes.func.isRequired,
};

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';
import { BrowserRouter as Router } from 'react-router';

export default class MarkerAvatarUploader extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.uploadFile = this.uploadFile.bind(this);
    this.state = {
      uploading: false,
      uploadProgress: 0,
    }
  }

  uploadFile() {
    this.setState({
      uploadProgress: 0,
      uploading: true,
    });
    const self = this;
    const file = this.fileInput.current.files[0];
    const storageRef = firebase.storage().ref()
    const avatarPath =  `markers/${this.props.markerId}/avatars/${file.name}`;
    const avatarRef = storageRef.child(avatarPath);
    const uploadTask = avatarRef.put(file);
    uploadTask.on('state_changed',
      function progress(snapshot) {
        const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        self.setState({
          uploadProgress: percentage,
        });
      },
      function error(err) {
        self.setState({
          uploading: false,
        });
      },
      function complete() {
        self.setState({
          uploading: false,
        });
        self.props.onUploadComplete(avatarPath);
      }
    )
  }
  render() {
    return (
      <React.Fragment>
        <div className="form-group">
          <div className="progress">
            <div className="progress-bar" role="progressbar" style={{width: `${this.state.uploadProgress}%`}}
              aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </div>
        <div className="form-group">
          <input type="file" ref={this.fileInput} disabled={this.state.uploading}/>
        </div>
        <div className="form-group">
          <button onClick={() => this.uploadFile()} className="btn btn-primary" disabled={this.state.uploading}>Cambiar foto</button>
        </div>
      </React.Fragment>
    );
  }
}

MarkerAvatarUploader.propTypes = {
  markerId: PropTypes.string.isRequired,
  onUploadComplete: PropTypes.func.isRequired,
};

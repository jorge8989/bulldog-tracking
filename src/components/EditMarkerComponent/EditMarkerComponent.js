import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class EditMarkerComponent extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-6">
          <br />
          <h2>Editar marcador</h2>
          <form>
            <div className="form-group">
              <label>Nombre</label>
              <input type="text" name="name" className="form-control" />
            </div>
            <div className="form-group">
              <label>Descripción</label>
              <input type="text" name="description" className="form-control" />
            </div>
            <div className="form-group">
              <label>Teléfono</label>
              <input type="number" name="phone" className="form-control" />
            </div>
            <div className="form-group">
              <label>Latitudd</label>
              <input type="number" name="latitude" className="form-control" />
            </div>
            <div className="form-group">
              <label>Longitud</label>
              <input type="number" name="longitude" className="form-control" />
            </div>
            <div className="form-group">
              <input type="submit" value="Guardar" className="btn btn-primary" />
            </div>
          </form>
          <Link to={'/'} className="btn btn-default">
            Volver
          </Link>
        </div>
      </div>
    );
  }
}
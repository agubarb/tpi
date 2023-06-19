import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

const tituloPagina = 'Proveedores';

class ProveedoresL extends Component {
  constructor(props) {
    super(props);

    this.state = {
        ProveedoresL: []
    };

    this.getProveedoresL = this.getProveedoresL.bind(this);
  }

  componentDidMount() {
    this.getProveedoresL();
  }

  getProveedoresL = async () => {
    try {
      const response = await Axios.get('http://localhost: /api/proveedores');
      this.setState({ ProveedoresL: response.data });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div>
        <div className="tituloPagina">{tituloPagina}</div>
        <Link className="btn btn-primary mt-2" to="/proveedores" role="button">
          Buscar proveedor
        </Link>
        <span className="m-4">-</span>
        <Link className="btn btn-primary mt-2" to="/proveedores/nuevo" role="button">
          Agregar proveedor
        </Link>
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th style={{ width: '10%' }}>Id proveedor</th>
              <th style={{ width: '20%' }}>Nombre</th>
              <th style={{ width: '20%' }}>Email</th>
              <th style={{ width: '10%' }}>Fecha Alta</th>
              <th style={{ width: '10%' }}>Telefono</th>
              <th style={{ width: '10%' }}>Activo</th>
            </tr>
          </thead>
          <tbody>
            {this.state.ProveedoresL.map((proveedor) => (
              <tr key={proveedor.id}>
                <td>{proveedor.id}</td>
                <td>{proveedor.nombre}</td>
                <td>{proveedor.email}</td>
                <td>{proveedor.fechaAlta}</td>
                <td>{proveedor.telefono}</td>
                <td>{proveedor.activo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export { ProveedoresL };
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ListadoProveedores = ({ lista }) => {
  const [mensaje, setMensaje] = useState('');
  const [proveedores, setProveedores] = useState([]);

  useEffect(() => {
    setProveedores(lista);
  }, [lista]);

  const deleteProveedores = async (IdProveedores) => {
    try {
      await axios.delete(`http://localhost:4000/api/proveedores/${IdProveedores}`);
      setMensaje('Proveedor eliminado correctamente');

      const updatedProveedores = proveedores.filter((item) => item.IdProveedores !== IdProveedores);
      setProveedores(updatedProveedores);
    } catch (error) {
      setMensaje('Error al eliminar el Proveedor');
    }
  };

  return (
    <div className="container mt-3">
      {mensaje && <div className="alert alert-success">{mensaje}</div>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>IdProveedores</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>FechaAlta</th>
            <th>Telefono</th>
            <th>Activo</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map((item) => (
            <tr key={item.IdProveedores}>
              <td>{item.IdProveedores}</td>
              <td>{item.Nombre}</td>
              <td>{item.FechaAlta}</td>
              <td>{item.Telefono}</td>
              <td>
                <Link className="btn btn-primary" to={"/editar/" + item.IdProveedores} role="button">
                  Editar
                </Link>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => deleteProveedores(item.IdProveedores)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListadoProveedores;
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const RegistroProveedores = () => {
  const navigate = useNavigate();
  const { IdProveedores } = useParams();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [fechaAlta, setFechaAlta] = useState("");
  const [telefono, setTelefono] = useState("");
  const [activo, setActivo] = useState("");
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (IdProveedores) {
          const response = await axios.get(`http://localhost:4000/api/proveedores/${IdProveedores}`);
          const { nombre, email, fechaAlta, telefono, activo } = response.data;
          setNombre(nombre);
          setEmail(email);
          setFechaAlta(fechaAlta);
          setTelefono(telefono);
          setActivo(activo);
        }
      } catch (error) {
        console.log("Error al obtener los datos del proveedor:", error);
      }
    };

    fetchData();
  }, [IdProveedores]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "nombre") {
      setNombre(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "fechaAlta") {
      setFechaAlta(value);
    } else if (name === "telefono") {
      setTelefono(value);
    } else if (name === "activo") {
      setActivo(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const proveedor = {
      nombre,
      email,
      fechaAlta,
      telefono,
      activo,
    };

    try {
      if (IdProveedores) {
        await axios.put(`http://localhost:4000/api/proveedores/${IdProveedores}`, proveedor);
        setMensaje("proveedor actualizado con éxito");
      } else {
        await axios.post("http://localhost:4000/api/proveedores", proveedor);
        setMensaje("proveedor creado con éxito");
      }
    } catch (error) {
      console.log("Error al enviar el formulario:", error);
    }
  };

  return (
    <div>
      <div className="col-sm-4 col-md-3 offset-md-1">
        <div className="tituloPagina">Proveedores</div>
        <div className="card-body">
          {mensaje && <div className="alert alert-success">{mensaje}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="nombre"
                value={nombre}
                onChange={handleInputChange}
                placeholder="Introducir nombre del proveedor"
              />
            </div>
            <div className="form-group">
              <input
                type="date"
                className="form-control"
                name="fechaAlta"
                value={fechaAlta}
                onChange={handleInputChange}
                placeholder="Introducir fecha Alta del proveedor"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="email"
                value={email}
                onChange={handleInputChange}
                placeholder="Introducir email del proveedor"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="telefono"
                value={telefono}
                onChange={handleInputChange}
                placeholder="Introducir telefono del proveedor"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="activo"
                value={activo}
                onChange={handleInputChange}
                placeholder="Introducir si es activo o no"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              <i className="fa fa-check"></i> {IdProveedores ? "Actualizar" : "Grabar"}
            </button>
            <Link className="btn btn-warning" to="/proveedoresL" role="button">
              Volver
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistroProveedores;
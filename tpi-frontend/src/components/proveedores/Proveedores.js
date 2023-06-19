import React, {  useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import ListadoProveedores from './ListadoProveedores'

const Proveedores = () => {
  const { register, handleSubmit } = useForm();
  
  const [lista, setLista] = useState(null);

  const onSubmit = async (data) => {
    try {
      const response = await axios.get('http://localhost:4000/api/proveedores', {
        params: data
      });
      
      console.log(response.data)

      setLista(response.data)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
     <h1 className="tituloPagina">Proveedores</h1>
     <hr />
      <div className="card mb-3">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">Nombre:</label>
              <input type="text" className="form-control" {...register('nombre')} />
            </div>
            <button type="submit" className="btn btn-primary">Buscar</button>
          </form>
        </div>
      </div>
      {lista && <ListadoProveedores lista={lista} />}
    </div>
  );
};

export {Proveedores};
import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Menu from "./components/Menu";
import { Footer } from "./components/Footer";
import { Inicio } from "./components/Inicio";
import { Proveedores } from "./components/proveedores/Proveedores";
import { ProveedoresL } from "./components/proveedoresL";
import ProveedoresRegistro from "./components/proveedores/ProveedoresRegistro";

const ProveedoresRegistroWrapper = (props) => {
  return <ProveedoresRegistro {...props} />;
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Menu />
        <div className="divBody">
          <Routes>
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/ProveedoresL" element={<ProveedoresL />} />
            <Route path="*" element={<Navigate to="/inicio" replace />} />
            <Route path="/proveedores" element={<Proveedores />} />
            <Route path="/editar/:id" element={<ProveedoresRegistroWrapper />} />
            <Route path="/proveedores/nuevo" element={<ProveedoresRegistroWrapper />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Dashboard from './views/Dashboard';
import Login from './views/Login';
import Productos from './views/Productos';
import Categorias from './views/Categorias';
import Clientes from './views/Clientes';
import Proveedores from './views/Proveedores';
import Entradas from './views/Entradas';
import PuntoDeVenta from './views/PuntoDeVentas';
import PrivateRoute from './components/utils/PrivateRoute';
import './App.css';

const App =() => {
  return (
    <Router>
        <Routes>
            <Route path ="/login" element={<Login />} exact/>
            <Route element={<PrivateRoute component={Dashboard} />}>
                <Route path="/dashboard" element={<Dashboard />}/>
            </Route>
            <Route element={<PrivateRoute component={Productos} exact/>}>
                <Route path="/productos" element={<Productos />}/>
            </Route>
            <Route element={<PrivateRoute component={Categorias} exact/>}>
                <Route path="/categorias" element={<Categorias />}/>
            </Route>
            <Route element={<PrivateRoute component={Clientes} exact/>}>
                <Route path="/clientes" element={<Clientes />}/>
            </Route>
            <Route element={<PrivateRoute component={Proveedores} exact/>}>
                <Route path="/proveedores" element={<Proveedores />}/>
            </Route>
            <Route element={<PrivateRoute component={Entradas} exact/>}>
                <Route path="/entradas" element={<Entradas />}/>
            </Route>
            <Route element={<PrivateRoute component={PuntoDeVenta} exact/>}>
                <Route path="/puntodeventa" element={<PuntoDeVenta />}/>
            </Route>
        </Routes>
    </Router>
  );  
}

export default App;

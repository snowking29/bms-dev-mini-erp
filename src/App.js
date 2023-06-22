import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route,  } from "react-router-dom";
import Dashboard from './components/views/Dashboard';
import Login from './components/views/Login';
import Productos from './components/views/Productos';
import Categorias from './components/views/Categorias';
import Clientes from './components/views/Clientes';
import Proveedores from './components/views/Proveedores';
import Entradas from './components/views/Entradas';
import PrivateRoute from './components/utils/PrivateRoute';
import Perfil from './components/views/Perfil';
import PuntoDeVentas from './components/views/PuntoDeVentas';
import Empleados from './components/views/Empleados';
import Salidas from './components/views/Salidas';
import Inventario from './components/views/Inventario';
import GuiaUsuario from './components/views/GuiaUsuario';
import './App.css';

const App =() => {

    return (
        <Router>
            <Routes>
                <Route path ="/" element={<Login />} exact/>
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
                    <Route path="/entradas" element={<Entradas  />}/>
                </Route>
                <Route element={<PrivateRoute component={Perfil} exact/>}>
                    <Route path="/perfil" element={<Perfil />}/>
                </Route>
                <Route element={<PrivateRoute component={PuntoDeVentas} exact/>}>
                    <Route path="/pos" element={<PuntoDeVentas />}/>
                </Route>
                <Route element={<PrivateRoute component={Empleados} exact/>}>
                    <Route path="/empleados" element={<Empleados />}/>
                </Route>
                <Route element={<PrivateRoute component={Salidas} exact/>}>
                    <Route path="/salidas" element={<Salidas />}/>
                </Route>
                <Route element={<PrivateRoute component={Inventario} exact/>}>
                    <Route path="/inventario" element={<Inventario />}/>
                </Route>
                <Route element={<PrivateRoute component={GuiaUsuario} exact/>}>
                <Route path="/guia_de_usuario" element={<GuiaUsuario />}/>
                </Route>
            </Routes>
        </Router>
    );  
}

export default App;

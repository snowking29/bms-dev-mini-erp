import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './components/views/Dashboard';
import Login from './components/views/Login';
import Productos from './components/views/Productos';
import Categorias from './components/views/Categorias';
import Clientes from './components/views/Clientes';
import Proveedores from './components/views/Proveedores';
import Entradas from './components/views/Entradas';
import PrivateRoute from './components/utils/PrivateRoute';
import Perfil from './components/views/Perfil';

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
                <Route element={<PrivateRoute component={Perfil} exact/>}>
                    <Route path="/perfil" element={<Perfil />}/>
                </Route>
            </Routes>
        </Router>
    );  
}

export default App;

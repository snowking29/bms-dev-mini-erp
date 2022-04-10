import React from 'react';
import classNames from "classnames";
import {Routes, Route} from 'react-router-dom';
import PrivateRoute from '../utils/PrivateRoute';
import { Container } from "reactstrap";
import Login from '../../views/Login';
import Home from '../../views/Home';
import Ventas from '../../views/Ventas';
import Productos from '../../views/Productos';
import Categorias from '../../views/Categorias';
import Clientes from '../../views/Clientes';
import TopBar from "./TopBar";

const Content = ({ sidebarIsOpen, toggleSidebar }) => (
    <Container 
        fluid 
        className="content"
    >
        <Routes>
            <Route path ="/login" element={<Login />} exact/>
            <Route element={<PrivateRoute component={Home} />}>
                <Route path="/principal" element={<Home />}/>
            </Route>
            <Route element={<PrivateRoute component={Ventas} exact/>}>
                <Route path="/ventas" element={<Ventas />}/>
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
        </Routes>
    </Container>
);  


export default Content;
import React from 'react';
import classNames from "classnames";
import {Routes, Route} from 'react-router-dom';
import PrivateRoute from '../utils/PrivateRoute';
import { Container } from "reactstrap";
import Login from '../../views/Login';
import Home from '../../views/Home';
import Productos from '../../views/Productos';
import Categorias from '../../views/Categorias';
import Clientes from '../../views/Clientes';
import Proveedores from '../../views/Proveedores';
import TopBar from "./TopBar";

const Content = ({ sidebarIsOpen, toggleSidebar }) => (
    <Container 
        fluid 
        className={classNames("content", { "is-open": sidebarIsOpen })}
    >
        <TopBar toggleSidebar={toggleSidebar} />
        <Routes>
            <Route path ="/login" element={<Login />} exact/>
            <Route element={<PrivateRoute component={Home} />}>
                <Route path="/principal" element={<Home />}/>
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
        </Routes>
    </Container>
);  


export default Content;
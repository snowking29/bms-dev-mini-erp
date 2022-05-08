import React, { useState, useEffect } from 'react';
import * as rs from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icon from '@fortawesome/free-solid-svg-icons';
import RegistroProveedores from "../registro/registro_proveedores";
import * as provider_services from '../../api/services/provider-services';
import Loader from "../utils/loader";
import DetalleProveedor from "../detalle/detalle_proveedores";

function Proveedores () {
    
    const [action, setAction] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [proveedores, setProveedores] = useState([]);
    const initialFormState = {}
    const [currentProvider , setCurrentProvider] = useState(initialFormState)

    function showRegistroProveedores(){
        setAction("registrar")
    }

    useEffect(() => {
        getProviders();
    },[])

    function getProviders () {
        setShowLoader(true);
        provider_services.getProviders().then( (response) => {
            setShowLoader(false);
            if (response.status === 200) {
                var filas = [];
                let body = response.data.data
                if (Array.isArray(body)) {
                    body.forEach( a => {
                        filas.push(
                            <tr key= {a.key}>
                                <td>{a.identifyID}</td>
                                <td>{a.fullName}</td>
                                <td>{a.phone.replace(/\s/g, '')}</td>
                                <td>{a.address} {a.city} </td>
                                <td>{a.email}</td>
                                <td>{a.details}</td>
                                <td>{a.creationTime}</td>
                                <td>{a.modifiedTime}</td>
                                <td>
                                    <FontAwesomeIcon icon={icon.faCheckSquare}
                                        className= 'select-button'
                                        type="button" 
                                        title="Seleccionar"
                                        onClick = { () => {
                                            setAction("detalle")
                                            setCurrentProvider(a)
                                        }}
                                    />
                                    
                                </td>
                            </tr>
                        )
                    })
                }
                setProveedores(filas);
            } else if(response.status === 401) {
                console.log("NOT AUTHORIZED, AUTH AGAIN OR REDIRECT TO LOGIN")
            }
        })
    }

    function actualizarTabla () {
        if (proveedores.length !== 0 || typeof(proveedores) !== 'undefined'){
            getProviders()
        }
    }

    function selectAction(value){
        setAction(value)
    }

    return (
        <div>
            {action === "detalle" ? <DetalleProveedor dataProveedor={currentProvider} actualizaResultados={actualizarTabla} selectAction={selectAction}/> :
            action === "registrar" ? <RegistroProveedores actualizaResultados={actualizarTabla} selectAction={selectAction}/> :
                <rs.Card className='card'>
                    <rs.CardHeader className='header'>
                        <rs.Row>
                            <rs.Col sm={10}>
                                <h3><FontAwesomeIcon icon={icon.faListNumeric}/> Listas Proveedores</h3>
                            </rs.Col>
                            <rs.Col sm={2}>
                                <rs.Button 
                                    className='button'
                                    value="Registrar"
                                    onClick={showRegistroProveedores}
                                >
                                    <FontAwesomeIcon icon={icon.faPlusCircle}/> Nuevo
                                </rs.Button>
                            </rs.Col>
                        </rs.Row>
                    </rs.CardHeader>
                    <rs.CardBody className='body'>
                        <rs.Form>
                            <rs.Row>
                                <rs.Col sm={4}>
                                    <rs.FormGroup row>
                                        <rs.Label for="providerFromDate" sm={4}>
                                            Fecha Inicio
                                        </rs.Label>
                                        <rs.Col sm={8}>
                                            <rs.Input
                                                id="providerFromDate"
                                                name="date"
                                                placeholder="date placeholder"
                                                type="date"
                                            />
                                        </rs.Col>
                                    </rs.FormGroup>
                                </rs.Col>
                                <rs.Col sm={4}>
                                    <rs.FormGroup row>
                                        <rs.Label for="providerToDate" sm={4}>
                                            Fecha Fin
                                        </rs.Label>
                                        <rs.Col sm={8}>
                                            <rs.Input
                                                id="providerToDate"
                                                name="date"
                                                placeholder="date placeholder"
                                                type="date"
                                            />
                                        </rs.Col>
                                    </rs.FormGroup>
                                </rs.Col>
                                <rs.Col sm={4}>
                                    <rs.InputGroup>
                                        <rs.Input
                                            id="searchProvider"
                                            name="Search"
                                            placeholder="Buscar"
                                            type="search"
                                        />
                                        <rs.InputGroupText>
                                            <FontAwesomeIcon icon={icon.faSearch}/>
                                        </rs.InputGroupText>
                                    </rs.InputGroup>
                                </rs.Col>
                            </rs.Row>
                        </rs.Form>
                        <hr/>
                        {showLoader ? <Loader /> :
                            <rs.Form>
                                <rs.FormGroup>
                                    <rs.Table responsive className='styled-table'>
                                        <thead>
                                            <tr>
                                                <th style={{width: "5%"}}>
                                                    Documento
                                                </th>
                                                <th style={{width: "10%"}}>
                                                    Nombres
                                                </th>
                                                <th style={{width: "10%"}}>
                                                    Telefono
                                                </th>
                                                <th style={{width: "15%"}}>
                                                    Direccion
                                                </th>
                                                <th style={{width: "10%"}}>
                                                    Email
                                                </th>
                                                <th style={{width: "25%"}}>
                                                    Detalles
                                                </th>
                                                <th style={{width: "10%"}}>
                                                    F. Creacion
                                                </th>
                                                <th style={{width: "10%"}}>
                                                    F. Modificacion
                                                </th>
                                                <th>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {proveedores}
                                        </tbody>
                                    </rs.Table>
                                    {proveedores.length === 0 ?
                                        <h5 className="noData">
                                            No data.
                                        </h5>
                                    :<hr/>}
                                </rs.FormGroup>
                            </rs.Form>
                        }
                    </rs.CardBody>
                </rs.Card>
            }
        </div>
    )
}

export default Proveedores;
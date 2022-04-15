import React, { useState, useEffect } from 'react';
import * as rs from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icon from '@fortawesome/free-solid-svg-icons';
import RegistroClientes from "../components/registro/registro_clientes";
import * as customer_services from '../api/services/customer-services';
import Loader from "../components/utils/loader";
import DetalleCliente from "../components/detalle/detalle_clientes";

function Clientes () {
    
    const [action, setAction] = useState(false);
    const [btnActionTxt, setBtnActionTxt] = useState("Agregar");
    const [showLoader, setShowLoader] = useState(false);
    const [searchCust, setSearchCust] = useState("");
    const [clientes, setClientes] = useState([]);
    const initialFormState = {}
    const [currentCustomer , setCurrentCustomer] = useState(initialFormState)

    function showRegistroClientes(){
        if (btnActionTxt === "Agregar"){
            setAction("registrar")
        }
    }

    function actualizarTabla () {
        if (clientes.length !== 0 || typeof(clientes) !== 'undefined'){
            getCustomers()
        }
    }


    useEffect(() => {
        getCustomers();
    },[])

    function getCustomers () {
        setShowLoader(true);
        customer_services.getCustomers().then( (response) => {
            setShowLoader(false);
            if (response.status === 200) {
                var filas = [];
                let body = response.data.data
                if (Array.isArray(body)) {
                    body.forEach( a => {
                        filas.push(
                            <tr key= {a.key}>
                                <td>{a.name} {a.lastname}</td>
                                <td>{a.address} - {a.city} </td>
                                <td>{a.phone.replace(/\s/g, '')}</td>
                                <td>{a.email}</td>
                                <td>{a.identifyID}</td>
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
                                            setCurrentCustomer(a)
                                        }}
                                    />
                                    
                                </td>
                            </tr>
                        )
                    })
                }
                setClientes(filas);
            } else if(response.status === 401) {
                console.log("NOT AUTHORIZED, AUTH AGAIN OR REDIRECT TO LOGIN")
            }
        })
    }

    function getCustomerSearched(value){
        setSearchCust(value)
    }

    function selectAction(value){
        setAction(value)
    }

    return (
        <div>
            {action === "detalle" ? <DetalleCliente dataCliente={currentCustomer} actualizaResultados={actualizarTabla}/> :
                    action === "registrar" ? <RegistroClientes actualizaResultados={actualizarTabla} selectAction={selectAction}/> :
                <rs.Card className='card'>
                    <rs.CardHeader className='header'>
                        <rs.Row>
                            <rs.Col sm={10}>
                                <h2>&nbsp;Lista Clientes</h2>
                            </rs.Col>
                            <rs.Col sm={2}>
                                    <rs.Button 
                                        className='button'
                                        value={btnActionTxt} 
                                        onClick={showRegistroClientes}
                                    >
                                       <FontAwesomeIcon icon={icon.faPlusCircle}/> Agregar
                                    </rs.Button>
                            </rs.Col>
                        </rs.Row>
                    </rs.CardHeader>
                    <rs.CardBody className='body'>
                        <rs.Row>
                            <rs.Col sm={4}>
                                <rs.FormGroup row>
                                    <rs.Label for="productFromDate" sm={4}>
                                        Fecha Inicio
                                    </rs.Label>
                                    <rs.Col sm={8}>
                                        <rs.Input
                                            id="productFromDate"
                                            name="date"
                                            placeholder="date placeholder"
                                            type="date"
                                        />
                                    </rs.Col>
                                </rs.FormGroup>
                            </rs.Col>
                            <rs.Col sm={4}>
                                <rs.FormGroup row>
                                    <rs.Label for="productToDate" sm={4}>
                                        Fecha Fin
                                    </rs.Label>
                                    <rs.Col sm={8}>
                                        <rs.Input
                                            id="productToDate"
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
                                        id="searchCust"
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
                        <hr/>
                        {showLoader ? <Loader /> :
                            <rs.Form>
                                <rs.FormGroup>
                                    <rs.Table responsive className='styled-table'>
                                        <thead>
                                            <tr>
                                                <th style={{width: "30%"}}>
                                                    Nombres
                                                </th>
                                                <th style={{width: "30%"}}>
                                                    Direccion
                                                </th>
                                                <th style={{width: "0%"}}>
                                                    Telefono
                                                </th>
                                                <th style={{width: "0%"}}>
                                                    Email
                                                </th>
                                                <th style={{width: "0%"}}>
                                                    DNI/RUC
                                                </th>
                                                <th style={{width: "20%"}}>
                                                    Detalles
                                                </th>
                                                <th style={{width: "10%"}}>
                                                    F. de creacion
                                                </th>
                                                <th style={{width: "10%"}}>
                                                    F. de modificacion
                                                </th>
                                                <th>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {clientes}
                                        </tbody>
                                    </rs.Table>
                                </rs.FormGroup>
                            </rs.Form>
                        }
                    </rs.CardBody>
                </rs.Card>
            }
        </div>
    )
}

export default Clientes;
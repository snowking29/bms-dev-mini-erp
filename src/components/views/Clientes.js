import React, { useState, useEffect } from 'react';
import * as rs from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icon from '@fortawesome/free-solid-svg-icons';
import RegistroClientes from "../registro/registro_clientes";
import * as customer_services from '../../api/services/customer-services';
import Loader from "../utils/loader";
import DetalleCliente from "../detalle/detalle_clientes";

function Clientes (props) {
    
    const [action, setAction] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [search, setSearch] = useState("");
    const [clientes, setClientes] = useState([]);
    const initialFormState = {}
    const [currentCustomer , setCurrentCustomer] = useState(initialFormState)

    function showRegistroClientes(){
        setAction("registrar")
    }

    function actualizarTabla () {
        if (clientes.length !== 0 || typeof(clientes) !== 'undefined'){
            getCustomers()
        }
    }


    useEffect(() => {
        getCustomers();
    },[search])

    function getCustomers () {
        setShowLoader(true);
        customer_services.getCustomers().then( (response) => {
            setShowLoader(false);
            if (response.status === 200) {
                var filas = [];
                let body = response.data.data
                if (Array.isArray(body)) {
                    body.filter(val => {
                        if(search === ''){
                            return val;
                        } else if (val.identifyID.toLowerCase().includes(search.toLocaleLowerCase())
                            || val.fullName.toLowerCase().includes(search.toLocaleLowerCase())
                            || val.phone.toLowerCase().includes(search.toLocaleLowerCase())
                            || val.email.toLowerCase().includes(search.toLocaleLowerCase())){
                            return val
                        }
                    }).forEach( a => {
                        filas.push(
                            <tr key= {a.key}>
                                <td>{a.identifyID}</td>
                                <td>{a.fullName}</td>
                                <td>{a.phone.replace(/\s/g, '')}</td>
                                <td>{a.email}</td>
                                <td>
                                    <FontAwesomeIcon icon={icon.faEdit}
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

    function selectAction(value){
        setAction(value)
    }

    return (
        <div>
            {action === "detalle" ? <DetalleCliente dataCliente={currentCustomer} actualizaResultados={actualizarTabla} selectAction={selectAction}/> :
            action === "registrar" ? <RegistroClientes actualizaResultados={actualizarTabla} selectAction={selectAction}/> :
                <rs.Card className='card'>
                    <rs.CardHeader className='header'>
                        <rs.Row>
                            <rs.Col sm={10}>
                                <h3><FontAwesomeIcon icon={icon.faListNumeric}/> Lista Clientes</h3>
                            </rs.Col>
                            <rs.Col sm={2}>
                                    <rs.Button 
                                        className='button'
                                        value="Agregar" 
                                        onClick={showRegistroClientes}
                                    >
                                       <FontAwesomeIcon icon={icon.faPlusCircle}/> Nuevo
                                    </rs.Button>
                            </rs.Col>
                        </rs.Row>
                    </rs.CardHeader>
                    <rs.CardBody className='body'>
                        <rs.InputGroup>
                            <rs.Input
                                id="searchCustomer"
                                name="Search"
                                placeholder="Buscar por dni/ruc, nombres, telefono o email"
                                type="search"
                                style={{ textAlign: 'center'}}
                                onChange={(e)=>{
                                    setSearch(e.target.value)
                                }}
                            />
                            <rs.InputGroupText>
                                <FontAwesomeIcon icon={icon.faSearch}/>
                            </rs.InputGroupText>
                        </rs.InputGroup>
                        <br/>
                        {showLoader ? <Loader /> :
                            <rs.Form>
                                <rs.Table className='fl-table' responsive>
                                    <thead>
                                        <tr>
                                            <th>
                                                NRO. DOCUMENTO
                                            </th>
                                            <th>
                                                NOMBRES
                                            </th>
                                            <th>
                                                TELEFONO
                                            </th>
                                            <th>
                                                EMAIL
                                            </th>
                                            <th>
                                                
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {clientes}
                                    </tbody>
                                </rs.Table>
                                {clientes.length === 0 ?
                                    <h5 className="noData">
                                        No data.
                                    </h5>
                                : <span/>}
                            </rs.Form>
                        }
                    </rs.CardBody>
                </rs.Card>
            }
        </div>
    )
}

export default Clientes;
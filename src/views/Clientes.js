import React, { useState, useEffect } from 'react';
import * as rs from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icon from '@fortawesome/free-solid-svg-icons';
import RegistroClientes from "../components/registro/registro_clientes";
import * as customer_services from '../api/services/customer-services';

function Clientes () {
    
    const [action, setAction] = useState(false);
    const [btnActionTxt, setBtnActionTxt] = useState("Agregar");
    const [btnIcon, setBtnIcon] = useState(<FontAwesomeIcon icon={icon.faPlusCircle}/>);
    const [searchCust, setSearchCust] = useState("");
    const [clientes, setClientes] = useState([]);
    const [key, setKey] = useState([]);

    useEffect(() => {
        customer_services.getCustomers().then( (response) => {
            if (response.status === 200) {
                var filas = [];
                let body = response.data.data
                if (Array.isArray(body)) {
                    body.forEach( a => {
                        filas.push(
                            <tr key= {a.code}>
                                <td>{body.indexOf(a)+1}</td>
                                <td>{a.name} {a.lastname}</td>
                                <td>{a.address} - {a.city} </td>
                                <td>{a.phone.replace(/\s/g, '')}</td>
                                <td>{a.email}</td>
                                <td>{a.identifyID}</td>
                                <td>{a.details}</td>
                                <td>{a.creationTime}</td>
                                <td>{a.modifiedTime}</td>
                                <td>
                                    <FontAwesomeIcon icon={icon.faEdit}
                                        type="button" 
                                        title="Editar cliente"
                                    />
                                    {' '}
                                    <FontAwesomeIcon icon={icon.faTrash}
                                        type="button" 
                                        title="Eliminar cliente" 
                                        onClick = { () => {
                                            if (window.confirm('�Est� seguro que desea eliminar el cliente?'))
                                                eliminarCliente(a.code)
                                        }}/>
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
    },[])

    function showRegistroClientes(){
        if (btnActionTxt === "Agregar"){
            setBtnIcon(<FontAwesomeIcon icon={icon.faFilter}/>)
            setBtnActionTxt("Filtros")
        }else{
            setBtnIcon(<FontAwesomeIcon icon={icon.faPlusCircle}/>)
            setBtnActionTxt("Agregar")
        }
        setAction(!action)
    }

    function getCustomerSearched(value){
        setSearchCust(value)
    }

    function eliminarCliente(key){
        setKey(key)
    }

    useEffect(() => {
        return () => {
            if (key.length !== 0) {
                customer_services.deleteCustomer(key).then((response) => {
                    if (response) {
                        if ( response.status === 200 ) {
                            setKey(null)
                        }
                    }
                })
            }
        }
    }, [key])

    return (
        <div>
            <rs.Container fluid className="p-8" responsive>
                <rs.Row>
                    <rs.Col sm={9}>
                        <rs.Card>
                            <rs.CardHeader className='card-header'>
                                <rs.Row>
                                    <rs.Col sm={10}>
                                        <h2>&nbsp;Administrar Clientes</h2>
                                    </rs.Col>
                                    <rs.Col sm={2}>
                                            <rs.Button color="primary" value={btnActionTxt} onClick={showRegistroClientes}>{btnIcon} {btnActionTxt} </rs.Button>
                                    </rs.Col>
                                </rs.Row>
                            </rs.CardHeader>
                            <rs.CardBody>
                                <rs.Form>
                                    <rs.FormGroup>
                                        <rs.Table responsive className='styled-table'>
                                            <thead>
                                                <tr>
                                                    <th style={{width: "0%"}}>
                                                        #
                                                    </th>
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
                            </rs.CardBody>
                        </rs.Card>
                    </rs.Col>
                    {action ? <RegistroClientes /> :
                        <rs.Col sm={3}>
                            <rs.Card>
                                <rs.CardHeader className="h4 card-filters">
                                    <FontAwesomeIcon icon={icon.faFilter}/>
                                    {' '}
                                    Filtros
                                </rs.CardHeader>
                                <rs.CardBody>
                                    <rs.Form>
                                        <rs.FormGroup>
                                            <rs.Col sm={12} className='card-header-search-input'>
                                                <rs.InputGroup>
                                                    <rs.Input
                                                        id="searchCust"
                                                        name="Search"
                                                        placeholder="Buscar"
                                                        type="search"
                                                        onChange={(e) => getCustomerSearched(e.target.value)}
                                                    />
                                                    <rs.InputGroupText>
                                                        <FontAwesomeIcon icon={icon.faSearch}/>
                                                    </rs.InputGroupText>
                                                </rs.InputGroup>
                                            </rs.Col>
                                        </rs.FormGroup>
                                        <rs.FormGroup>
                                            <rs.Label>
                                                <FontAwesomeIcon icon={icon.faCalendar}/> Rango de Fechas
                                            </rs.Label>
                                            <rs.Col sm={6}>
                                                <rs.Input
                                                    name="rbtnDateType"
                                                    type="radio"
                                                />
                                                {' '}
                                                F. de Creacion
                                            </rs.Col>
                                            <rs.Col sm={6}>
                                                <rs.Input
                                                    name="rbtnDateType"
                                                    type="radio"
                                                />
                                                {' '}
                                                F. de Modificacion
                                            </rs.Col>
                                        </rs.FormGroup>
                                        <rs.FormGroup>
                                            <rs.Col sm={12}>
                                                <rs.Label for="customerFromDate">
                                                    Desde
                                                </rs.Label>
                                                <rs.Input
                                                    id="customerFromDate"
                                                    name="date"
                                                    placeholder="date placeholder"
                                                    type="date"
                                                />
                                            </rs.Col>
                                            <br/>
                                            <rs.Col sm={12}>
                                                <rs.Label for="customerToDate">
                                                    Hasta
                                                </rs.Label>
                                                <rs.Input
                                                    id="customerToDate"
                                                    name="date"
                                                    placeholder="date placeholder"
                                                    type="date"
                                                />
                                            </rs.Col>
                                        </rs.FormGroup>
                                        <rs.Button color="success">
                                            <FontAwesomeIcon icon={icon.faCheck}/>{' '}Aplicar
                                        </rs.Button>
                                    </rs.Form>
                                </rs.CardBody>
                            </rs.Card>
                        </rs.Col>
                    }
                </rs.Row>
            </rs.Container>
        </div>
    )
}

export default Clientes;
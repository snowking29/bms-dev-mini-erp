import React, { useState, useEffect } from 'react';
import * as rs from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icon from '@fortawesome/free-solid-svg-icons';
import RegistroEntrada from "../components/registro/registro_entradas";
import * as entry_services from '../api/services/entry-services';
import Loader from "../components/utils/loader";
import DetalleProducto from "../components/detalle/detalle_productos";
import * as provider_services from '../api/services/provider-services';

function Entradas () {

    const [action, setAction] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [entradas, setEntradas] = useState([]);
    const initialFormState = {}
    const [currentEntry , setCurrentEntry] = useState(initialFormState)
    const [btnActionTxt, setBtnActionTxt] = useState("Agregar");

    function showRegistroEntradas(){
        if (btnActionTxt === "Agregar"){
            setAction("registrar")
        }
    }

    useEffect(() => {
        getEntryTable();
    },[])

    function getEntryTable () {
        /*setShowLoader(true);
        entry_services.getEntries().then( (response) => {
            setShowLoader(false);
            if (response.status === 200){
                var filas = [];
                let body = response.data.data

                if (Array.isArray(body)) {
                    body.forEach( a => {
                        filas.push(
                            <tr key= {a.key}>
                                <td>{a.creationTime}</td>
                                <td>{a.code}</td>
                                <td>{a.user}</td>
                                <td>{a.total}</td>
                                <td>
                                    <FontAwesomeIcon icon={icon.faCheckSquare}
                                        type="button" 
                                        className= 'select-button'
                                        title="Seleccionar"
                                        onClick = { () => {
                                            setAction("detalle")
                                            setCurrentEntry(a)
                                        }}
                                    />
                                </td>
                            </tr>
                        )
                    })
                }
                setEntradas(filas);
            } else if(response.status === 401) {
                console.log("NOT AUTHORIZED, AUTH AGAIN OR REDIRECT TO LOGIN")
            }
        })*/
    }

    function actualizarTabla () {
        if (entradas.length !== 0 || typeof(entradas) !== 'undefined'){
            getEntryTable()
        }
    }

    function selectAction(value){
        setAction(value)
    }

    return (
        <div>
            {action === "detalle" ? <DetalleProducto dataProducto={currentEntry} actualizaResultados={actualizarTabla}/> :
            action === "registrar" ? <RegistroEntrada actualizaResultados={actualizarTabla} selectAction={selectAction}/> :
                <rs.Card className='card'>
                    <rs.CardHeader className='header'>
                        <rs.Row>
                            <rs.Col sm={10}>
                                <h3><FontAwesomeIcon icon={icon.faListNumeric}/> Lista de Entradas</h3>
                            </rs.Col>
                            <rs.Col sm={2}>
                                <rs.Button 
                                    className='button'
                                    value="Registrar"
                                    onClick={showRegistroEntradas}
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
                                        <rs.Label for="entryFromDate" sm={4}>
                                            Fecha Inicio
                                        </rs.Label>
                                        <rs.Col sm={8}>
                                            <rs.Input
                                                id="entryFromDate"
                                                name="date"
                                                placeholder="date placeholder"
                                                type="date"
                                            />
                                        </rs.Col>
                                    </rs.FormGroup>
                                </rs.Col>
                                <rs.Col sm={4}>
                                    <rs.FormGroup row>
                                        <rs.Label for="entryToDate" sm={4}>
                                            Fecha Fin
                                        </rs.Label>
                                        <rs.Col sm={8}>
                                            <rs.Input
                                                id="entryToDate"
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
                                            id="searchEntry"
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
                                                <th style={{width: "10%"}}>
                                                    Fecha de Creacion
                                                </th>
                                                <th style={{width: "10%"}}>
                                                    Nro de Documento
                                                </th>
                                                <th style={{width: "10%"}}>
                                                    Usuario Registro
                                                </th>
                                                <th style={{width: "5%"}}>
                                                    Total
                                                </th>
                                                <th style={{width: "10%"}}>
                                                    Proveedor
                                                </th>
                                                <th style={{width: "10%"}}>
                                                    Codigo Producto
                                                </th>
                                                <th style={{width: "15%"}}>
                                                    Descripcion Producto
                                                </th>
                                                <th style={{width: "10%"}}>
                                                    Categoria Producto
                                                </th>
                                                <th style={{width: "5%"}}>
                                                    Precio Compra
                                                </th>
                                                <th style={{width: "5%"}}>
                                                    Precio Venta
                                                </th>
                                                <th style={{width: "5%"}}>
                                                    Cantidad
                                                </th>
                                                <th style={{width: "5%"}}>
                                                    Sub Total
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {entradas}
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

export default Entradas;
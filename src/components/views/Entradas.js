import React, { useState, useEffect } from 'react';
import * as rs from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icon from '@fortawesome/free-solid-svg-icons';
import RegistroEntrada from "../registro/registro_entradas";
import * as entry_services from '../../api/services/entry-services';
import Loader from "../utils/loader";
import DetalleEntrada from "../detalle/detalle_entradas";

function Entradas (props) {

    const [action, setAction] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [entradas, setEntradas] = useState([]);
    const initialFormState = {}
    const [currentEntry , setCurrentEntry] = useState(initialFormState)

    function showRegistroEntradas(){
        setAction("registrar")
    }

    useEffect(() => {
        getEntryTable();
    },[])

    function getEntryTable () {
        setShowLoader(true);
        entry_services.getEntries().then( (response) => {
            setShowLoader(false);
            if (response.status === 200){
                var filas = [];
                let body = response.data.data

                if (Array.isArray(body)) {
                    body.forEach( a => {
                        a.entries.forEach( e => {
                            filas.push(
                                <tr key= {a.code.concat(e.code)}>
                                    <td>{a.creationTime}</td>
                                    <td>{a.code}</td>
                                    <td>{a.user}</td>
                                    <td>{a.total}</td>
                                    <td>{a.provider}</td>
                                    <td>{e.code}</td>
                                    <td>{e.name}</td>
                                    <td>{e.category}</td>
                                    <td>{e.warehouse}</td>
                                    <td>{e.priceCost}</td>
                                    <td>{e.priceSale}</td>
                                    <td>{e.quantity}</td>
                                    <td>{e.subTotal}</td>
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
                    })
                }
                setEntradas(filas);
            } else if(response.status === 401) {
                console.log("NOT AUTHORIZED, AUTH AGAIN OR REDIRECT TO LOGIN")
            }
        })
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
            {action === "detalle" ? <DetalleEntrada currentUser={props.currentUser} dataEntrada={currentEntry} actualizaResultados={actualizarTabla} selectAction={selectAction}/> :
            action === "registrar" ? <RegistroEntrada currentUser={props.currentUser} actualizaResultados={actualizarTabla} selectAction={selectAction}/> :
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
                        {showLoader ? <Loader /> :
                            <rs.Form>
                                <rs.FormGroup>
                                    <rs.Table responsive className='styled-table'>
                                        <thead>
                                            <tr>
                                                <th>
                                                    Fecha Registro
                                                </th>
                                                <th>
                                                    Nro de Documento
                                                </th>
                                                <th>
                                                    Usuario Registro
                                                </th>
                                                <th>
                                                    Total
                                                </th>
                                                <th>
                                                    Proveedor
                                                </th>
                                                <th>
                                                    Codigo Producto
                                                </th>
                                                <th>
                                                    Nombre Producto
                                                </th>
                                                <th>
                                                    Categoria Producto
                                                </th>
                                                <th>
                                                    Almacen
                                                </th>
                                                <th>
                                                    Precio Compra
                                                </th>
                                                <th>
                                                    Precio Venta
                                                </th>
                                                <th>
                                                    Cantidad
                                                </th>
                                                <th>
                                                    Sub Total
                                                </th>
                                                <th>

                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {entradas}
                                        </tbody>
                                    </rs.Table>
                                    {entradas.length === 0 ?
                                        <h5 className="noData">
                                            No data.
                                        </h5>
                                    : <hr/>}
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
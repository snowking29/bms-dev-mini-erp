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
    const [search, setSearch] = useState("");

    function showRegistroEntradas(){
        setAction("registrar")
    }

    useEffect(() => {
        getEntryTable();
    },[search])

    function getEntryTable () {
        setShowLoader(true);
        entry_services.getEntries().then( (response) => {
            setShowLoader(false);
            if (response.status === 200){
                var filas = [];
                let body = response.data.data

                if (Array.isArray(body)) {
                    body.filter(val=>{
                        if(search === ''){
                            return val;
                        } else if (val.code.toLowerCase().includes(search.toLocaleLowerCase())
                            || val.user.toLowerCase().includes(search.toLocaleLowerCase())
                            || val.creationTime.toLowerCase().includes(search.toLocaleLowerCase())){
                            return val
                        }
                    }).forEach( a => {
                        a.entries.forEach( e => {
                            filas.push(
                                <tr key= {a.code.concat(e.code)}>
                                    <td>{a.creationTime}</td>
                                    <td>{a.code}</td>
                                    <td>{a.user}</td>
                                    <td>S/.{a.total}</td>
                                    <td>{a.provider}</td>
                                    <td>{e.code}</td>
                                    <td>{e.name}</td>
                                    <td>{e.category}</td>
                                    <td>{e.warehouse}</td>
                                    <td>S/.{e.priceCost}</td>
                                    <td>S/.{e.priceSale}</td>
                                    <td>{e.quantity}</td>
                                    <td>S/.{e.subTotal}</td>
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

    /*
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
    */

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
                        <rs.InputGroup>
                            <rs.Input
                                id="searchEntry"
                                name="Search"
                                placeholder="Buscar registro, documento, usuario..."
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
                                                REGISTRO
                                            </th>
                                            <th>
                                                DOCUMENTO
                                            </th>
                                            <th>
                                                USUARIO
                                            </th>
                                            <th>
                                                IMPORTE
                                            </th>
                                            <th>
                                                PROVEEDOR
                                            </th>
                                            <th>
                                                ITEM
                                            </th>
                                            <th>
                                                NOMBRE
                                            </th>
                                            <th>
                                                CATEGORIA
                                            </th>
                                            <th>
                                                ALAMACEN
                                            </th>
                                            <th>
                                                COMPRA
                                            </th>
                                            <th>
                                                VENTA
                                            </th>
                                            <th>
                                                CANT
                                            </th>
                                            <th>
                                                SUB. TOTAL
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
                                : <span/>}
                            </rs.Form>
                        }
                    </rs.CardBody>
                </rs.Card>
            }
        </div>
    )
}

export default Entradas;
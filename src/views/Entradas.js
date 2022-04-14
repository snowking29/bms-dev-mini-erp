import React, { useState, useEffect } from 'react';
import * as rs from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icon from '@fortawesome/free-solid-svg-icons';
import RegistroEntrada from "../components/registro/registro_entradas";
import * as entry_services from '../api/services/entry-services';
import Loader from "../components/utils/loader";
import DetalleProducto from "../components/detalle/detalle_productos";

function Entradas () {

    const [action, setAction] = useState("filtros");
    const [btnActionTxt, setBtnActionTxt] = useState("Agregar");
    const [btnIcon, setBtnIcon] = useState(<FontAwesomeIcon icon={icon.faPlusCircle}/>);
    const [showLoader, setShowLoader] = useState(false);
    const [entradas, setEntradas] = useState([]);
    const initialFormState = {}
    const [currentEntry , setCurrentEntry] = useState(initialFormState)

    function showRegistroEntradas(){
        if (btnActionTxt === "Agregar"){
            setBtnIcon(<FontAwesomeIcon icon={icon.faFilter}/>)
            setBtnActionTxt("Filtros")
            setAction("registrar")
        }else{
            setBtnIcon(<FontAwesomeIcon icon={icon.faPlusCircle}/>)
            setBtnActionTxt("Agregar")
            setAction("filtrar")
        }
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
                        filas.push(
                            <tr key= {a.key}>
                                <td>{body.indexOf(a)+1}</td>
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
        })
    }

    function actualizarTabla () {
        if (entradas.length !== 0 || typeof(entradas) !== 'undefined'){
            getEntryTable()
        }
    }

    return (
        <div>
            <rs.Row>
                <rs.Col sm={9}>
                    <rs.Card className='card'>
                        <rs.CardHeader className='header'>
                            <rs.Row>
                                <rs.Col sm={10}>
                                    <h2>&nbsp;Administrar Entradas</h2>
                                </rs.Col>
                                <rs.Col sm={2}>
                                        <rs.Button 
                                            className='button'
                                            value={btnActionTxt} 
                                            onClick={showRegistroEntradas}
                                        >
                                            {btnIcon} {btnActionTxt} 
                                        </rs.Button>
                                </rs.Col>
                            </rs.Row>
                        </rs.CardHeader>
                        <rs.CardBody className='body'>
                            {showLoader ? <Loader /> :
                                <rs.Form>
                                    <rs.FormGroup>
                                        <rs.Table responsive className='styled-table'>
                                            <thead>
                                                <tr>
                                                    <th>
                                                        #
                                                    </th>
                                                    <th style={{width: "10%"}}>
                                                        Fecha de Registro
                                                    </th>
                                                    <th style={{width: "10%"}}>
                                                        Nro de Documento
                                                    </th>
                                                    <th style={{width: "10%"}}>
                                                        Usuario Registro
                                                    </th>
                                                    <th style={{width: "10%"}}>
                                                        Monto Total
                                                    </th>
                                                    <th style={{width: "10%"}}>
                                                        Proveedor
                                                    </th>
                                                    <th style={{width: "10%"}}>
                                                        Codigo Producto
                                                    </th>
                                                    <th style={{width: "10%"}}>
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
                </rs.Col>
                {action === "detalle" ? <DetalleProducto dataEntrad={currentEntry} actualizaResultados={actualizarTabla}/> : 
                    action === "registrar" ? <RegistroEntrada actualizaResultados={actualizarTabla}/> :
                        <rs.Col sm={3}>
                            <rs.Card className='card'>
                                <rs.CardHeader className="h4 filters">
                                    <FontAwesomeIcon icon={icon.faFilter}/>
                                    {' '}
                                    Filtros
                                </rs.CardHeader>
                                <rs.CardBody>
                                    <rs.Form>
                                        <rs.FormGroup>
                                            <rs.Col sm={12} className='search-input'>
                                                <rs.InputGroup>
                                                    <rs.Input
                                                        id="searchCat"
                                                        name="Search"
                                                        placeholder="Buscar"
                                                        type="search"
                                                    />
                                                    <rs.Button color="primary" value='Buscar'><FontAwesomeIcon icon={icon.faSearch}/></rs.Button>
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
                                                F. Creacion
                                            </rs.Col>
                                            <rs.Col sm={6}>
                                                <rs.Input
                                                    name="rbtnDateType"
                                                    type="radio"
                                                />
                                                {' '}
                                                F. Modificacion
                                            </rs.Col>
                                        </rs.FormGroup>
                                        <rs.FormGroup>
                                            <rs.Col sm={12}>
                                                <rs.Label for="productFromDate">
                                                    Desde
                                                </rs.Label>
                                                <rs.Input
                                                    id="productFromDate"
                                                    name="date"
                                                    placeholder="date placeholder"
                                                    type="date"
                                                />
                                            </rs.Col>
                                            <br/>
                                            <rs.Col sm={12}>
                                                <rs.Label for="productToDate">
                                                    Hasta
                                                </rs.Label>
                                                <rs.Input
                                                    id="productToDate"
                                                    name="date"
                                                    placeholder="date placeholder"
                                                    type="date"
                                                />
                                            </rs.Col>
                                        </rs.FormGroup>
                                        <hr/>
                                        <rs.FormGroup className='actions'>
                                            <div className='left'>
                                                <rs.Button color="success">
                                                    <FontAwesomeIcon icon={icon.faCheck}/>{' '}Aplicar
                                                </rs.Button>
                                            </div>
                                        </rs.FormGroup>
                                    </rs.Form>
                                </rs.CardBody>
                            </rs.Card>
                        </rs.Col>
                }
            </rs.Row>
        </div>
    )
}

export default Entradas;
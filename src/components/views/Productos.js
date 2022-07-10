import React, { useState, useEffect } from 'react';
import * as rs from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icon from '@fortawesome/free-solid-svg-icons';
import RegistroProducto from "../registro/registro_productos";
import * as product_services from '../../api/services/product-services';
import Loader from "../utils/loader";
import DetalleProducto from "../detalle/detalle_productos";

function Productos (props) {

    const [action, setAction] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [productos, setProductos] = useState([]);
    const initialFormState = {}
    const [currentProduct , setCurrentProduct] = useState(initialFormState)

    function showRegistroProductos(){
        setAction("registrar")
    }

    useEffect(() => {
        getProductTable();
    },[])

    function getProductTable () {
        setShowLoader(true);
        product_services.getProducts().then( (response) => {
            setShowLoader(false);
            if (response.status === 200){
                var filas = [];
                let body = response.data.data

                if (Array.isArray(body)) {
                    body.forEach( a => {
                        filas.push(
                            <tr key= {a.code}>
                                <td>{a.code}</td>
                                <td>{a.name}</td>
                                <td>{a.category}</td>
                                <td>{a.warehouse}</td>
                                <td>
                                    <FontAwesomeIcon icon={icon.faCheckSquare}
                                        type="button" 
                                        className= 'select-button'
                                        title="Seleccionar"
                                        onClick = { () => {
                                            setAction("detalle")
                                            setCurrentProduct(a)
                                        }}
                                    />
                                </td>
                            </tr>
                        )
                    })
                }
                setProductos(filas);
            } else if(response.status === 401) {
                console.log("NOT AUTHORIZED, AUTH AGAIN OR REDIRECT TO LOGIN")
            }
        })
    }

    function actualizarTabla () {
        if (productos.length !== 0 || typeof(productos) !== 'undefined'){
            getProductTable()
        }
    }

    function selectAction(value){
        setAction(value)
    }

    return (
        <div>
            {action === "detalle" ? <DetalleProducto dataProducto={currentProduct} actualizaResultados={actualizarTabla} selectAction={selectAction}/> : 
            action === "registrar" ? <RegistroProducto actualizaResultados={actualizarTabla} selectAction={selectAction}/> :
                <rs.Card className='card'>
                    <rs.CardHeader className='header'>
                        <rs.Row>
                            <rs.Col sm={10}>
                                <h3><FontAwesomeIcon icon={icon.faListNumeric}/> Lista Productos</h3>
                            </rs.Col>
                            <rs.Col sm={2}>
                                <rs.Button 
                                    className='button'
                                    value="Agregar" 
                                    onClick={showRegistroProductos}
                                >
                                    <FontAwesomeIcon icon={icon.faPlusCircle}/> Nuevo
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
                                        id="searchProduct"
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
                        {showLoader ? <Loader /> :
                            <rs.Form>
                                <rs.FormGroup>
                                    <rs.Table responsive className='styled-table'>
                                        <thead>
                                            <tr>
                                                <th>
                                                    Codigo
                                                </th>
                                                <th>
                                                    Nombre
                                                </th>
                                                <th>
                                                    Categoria
                                                </th>
                                                <th>
                                                    Almacén
                                                </th>
                                                <th>

                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {productos}
                                        </tbody>
                                    </rs.Table>
                                    {productos.length === 0 ?
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

export default Productos;
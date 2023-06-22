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
    const [search, setSearch] = useState("");

    function showRegistroProductos(){
        setAction("registrar")
    }

    useEffect(() => {
        getProductTable();
    },[search])

    function getProductTable () {
        setShowLoader(true);
        product_services.getProducts().then( (response) => {
            setShowLoader(false);
            if (response.status === 200){
                var filas = [];
                let body = response.data.data

                body.filter(val=>{
                    if(search === ''){
                        return val;
                    } else if (val.code.toLowerCase().includes(search.toLocaleLowerCase())
                        || val.name.toLowerCase().includes(search.toLocaleLowerCase())
                        || val.category.toLowerCase().includes(search.toLocaleLowerCase())){
                        return val
                    }
                }).forEach( a => {
                    filas.push(
                        <tr key= {a.code}>
                            <td>{a.code}</td>
                            <td>{a.name}</td>
                            <td>{a.category}</td>
                            <td>
                                <FontAwesomeIcon icon={icon.faEdit}
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
                        <rs.InputGroup>
                            <rs.Input
                                id="searchProduct"
                                name="Search"
                                placeholder="Buscar por codigo, nombre, categoria o almacen..."
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
                                                CODIGO
                                            </th>
                                            <th>
                                                NOMBRE
                                            </th>
                                            <th>
                                                CATEGORIA
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
                                :<span/>}
                            </rs.Form>
                        }
                    </rs.CardBody>
                </rs.Card>
            }
        </div>
    )
}

export default Productos;
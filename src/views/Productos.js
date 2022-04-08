import React, { useState, useEffect } from 'react';
import * as rs from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icon from '@fortawesome/free-solid-svg-icons';
import RegistroProducto from "../components/registro/registro_productos";
import * as product_services from '../api/services/product-services';
import Loader from "../components/utils/loader";

function Productos () {

    const [action, setAction] = useState(false);
    const [btnActionTxt, setBtnActionTxt] = useState("Agregar");
    const [btnIcon, setBtnIcon] = useState(<FontAwesomeIcon icon={icon.faPlusCircle}/>);
    const [showLoader, setShowLoader] = useState(false);
    const [productos, setProductos] = useState([]);
    const [key, setKey] = useState([]);

    function showRegistroProductos(){
        if (btnActionTxt === "Agregar"){
            setBtnIcon(<FontAwesomeIcon icon={icon.faFilter}/>)
            setBtnActionTxt("Filtros")
        }else{
            setBtnIcon(<FontAwesomeIcon icon={icon.faPlusCircle}/>)
            setBtnActionTxt("Agregar")
        }
        setAction(!action)
    }
    
    useEffect(() => {
        return () => {
            if (key.length !== 0) {
                product_services.deleteProduct(key).then((response) => {
                    if (response) {
                        if ( response.status === 200 ) {
                            setKey(null)
                        }
                    }
                })
            }
        }
    }, [key])

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
                                <td>{body.indexOf(a)+1}</td>
                                <td>{a.code}</td>
                                <td>{a.name}</td>
                                <td>{a.description}</td>
                                <td>{a.stock}</td>
                                <td>{a.cost}</td>
                                <td>{a.price}</td>
                                <td>{a.category}</td>
                                <td>{a.creationTime}</td>
                                <td>{a.modifiedTime}</td>
                                <td>
                                    <FontAwesomeIcon icon={icon.faEdit}
                                        type="button" 
                                        title="Editar producto"
                                    />
                                    {' '}
                                    <FontAwesomeIcon icon={icon.faTrash}
                                        type="button" 
                                        title="Eliminar producto" 
                                        onClick = { () => {
                                            if (window.confirm('¿Está seguro que desea eliminar el producto?'))
                                                eliminarProducto(a.code)
                                        }}/>
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

    useEffect(() => {
        getProductTable();
    },[])
    
    function eliminarProducto(key){
        setKey(key)
    }


    return (
        <div>
            <rs.Container fluid className="p-8" >
                <rs.Row>
                    <rs.Col sm={9}>
                        <rs.Card>
                            <rs.CardHeader className='card-header'>
                                <rs.Row>
                                    <rs.Col sm={10}>
                                        <h2>&nbsp;Administrar Productos</h2>
                                    </rs.Col>
                                    <rs.Col sm={2}>
                                            <rs.Button color="primary" value={btnActionTxt} onClick={showRegistroProductos}>{btnIcon} {btnActionTxt} </rs.Button>
                                    </rs.Col>
                                </rs.Row>
                            </rs.CardHeader>
                            <rs.CardBody>
                                {showLoader ? <Loader /> :
                                    <rs.Form>
                                        <rs.FormGroup>
                                            <rs.Table responsive className='styled-table'>
                                                <thead>
                                                    <tr>
                                                        <th style={{width: "0%"}}>
                                                            #
                                                        </th>
                                                        <th style={{width: "5%"}}>
                                                            Codigo
                                                        </th>
                                                        <th style={{width: "15%"}}>
                                                            Nombre
                                                        </th>
                                                        <th style={{width: "20%"}}>
                                                            Descripcion
                                                        </th>
                                                        <th style={{width: "5%"}}>
                                                            Stock
                                                        </th>
                                                        <th style={{width: "5%"}}>
                                                            Costo
                                                        </th>
                                                        <th style={{width: "5%"}}>
                                                            Precio
                                                        </th>
                                                        <th style={{width: "5%"}}>
                                                            Categoria
                                                        </th>
                                                        <th style={{width: "15%"}}>
                                                            F. de Creacion
                                                        </th>
                                                        <th style={{width: "15%"}}>
                                                            F. de Modificacion
                                                        </th>
                                                        <th style={{width: "0%"}}>
                                                            
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {productos}
                                                </tbody>
                                            </rs.Table>
                                        </rs.FormGroup>
                                    </rs.Form>
                                }
                            </rs.CardBody>
                        </rs.Card>
                    </rs.Col>
                    {action ? <RegistroProducto actualizaResultados={actualizarTabla}/> :
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

export default Productos;
import React, { useState, useEffect } from 'react';
import * as rs from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icon from '@fortawesome/free-solid-svg-icons';
import RegistroCategoria from "../components/registro/registro_categorias";
import * as category_services from '../api/services/category-services';
import Loader from "../components/utils/loader";

function Categorias () {

    const [action, setAction] = useState(false);
    const [btnActionTxt, setBtnActionTxt] = useState("Agregar");
    const [btnIcon, setBtnIcon] = useState(<FontAwesomeIcon icon={icon.faPlusCircle}/>);
    const [showLoader, setShowLoader] = useState(false);
    const [categorias, setCategorias] = useState([]);
    const [key, setKey] = useState([]);

    function showRegistroCategorias(){
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
                category_services.deleteCategory(key).then((response) => {
                    if (response) {
                        if ( response.status === 200 ) {
                            setKey(null)
                        }
                    }
                })
            }
        }
    }, [key])

    useEffect(() => {
        getCategoryTable();
    },[])

    function getCategoryTable () {
        setShowLoader(true);
        category_services.getCategories().then( (response) => {
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
                                <td>{a.products.length}</td>
                                <td>{a.creationTime}</td>
                                <td>{a.modifiedTime}</td>
                                <td>
                                    <FontAwesomeIcon icon={icon.faEdit}
                                        type="button" 
                                        title="Editar categoria"
                                    />
                                    {' '}
                                    <FontAwesomeIcon icon={icon.faTrash}
                                        type="button" 
                                        title="Eliminar categoria" 
                                        onClick = { () => {
                                            if (window.confirm('¿Está seguro que desea eliminar la categoria?'))
                                                eliminarCategoria(a.code)
                                        }}/>
                                </td>
                            </tr>
                        )
                    })
                } else {
                    filas.push(<tr><td></td><td></td><td></td><td>No data.</td><td></td></tr>)
                }
                setCategorias(filas);
            } else if(response.status === 401) {
                console.log("NOT AUTHORIZED, AUTH AGAIN OR REDIRECT TO LOGIN")
            }
        })
    }
    
    function eliminarCategoria(key){
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
                                        <h2>&nbsp;Administrar Categorias</h2>
                                    </rs.Col>
                                    <rs.Col sm={2}>
                                            <rs.Button color="primary" value={btnActionTxt} onClick={showRegistroCategorias}>{btnIcon} {btnActionTxt} </rs.Button>
                                    </rs.Col>
                                </rs.Row>
                            </rs.CardHeader>
                            <rs.CardBody>
                                {showLoader ? <Loader /> :
                                    <rs.Form>
                                        <rs.FormGroup>
                                            <rs.FormGroup>
                                                <rs.Table responsive className='styled-table'>
                                                    <thead>
                                                        <tr>
                                                            <th style={{width: "0%"}}>
                                                                #
                                                            </th>
                                                            <th style={{width: "0%"}}>
                                                                Codigo
                                                            </th>
                                                            <th style={{width: "20%"}}>
                                                                Nombre
                                                            </th>
                                                            <th style={{width: "20%"}}>
                                                                Descripcion
                                                            </th>
                                                            <th style={{width: "20%"}}>
                                                                Cant. productos
                                                            </th>
                                                            <th style={{width: "20%"}}>
                                                                F. de Creacion
                                                            </th>
                                                            <th style={{width: "20%"}}>
                                                                F. de Modificacion
                                                            </th>
                                                            <th>
                                                                
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {categorias}
                                                    </tbody>
                                                </rs.Table>
                                            </rs.FormGroup>
                                        </rs.FormGroup>
                                    </rs.Form>
                                }
                            </rs.CardBody>
                        </rs.Card>
                    </rs.Col>
                    {action ? <RegistroCategoria /> :
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

export default Categorias;
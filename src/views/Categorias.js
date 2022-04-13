import React, { useState, useEffect } from 'react';
import * as rs from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icon from '@fortawesome/free-solid-svg-icons';
import RegistroCategoria from "../components/registro/registro_categorias";
import * as category_services from '../api/services/category-services';
import Loader from "../components/utils/loader";
import DetalleCategoria from "../components/detalle/detalle_categorias";

function Categorias () {

    const [action, setAction] = useState(false);
    const [btnActionTxt, setBtnActionTxt] = useState("Agregar");
    const [btnIcon, setBtnIcon] = useState(<FontAwesomeIcon icon={icon.faPlusCircle}/>);
    const [showLoader, setShowLoader] = useState(false);
    const [categorias, setCategorias] = useState([]);
    const initialFormState = {}
    const [currentCategory , setCurrentCategory] = useState(initialFormState)

    function showRegistroCategorias(){
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

    function actualizarTabla () {
        if (categorias.length !== 0 || typeof(categorias) !== 'undefined'){
            getCategoryTable()
        }
    }

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
                            <tr key= {a.key}>
                                <td>{body.indexOf(a)+1}</td>
                                <td>{a.code}</td>
                                <td>{a.name}</td>
                                <td>{a.description}</td>
                                <td>{a.products.length}</td>
                                <td>{a.creationTime}</td>
                                <td>{a.modifiedTime}</td>
                                <td>
                                    <FontAwesomeIcon icon={icon.faCheckSquare}
                                        className= 'select-button'
                                        type="button" 
                                        title="Seleccionar"
                                        onClick = { () => {
                                            setAction("detalle")
                                            setCurrentCategory(a)
                                        }}
                                    />
                                    
                                </td>
                            </tr>
                        )
                    })
                }
                setCategorias(filas);
            } else if(response.status === 401) {
                console.log("NOT AUTHORIZED, AUTH AGAIN OR REDIRECT TO LOGIN")
            }
        })
    }
    
    return (
        <div>
            <rs.Row>
                <rs.Col sm={9}>
                    <rs.Card className='card'>
                        <rs.CardHeader className='header'>
                            <rs.Row>
                                <rs.Col sm={10}>
                                    <h2>&nbsp;Administrar Categorias</h2>
                                </rs.Col>
                                <rs.Col sm={2}>
                                    <rs.Button 
                                        className='button' 
                                        value={btnActionTxt} 
                                        onClick={showRegistroCategorias}
                                    >
                                        {btnIcon} {btnActionTxt} 
                                    </rs.Button >
                                </rs.Col>
                            </rs.Row>
                        </rs.CardHeader>
                        <rs.CardBody className='body'>
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
                {action === "detalle" ? <DetalleCategoria dataCategoria={currentCategory} actualizaResultados={actualizarTabla}/> :
                    action === "registrar" ? <RegistroCategoria actualizaResultados={actualizarTabla}/> :
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
                                                <rs.Label for="categoryFromDate">
                                                    Desde
                                                </rs.Label>
                                                <rs.Input
                                                    id="categoryFromDate"
                                                    name="date"
                                                    placeholder="date placeholder"
                                                    type="date"
                                                />
                                            </rs.Col>
                                            <br/>
                                            <rs.Col sm={12}>
                                                <rs.Label for="categoryToDate">
                                                    Hasta
                                                </rs.Label>
                                                <rs.Input
                                                    id="categoryToDate"
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

export default Categorias;
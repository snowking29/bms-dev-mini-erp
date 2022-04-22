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
    const [showLoader, setShowLoader] = useState(false);
    const [categorias, setCategorias] = useState([]);
    const initialFormState = {}
    const [currentCategory , setCurrentCategory] = useState(initialFormState)

    function showRegistroCategorias(){
        setAction("registrar")
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

    function selectAction(value){
        setAction(value)
    }

    return (
        <div>
            {action === "detalle" ? <DetalleCategoria dataCategoria={currentCategory} actualizaResultados={actualizarTabla} selectAction={selectAction}/> :
            action === "registrar" ? <RegistroCategoria actualizaResultados={actualizarTabla} selectAction={selectAction}/> :
                <rs.Card className='card'>
                    <rs.CardHeader className='header'>
                        <rs.Row>
                            <rs.Col sm={10}>
                                <h3><FontAwesomeIcon icon={icon.faListNumeric}/> Listar Categorias</h3>
                            </rs.Col>
                            <rs.Col sm={2}>
                                <rs.Button 
                                    className='button' 
                                    value="Agregar" 
                                    onClick={showRegistroCategorias}
                                >
                                    <FontAwesomeIcon icon={icon.faPlusCircle}/> Nuevo
                                </rs.Button >
                            </rs.Col>
                        </rs.Row>
                    </rs.CardHeader>
                    <rs.CardBody className='body'>
                    <rs.Row>
                            <rs.Col sm={4}>
                                <rs.FormGroup row>
                                    <rs.Label for="categoryFromDate" sm={4}>
                                        Fecha Inicio
                                    </rs.Label>
                                    <rs.Col sm={8}>
                                        <rs.Input
                                            id="categoryFromDate"
                                            name="date"
                                            placeholder="date placeholder"
                                            type="date"
                                        />
                                    </rs.Col>
                                </rs.FormGroup>
                            </rs.Col>
                            <rs.Col sm={4}>
                                <rs.FormGroup row>
                                    <rs.Label for="categoryToDate" sm={4}>
                                        Fecha Fin
                                    </rs.Label>
                                    <rs.Col sm={8}>
                                        <rs.Input
                                            id="categoryToDate"
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
                                        id="searchCategory"
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
                                    <rs.FormGroup>
                                        <rs.Table responsive className='styled-table'>
                                            <thead>
                                                <tr>
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
                                        {categorias.length === 0 ?
                                            <h5 className="noData">
                                                No data.
                                            </h5>
                                        : <hr/>}
                                    </rs.FormGroup>
                                </rs.FormGroup>
                            </rs.Form>
                        }
                    </rs.CardBody>
                </rs.Card>
            }
        </div>
    )
}

export default Categorias;
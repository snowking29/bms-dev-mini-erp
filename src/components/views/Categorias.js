import React, { useState, useEffect } from 'react';
import * as rs from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icon from '@fortawesome/free-solid-svg-icons';
import RegistroCategoria from "../registro/registro_categorias";
import * as category_services from '../../api/services/category-services';
import Loader from "../utils/loader";
import DetalleCategoria from "../detalle/detalle_categorias";

function Categorias (props) {

    const [action, setAction] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [categorias, setCategorias] = useState([]);
    const initialFormState = {}
    const [currentCategory , setCurrentCategory] = useState(initialFormState)
    const [search, setSearch] = useState("");

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
    },[search])

    function getCategoryTable () {
        setShowLoader(true);
        category_services.getCategories().then( (response) => {
            setShowLoader(false);
            if (response.status === 200){
                var filas = [];
                let body = response.data.data

                if (Array.isArray(body)) {
                    body.filter(val => {
                        if(search === ''){
                            return val;
                        } else if (val.code.toLowerCase().includes(search.toLocaleLowerCase())
                            || val.name.toLowerCase().includes(search.toLocaleLowerCase())){
                            return val
                        }
                    }).forEach( a => {
                        filas.push(
                            <tr key= {a.key}>
                                <td>{a.code}</td>
                                <td>{a.name}</td>
                                <td>{a.products.length}</td>
                                <td>
                                    <FontAwesomeIcon icon={icon.faEdit}
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
                        <rs.InputGroup>
                            <rs.Input
                                id="searchCategory"
                                name="Search"
                                placeholder="Buscar por codigo o nombre ..."
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
                                                CANT. PRODUCTOS
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
                                : <span/>}
                            </rs.Form>
                        }
                    </rs.CardBody>
                </rs.Card>
            }
        </div>
    )
}

export default Categorias;
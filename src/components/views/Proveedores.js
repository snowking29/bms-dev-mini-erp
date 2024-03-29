import React, { useState, useEffect } from 'react';
import * as rs from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icon from '@fortawesome/free-solid-svg-icons';
import RegistroProveedores from "../registro/registro_proveedores";
import * as provider_services from '../../api/services/provider-services';
import Loader from "../utils/loader";
import DetalleProveedor from "../detalle/detalle_proveedores";

function Proveedores (props) {
    
    const [action, setAction] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [proveedores, setProveedores] = useState([]);
    const initialFormState = {}
    const [currentProvider , setCurrentProvider] = useState(initialFormState)
    const [search, setSearch] = useState("");

    function showRegistroProveedores(){
        setAction("registrar")
    }

    useEffect(() => {
        getProviders();
    },[search])

    function getProviders () {
        setShowLoader(true);
        provider_services.getProviders().then( (response) => {
            setShowLoader(false);
            if (response.status === 200) {
                var filas = [];
                let body = response.data.data
                if (Array.isArray(body)) {
                    body.filter(val=>{
                        if(search === ''){
                            return val;
                        } else if (val.identifyID.toLowerCase().includes(search.toLocaleLowerCase())
                            || val.fullName.toLowerCase().includes(search.toLocaleLowerCase())
                            || val.email.toLowerCase().includes(search.toLocaleLowerCase())
                            || val.phone.toLowerCase().includes(search.toLocaleLowerCase())){
                            return val
                        }
                    }).forEach( a => {
                        filas.push(
                            <tr key= {a.key}>
                                <td>{a.identifyID}</td>
                                <td>{a.fullName}</td>
                                <td>{a.email}</td>
                                <td>{a.phone.replace(/\s/g, '')}</td>
                                <td>
                                    <FontAwesomeIcon icon={icon.faEdit}
                                        className= 'select-button'
                                        type="button" 
                                        title="Seleccionar"
                                        onClick = { () => {
                                            setAction("detalle")
                                            setCurrentProvider(a)
                                        }}
                                    />
                                    
                                </td>
                            </tr>
                        )
                    })
                }
                setProveedores(filas);
            } else if(response.status === 401) {
                console.log("NOT AUTHORIZED, AUTH AGAIN OR REDIRECT TO LOGIN")
            }
        })
    }

    function actualizarTabla () {
        if (proveedores.length !== 0 || typeof(proveedores) !== 'undefined'){
            getProviders()
        }
    }

    function selectAction(value){
        setAction(value)
    }

    return (
        <div>
            {action === "detalle" ? <DetalleProveedor dataProveedor={currentProvider} actualizaResultados={actualizarTabla} selectAction={selectAction}/> :
            action === "registrar" ? <RegistroProveedores actualizaResultados={actualizarTabla} selectAction={selectAction}/> :
                <rs.Card className='card'>
                    <rs.CardHeader className='header'>
                        <rs.Row>
                            <rs.Col sm={10}>
                                <h3><FontAwesomeIcon icon={icon.faListNumeric}/> Listas Proveedores</h3>
                            </rs.Col>
                            <rs.Col sm={2}>
                                <rs.Button 
                                    className='button'
                                    value="Registrar"
                                    onClick={showRegistroProveedores}
                                >
                                    <FontAwesomeIcon icon={icon.faPlusCircle}/> Nuevo
                                </rs.Button>
                            </rs.Col>
                        </rs.Row>
                    </rs.CardHeader>
                    <rs.CardBody className='body'>
                        <rs.InputGroup>
                            <rs.Input
                                id="searchProvider"
                                name="Search"
                                placeholder="Buscar por dni/ruc, nombres, email o telefono..."
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
                                                NRO. DOCUMENTO
                                            </th>
                                            <th>
                                                NOMBRES
                                            </th>
                                            <th>
                                                EMAIL
                                            </th>
                                            <th>
                                                TELEFONO
                                            </th>
                                            <th>
                                                
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {proveedores}
                                    </tbody>
                                </rs.Table>
                                {proveedores.length === 0 ?
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

export default Proveedores;
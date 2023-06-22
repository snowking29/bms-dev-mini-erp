import React, { useState, useEffect } from 'react';
import * as rs from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icon from '@fortawesome/free-solid-svg-icons';
import RegistroRoles from "../registro/registro_roles";
import * as roles_services from '../../api/services/roles-services';
import Loader from "../utils/loader";
import DetalleRoles from "../detalle/detalle_roles";

function Roles (props) {
    
    const [action, setAction] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [search, setSearch] = useState("");
    const [roles, setRoles] = useState([]);
    const initialFormState = {}
    const [currentRol , setCurrentRol] = useState(initialFormState)

    function showRegistroRoles(){
        setAction("registrar")
    }

    function actualizarTabla () {
        if (roles.length !== 0 || typeof(roles) !== 'undefined'){
            getRoles()
        }
    }

    useEffect(() => {
        getRoles();
    },[search])

    function getRoles () {
        setShowLoader(true);
        roles_services.getRoles().then( (response) => {
            setShowLoader(false);
            if (response.status === 200) {
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
                                <td>
                                    <FontAwesomeIcon icon={icon.faEdit}
                                        className= 'select-button'
                                        type="button" 
                                        title="Seleccionar"
                                        onClick = { () => {
                                            setAction("detalle")
                                            setCurrentRol(a)
                                        }}
                                    />
                                    
                                </td>
                            </tr>
                        )
                    })
                }
                setRoles(filas);
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
            {action === "detalle" ? <DetalleRoles dataRol={currentEmployee} actualizaResultados={actualizarTabla} selectAction={selectAction}/> :
            action === "registrar" ? <RegistroEmpleado actualizaResultados={actualizarTabla} selectAction={selectAction}/> :
                <rs.Card className='card'>
                    <rs.CardHeader className='header'>
                        <rs.Row>
                            <rs.Col sm={10}>
                                <h3><FontAwesomeIcon icon={icon.faListNumeric}/> Lista Empleados</h3>
                            </rs.Col>
                            <rs.Col sm={2}>
                                    <rs.Button 
                                        className='button'
                                        value="Agregar" 
                                        onClick={showRegistroEmpleados}
                                    >
                                       <FontAwesomeIcon icon={icon.faPlusCircle}/> Nuevo
                                    </rs.Button>
                            </rs.Col>
                        </rs.Row>
                    </rs.CardHeader>
                    <rs.CardBody className='body'>
                        <rs.InputGroup>
                            <rs.Input
                                id="searchEmployee"
                                name="Search"
                                placeholder="Buscar por dni, nombres, telefono o email"
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
                                                TELEFONO
                                            </th>
                                            <th>
                                                EMAIL
                                            </th>
                                            <th>
                                                
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {empleados}
                                    </tbody>
                                </rs.Table>
                                {empleados.length === 0 ?
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

export default Empleados;
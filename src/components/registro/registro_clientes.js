import React, { useState } from 'react';
import * as rs from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icon from '@fortawesome/free-solid-svg-icons';
import * as customer_services from '../../api/services/customer-services';
import Alerta from "../utils/alerta";
import Loader from "../utils/loader";

function Registro_Clientes(props){

    const [name, setName] = useState("");
    const [lastname, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [details, setDetails] = useState("");
    const [email, setEmail] = useState("");
    const [identifyID, setIdentifyID] = useState("");
    const [phone, setPhone] = useState("");
    const [msjAlert, setMsjAlert] = useState("");
    const [mostrarAlert, setMostrarAlert] = useState(false);
    const [color, setColor] = useState("secondary");
    const [showLoader, setShowLoader] = useState(false);

    var date = new Date().toLocaleDateString()
    const user = localStorage.getItem("name");
    
    function saveCustomer() {

        let dataCustomer = {
            "name": name,
            "lastname": lastname,
            "address": address,
            "city": city,
            "phone": phone,
            "email": email,
            "identifyID": identifyID,
            "details": details,
            "creationTime": date.toLocaleString('es-PE'),
            "modifiedTime": ""
        }
        setShowLoader(true);
        customer_services.postCustomer(dataCustomer)
            .then((response => {
                setShowLoader (false);
                if (response) {
                    if (response.data.meta.status.code === "00") {
                        setColor("success");
                        props.actualizaResultados();
                    }else{
                        setColor("danger");
                    }
                    setMsjAlert(response.data.meta.status.message_ilgn[0].value);
                    setMostrarAlert(true);
                }
            }))
    }

    function ocultarAlerta(){
        setMostrarAlert(false);
    }

    return (
        <rs.Card className='card'>
            <rs.CardHeader className='header'>
                <rs.Row>
                    <rs.Col sm={10}>
                        <h2>&nbsp;Nuevo Cliente</h2>
                    </rs.Col>
                    <rs.Col sm={2}>
                            <rs.Button 
                                className='button' 
                                onClick={(e) => props.selectAction("listar")}
                            >
                                <FontAwesomeIcon icon={icon.faList}/>{' '}Listar clientes
                            </rs.Button>
                    </rs.Col>
                </rs.Row>
            </rs.CardHeader>
            <rs.CardBody>
            {showLoader ? <Loader /> : 
                <rs.Form>
                    <rs.FormGroup>
                        <rs.Row>
                            <rs.Col sm={3}>
                                <rs.Label>
                                    <FontAwesomeIcon icon={icon.faFileText}/> Nombres y Apellidos
                                </rs.Label>
                                <rs.Input
                                    name="txtFullName"
                                    type="text"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </rs.Col>
                            <rs.Col sm={3}>
                                <rs.Label>
                                    <FontAwesomeIcon icon={icon.faAddressCard}/> Direccion
                                </rs.Label>
                                <rs.Input
                                    name="txtAddress"
                                    type="text"
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </rs.Col>
                            <rs.Col sm={2}>
                                <rs.Label>
                                    <FontAwesomeIcon icon={icon.faCity}/> Ciudad
                                </rs.Label>
                                <rs.Input
                                    name="txtCity"
                                    type="text"
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </rs.Col>
                            <rs.Col sm={2}>
                                <rs.Label>
                                    <FontAwesomeIcon icon={icon.faPhone}/> Telefono
                                </rs.Label>
                                <rs.Input
                                    name="txtPhone"
                                    type="number"
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </rs.Col>
                            <rs.Col sm={2}>
                                <rs.Label>
                                    <FontAwesomeIcon icon={icon.faCalendar}/> Fecha de Registro
                                </rs.Label>
                                <rs.Input
                                    name="txtCreationTime"
                                    type="text"
                                    value={date}
                                    disabled
                                />
                            </rs.Col>
                        </rs.Row>
                    </rs.FormGroup>
                    <rs.FormGroup>
                        <rs.Row>
                            <rs.Col sm={3}>
                                <rs.Label>
                                    <FontAwesomeIcon icon={icon.faMailBulk}/> Email
                                </rs.Label>
                                <rs.Input
                                    name="txtEmail"
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </rs.Col>
                            <rs.Col sm={3}>
                                <rs.Label>
                                    <FontAwesomeIcon icon={icon.faComment}/> Detalle
                                </rs.Label>
                                <rs.Input
                                    name="txtDetail"
                                    type="text"
                                    onChange={(e) => setDetails(e.target.value)}
                                />
                            </rs.Col>
                            <rs.Col sm={2}>
                                <rs.Label>
                                    <FontAwesomeIcon icon={icon.faIdCard}/> DNI - RUC
                                </rs.Label>
                                <rs.Input
                                    name="txtIdentifyID"
                                    type="number"
                                    onChange={(e) => setIdentifyID(e.target.value)}
                                />
                            </rs.Col>
                            <rs.Col sm={2}>
                                <rs.Label>
                                    <FontAwesomeIcon icon={icon.faUser}/> Usuario
                                </rs.Label>
                                <rs.Input
                                    name="txtUser"
                                    type="text"
                                    value={user}
                                    disabled
                                />
                            </rs.Col>
                            <rs.Col sm={2}>
                                <rs.Label>
                                    
                                </rs.Label>
                                <div className='actions'>

                                    <rs.Button className='left'color="success" onClick={saveCustomer}>
                                        <FontAwesomeIcon icon={icon.faSave}/>{' '}Grabar
                                    </rs.Button>

                                    <rs.Button className='right'color="warning" onClick={saveCustomer}>
                                        <FontAwesomeIcon icon={icon.faEraser}/>{' '}Limpiar
                                    </rs.Button>
                                </div>
                            </rs.Col>
                        </rs.Row>
                    </rs.FormGroup>
                    
                </rs.Form>
            }
                <Alerta msj={msjAlert} alertVisible={mostrarAlert} color={color} ocultar={ocultarAlerta}/>
            </rs.CardBody>
        </rs.Card>
    )
}

export default Registro_Clientes;

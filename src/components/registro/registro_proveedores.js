import React, { useState, useEffect } from 'react';
import * as rs from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icon from '@fortawesome/free-solid-svg-icons';
import * as provider_services from '../../api/services/provider-services';
import Alerta from "../utils/alerta";
import Loader from "../utils/loader";

function Registro_Proveedor(props){

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [details, setDetails] = useState("");
    const [email, setEmail] = useState("");
    const [identifyID, setIdentifyID] = useState("");
    const [phone, setPhone] = useState("");
    const [creationTime, setCreationTime] = useState("");
    const [showLoader, setShowLoader] = useState(false);

    function saveProvider() {
        var date = new Date(creationTime)

        let dataProvider = {
            "name": name,
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
        provider_services.postProviders(dataProvider)
            .then((response => {
                setShowLoader (false);
                if (response) {
                    if (response.status === 200) {
                        props.actualizaResultados();
                    }
                }
            }))
    }

    return (
        <rs.Col sm={3}>
            {showLoader ? <Loader /> : 
                <rs.Card className='card'>
                    <rs.CardHeader className="h4 register">
                        <FontAwesomeIcon icon={icon.faTruckMoving}/>
                        {' '}
                        Registrar Proveedor
                    </rs.CardHeader>
                    <rs.CardBody>
                        <rs.Form>
                            <rs.FormGroup>
                                <rs.Label>
                                    <FontAwesomeIcon icon={icon.faFileText}/> Nombre
                                </rs.Label>
                                <rs.Input
                                    name="txtName"
                                    type="text"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </rs.FormGroup>
                            <rs.FormGroup>
                                <rs.Label>
                                    <FontAwesomeIcon icon={icon.faAddressCard}/> Direccion
                                </rs.Label>
                                <rs.Input
                                    name="txtAddress"
                                    type="text"
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </rs.FormGroup>
                            <rs.FormGroup>
                                <rs.Row>
                                    <rs.Col sm={6}>
                                        <rs.Label>
                                            <FontAwesomeIcon icon={icon.faCity}/> Ciudad
                                        </rs.Label>
                                        <rs.Input
                                            name="txtCity"
                                            type="text"
                                            onChange={(e) => setCity(e.target.value)}
                                        />
                                    </rs.Col>
                                    <rs.Col sm={6}>
                                        <rs.Label>
                                            <FontAwesomeIcon icon={icon.faPhone}/> Telefono
                                        </rs.Label>
                                        <rs.Input
                                            name="txtPhone"
                                            type="number"
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </rs.Col>
                                </rs.Row>
                            </rs.FormGroup>
                            <rs.FormGroup>
                                <rs.Label>
                                    <FontAwesomeIcon icon={icon.faMailBulk}/> Email
                                </rs.Label>
                                <rs.Input
                                    name="txtEmail"
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </rs.FormGroup>
                            <rs.FormGroup>
                                <rs.Label>
                                    <FontAwesomeIcon icon={icon.faIdCard}/> DNI / RUC
                                </rs.Label>
                                <rs.Input
                                    name="txtIdentifyID"
                                    type="number"
                                    onChange={(e) => setIdentifyID(e.target.value)}
                                />
                            </rs.FormGroup>
                            <rs.FormGroup>
                                <rs.Label>
                                    <FontAwesomeIcon icon={icon.faComment}/> Detalles
                                </rs.Label>
                                <rs.Input
                                    name="txtDetail"
                                    type="textarea"
                                    onChange={(e) => setDetails(e.target.value)}
                                />
                            </rs.FormGroup>
                            <rs.FormGroup>
                                <rs.Label>
                                    <FontAwesomeIcon icon={icon.faCalendar}/> Fecha de creacion
                                </rs.Label>
                                <rs.Input
                                    name="txtFCreation"
                                    type="datetime-local"
                                    onChange={(e) => setCreationTime(e.target.value)}
                                />
                            </rs.FormGroup>
                            <hr/>
                            <rs.FormGroup className='actions'>
                                <div className='left'>
                                    <rs.Button color="success" onClick={saveProvider}>
                                        <FontAwesomeIcon icon={icon.faSave}/>{' '}Grabar
                                    </rs.Button>
                                </div>
                            </rs.FormGroup>
                        </rs.Form>
                    </rs.CardBody>
                </rs.Card>
            }
        </rs.Col>
    )
}

export default Registro_Proveedor;

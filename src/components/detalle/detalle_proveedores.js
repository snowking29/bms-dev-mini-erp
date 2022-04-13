import React, { useState, useEffect } from 'react';
import * as rs from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icon from '@fortawesome/free-solid-svg-icons';
import * as provider_services from '../../api/services/provider-services';
import Loader from "../utils/loader";
import {removeEmptyData} from "../utils/RemoveEmptyData";

function Detalle_Proveedor(props){

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [details, setDetails] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [showLoader, setShowLoader] = useState(false);
    var key = props.dataProveedor.key;

    function saveProvider() {
        

        var date = new Date()
        
        var temporaryDataProvider = {
            "name": name,
            "address": address,
            "city": city,
            "details": details,
            "email": email,
            "phone": phone,            
            "modifiedTime": date.toLocaleString('es-PE')
        }

        var dataProvider = removeEmptyData(temporaryDataProvider)

        setShowLoader(true);
        provider_services.putProviders(key, dataProvider)
            .then(
                (response => {
                    setShowLoader (false);
                    if (response) {
                        if (response.data.meta.status.code === "00") {
                            clearFields();
                            props.actualizaResultados();
                        }
                    }
                })
            )
    }

    function clearFields(){
        setName("")
        setAddress("")
        setCity("")
        setDetails("")
        setEmail("")
        setPhone("")
    }

    function deleteProvider (){
        setShowLoader(true);
        provider_services.deleteProvider(key).then((response) => {
            if (response) {
                setShowLoader (false);
                if ( response.data.meta.status.code === "00" ) {
                    props.actualizaResultados();
                }
            }
        })
    }

    return (
        <rs.Col sm={3}>
            {showLoader ? <Loader /> :
                <rs.Card className='card'>
                    <rs.CardHeader className="h4 editing">
                        <FontAwesomeIcon icon={icon.faFileEdit}/>
                        {' '}
                        Editar Proveedor
                    </rs.CardHeader>
                    <rs.CardBody>
                        <rs.Form>
                            <rs.FormGroup>
                                <rs.Label>
                                    <FontAwesomeIcon icon={icon.faIdCard}/> DNI / RUC
                                </rs.Label>
                                <rs.Input
                                    name="txtIdentifyID"
                                    type="number"
                                    disabled
                                    value={props.dataProveedor.identifyID}
                                />
                            </rs.FormGroup>
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
                                    <FontAwesomeIcon icon={icon.faComment}/> Detalle
                                </rs.Label>
                                <rs.Input
                                    name="txtDetail"
                                    type="textarea"
                                    onChange={(e) => setDetails(e.target.value)}
                                />
                            </rs.FormGroup>
                            <hr/>
                            <rs.FormGroup className='actions'>
                                <div className='left'>
                                    <rs.Button color='success'onClick={() => saveProvider()}>
                                        <FontAwesomeIcon icon={icon.faSave}/>{' '}Guardar
                                    </rs.Button>
                                </div>
                                <div className='right'>
                                    <rs.Button color='danger' onClick={() => deleteProvider()}>
                                        <FontAwesomeIcon icon={icon.faTrash}/>{' '}Eliminar
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

export default Detalle_Proveedor;
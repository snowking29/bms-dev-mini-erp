import React, { useState, useEffect } from 'react';
import * as rs from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icon from '@fortawesome/free-solid-svg-icons';
import * as provider_services from '../../api/services/provider-services';
import CustomModal from "../utils/modal";
import Alerta from "../utils/alerta";
import Loader from "../utils/loader";
import {removeEmptyData} from "../utils/RemoveEmptyData";

function Detalle_Proveedor(props){

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [details, setDetails] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [msjAlert, setMsjAlert] = useState("");
    const [mostrarAlert, setMostrarAlert] = useState(false);
    const [color, setColor] = useState("secondary");
    const [showLoader, setShowLoader] = useState(false);

    const [action, setAction] = useState("")
    const [mostrarModal, setMostrarModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalBody, setModalBody] = useState("");
    const [modalFooter, setModalFooter] = useState("");
    const [modalConfirmation, setModalConfirmation] = useState(false);

    var date = new Date().toLocaleDateString('es-PE')

    function clearFields(){
        setName("")
        setAddress("")
        setCity("")
        setDetails("")
        setEmail("")
        setPhone("")
    }

    function ocultarAlerta(){
        setMostrarAlert(false);
    }

    function ocultarModal(){
        setMostrarModal(false);
    }

    function buildingModal(title,body,footer,event){
        setAction(event)
        setModalTitle(title)
        setModalBody(body)
        setMostrarModal(true)
        setModalFooter(footer)
    }

    useEffect(() => {
        if (modalConfirmation === true && action === "guardar") {
            var temporaryDataProvider = {
            
                "name": name,
                "address": address,
                "city": city,
                "details": details,
                "email": email,
                "phone": phone,            
                "modifiedTime": date
            }
    
            var dataProvider = removeEmptyData(temporaryDataProvider)
    
            setShowLoader(true);
            provider_services.putProviders(props.dataProveedor.key, dataProvider)
                .then(
                    (response => {
                        setShowLoader (false);
                        if (response) {
                            if (response.data.meta.status.code === "00") {
                                clearFields();
                                setColor("success");
                                props.actualizaResultados();
                            }else{
                                setColor("danger");
                            }
                            setMsjAlert(response.data.meta.status.message_ilgn[0].value);
                            setMostrarAlert(true);
                        }
                    })
                )
            setModalConfirmation("")
            setAction("")
        } else if (modalConfirmation === true && action === "eliminar") {
            setShowLoader(true);
            provider_services.deleteProvider(props.dataProveedor.key).then((response) => {
                if (response) {
                    setShowLoader (false);
                    if ( response.data.meta.status.code === "00" ) {
                        props.actualizaResultados();
                        props.selectAction("listar")
                    }else{
                        setColor("danger");
                        setMsjAlert(response.data.meta.status.message_ilgn[0].value);
                    }
                }
            })
            setModalConfirmation("")
            setAction("")
        }
    },[modalConfirmation, action])

    return (
        <rs.Card className='card'>
            <rs.CardHeader className="header">
                <rs.Row>
                    <rs.Col sm={10}>
                        <h3><FontAwesomeIcon icon={icon.faFileEdit}/> Detalle Proveedor: {props.dataProveedor.identifyID}</h3>
                    </rs.Col>
                    <rs.Col sm={2}>
                        <rs.Button 
                            className='button' 
                            onClick={(e) => props.selectAction("listar")}
                        >
                            <FontAwesomeIcon icon={icon.faList}/>{' '}Listar
                        </rs.Button>
                    </rs.Col>
                </rs.Row>
            </rs.CardHeader>
            <rs.CardBody>
                {showLoader ? <Loader /> :
                    <rs.Form>
                        <rs.Row>
                            <rs.Col sm={3}>
                                <rs.FormGroup>
                                    <rs.Label>
                                        <FontAwesomeIcon icon={icon.faIdCard}/> DNI / RUC
                                    </rs.Label>
                                    <rs.Input
                                        name="txtIdentifyID"
                                        type="number"
                                        defaultValue={props.dataProveedor.identifyID}
                                        disabled
                                    />
                                </rs.FormGroup>
                            </rs.Col>
                            <rs.Col sm={3}>
                                <rs.FormGroup>
                                    <rs.Label>
                                        <FontAwesomeIcon icon={icon.faFileText}/> Nombre
                                    </rs.Label>
                                    <rs.Input
                                        name="txtName"
                                        type="text"
                                        defaultValue={props.dataProveedor.fullName}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </rs.FormGroup>
                            </rs.Col>
                            <rs.Col sm={3}>
                                <rs.FormGroup>
                                    <rs.Label>
                                        <FontAwesomeIcon icon={icon.faAddressCard}/> Direccion
                                    </rs.Label>
                                    <rs.Input
                                        name="txtAddress"
                                        type="text"
                                        defaultValue={props.dataProveedor.address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </rs.FormGroup>
                            </rs.Col>
                            <rs.Col sm={3}>
                                <rs.FormGroup>
                                    <rs.Label>
                                        <FontAwesomeIcon icon={icon.faCity}/> Ciudad
                                    </rs.Label>
                                    <rs.Input
                                        name="txtCity"
                                        type="text"
                                        defaultValue={props.dataProveedor.city}
                                        onChange={(e) => setCity(e.target.value)}
                                    />
                                </rs.FormGroup>
                            </rs.Col>
                            <rs.Col sm={3}>
                                <rs.FormGroup>
                                    <rs.Label>
                                        <FontAwesomeIcon icon={icon.faPhone}/> Telefono
                                    </rs.Label>
                                    <rs.Input
                                        name="txtPhone"
                                        type="number"
                                        defaultValue={props.dataProveedor.phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </rs.FormGroup>
                            </rs.Col>
                            <rs.Col sm={3}>
                                <rs.FormGroup>
                                    <rs.Label>
                                        <FontAwesomeIcon icon={icon.faMailBulk}/> Email
                                    </rs.Label>
                                    <rs.Input
                                        name="txtEmail"
                                        type="email"
                                        defaultValue={props.dataProveedor.email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </rs.FormGroup>
                            </rs.Col>
                            <rs.Col sm={3}>
                                <rs.FormGroup>
                                    <rs.Label>
                                        <FontAwesomeIcon icon={icon.faComment}/> Detalle
                                    </rs.Label>
                                    <rs.Input
                                        name="txtDetail"
                                        type="textarea"
                                        defaultValue={props.dataProveedor.details}
                                        onChange={(e) => setDetails(e.target.value)}
                                    />
                                </rs.FormGroup>
                            </rs.Col>
                            <rs.Col sm={3}>
                                <rs.FormGroup>
                                    <rs.Label>
                                        <FontAwesomeIcon icon={icon.faUser}/> Registrado por:
                                    </rs.Label>
                                    <rs.Input
                                        name="txtUser"
                                        type="text"
                                        defaultValue={props.dataProveedor.user}
                                        disabled
                                    />
                                </rs.FormGroup>
                            </rs.Col>
                            <rs.Col sm={3}>
                                <rs.FormGroup>
                                    <rs.Label>
                                        <FontAwesomeIcon icon={icon.faCalendar}/> Fecha de Creación
                                    </rs.Label>
                                    <rs.Input
                                        name="txtCreationTime"
                                        type="text"
                                        defaultValue={props.dataProveedor.creationTime}
                                        disabled
                                    />
                                </rs.FormGroup>
                            </rs.Col>
                            <rs.Col sm={3}>
                                <rs.FormGroup>
                                    <rs.Label>
                                        <FontAwesomeIcon icon={icon.faCalendar}/> Fecha de Modificación
                                    </rs.Label>
                                    <rs.Input
                                        name="txtModifiedTime"
                                        type="text"
                                        defaultValue={props.dataProveedor.modifiedTime ? props.dataProveedor.modifiedTime : date}
                                        disabled
                                    />
                                </rs.FormGroup>
                            </rs.Col>
                            <rs.FormGroup className='actions'>
                                <rs.Button color='success' className='left' onClick={() =>
                                    buildingModal("Confirmación",`¿Desea guardar los nuevos datos del item: ${props.dataProveedor.code}?`,
                                        <>
                                            <rs.Button color="primary"
                                                onClick={()=> setModalConfirmation(true)}
                                            >
                                                Aceptar
                                            </rs.Button>
                                            <rs.Button color="danger" 
                                                onClick={()=> ocultarModal()}
                                            >
                                                Cancelar
                                            </rs.Button>
                                        </>,
                                        "guardar"
                                    )}>
                                    <FontAwesomeIcon icon={icon.faSave}/>{' '}Guardar
                                </rs.Button>
                                <rs.Button color='danger' className='right' onClick={() => 
                                        buildingModal("Confirmación",`¿Desea eliminar el item: ${props.dataProveedor.identifyID}?`,
                                            <>
                                                <rs.Button color="primary"
                                                    onClick={()=> setModalConfirmation(true)}
                                                >
                                                    Aceptar
                                                </rs.Button>
                                                <rs.Button color="danger" 
                                                    onClick={()=> ocultarModal()}
                                                >
                                                    Cancelar
                                                </rs.Button>
                                            </>,
                                            "eliminar"
                                        )}>
                                    <FontAwesomeIcon icon={icon.faTrash}/>{' '}Eliminar
                                </rs.Button>
                            </rs.FormGroup>
                        </rs.Row>
                    </rs.Form>
                }
                <hr/>
                <CustomModal modalVisible={mostrarModal} ocultar={ocultarModal} modalTitle={modalTitle} modalBody={modalBody} modalFooter={modalFooter}/>
                <Alerta msj={msjAlert} alertVisible={mostrarAlert} color={color} ocultar={ocultarAlerta}/>
            </rs.CardBody>
        </rs.Card>
    )
}

export default Detalle_Proveedor;
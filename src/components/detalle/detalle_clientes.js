import React, { useState, useEffect } from 'react';
import * as rs from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icon from '@fortawesome/free-solid-svg-icons';
import * as customer_services from '../../api/services/customer-services';
import CustomModal from "../utils/modal";
import Alerta from "../utils/alerta";
import Loader from "../utils/loader";
import {removeEmptyData} from "../utils/RemoveEmptyData";

function Detalle_Cliente(props){
    
    const [identifyID, setIdentifyID] = useState("");
    const [fullName, setFullName] = useState("");
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
        setFullName("")
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

            var temporaryDataCustomer = {
                "identifyID": identifyID,
                "fullName": fullName,
                "address": address,
                "city": city,
                "details": details,
                "email": email,
                "phone": phone,            
                "modifiedTime": date
            }
    
            var dataCustomer = removeEmptyData(temporaryDataCustomer)
    
            setShowLoader(true);
            customer_services.putCustomers(props.dataCliente.key, dataCustomer)
                .then(
                    (response => {
                        setShowLoader (false);
                        if (response) {
                            if (response.data.meta.status.code === "00") {
                                setColor("success");
                                clearFields();
                                props.actualizaResultados();
                                props.selectAction("listar")
                            }else{
                                setColor("danger");
                            }
                            ocultarModal();
                            setMsjAlert(response.data.meta.status.message_ilgn[0].value);
                            setMostrarAlert(true);
                        }
                    })
                )
            setModalConfirmation("")
            setAction("")
        } else if (modalConfirmation === true && action === "eliminar") {
            setShowLoader(true);
            customer_services.deleteCustomer(props.dataCliente.key).then((response) => {
                if (response) {
                    setShowLoader (false);
                    if ( response.data.meta.status.code === "00" ) {
                        ocultarModal();
                        props.actualizaResultados();
                        props.selectAction("listar")
                    }else{
                        ocultarModal();
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
                        <h3><FontAwesomeIcon icon={icon.faUserEdit}/> Detalle Cliente: {props.dataCliente.identifyID}</h3>
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
                                        placeholder={props.dataCliente.identifyID}
                                        onChange={(e) => setIdentifyID(e.target.value)}
                                    />
                                </rs.FormGroup>
                            </rs.Col>
                            <rs.Col sm={3}>
                                <rs.FormGroup>
                                    <rs.Label>
                                        <FontAwesomeIcon icon={icon.faFileText}/> Nombres y Apellidos
                                    </rs.Label>
                                    <rs.Input
                                        name="txtFullName"
                                        type="text"
                                        onChange={(e) => setFullName(e.target.value)}
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
                                        onChange={(e) => setEmail(e.target.value)}
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
                                        onChange={(e) => setCity(e.target.value)}
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
                                        onChange={(e) => setAddress(e.target.value)}
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
                                        type="text"
                                        onChange={(e) => setDetails(e.target.value)}
                                    />
                                </rs.FormGroup>
                            </rs.Col>
                            <rs.Col sm={3}>
                                <rs.FormGroup>
                                    <rs.Label>
                                        <FontAwesomeIcon icon={icon.faCalendar}/> Fecha Edición
                                    </rs.Label>
                                    <rs.Input
                                        name="txtModifiedTime"
                                        type="text"
                                        value={date}
                                        disabled
                                    />
                                </rs.FormGroup>
                            </rs.Col>
                            <rs.FormGroup className='actions'>
                                <rs.Button color='success' className='left' onClick={() =>
                                    buildingModal("Confirmación",`¿Desea guardar los nuevos datos del item: ${props.dataCliente.identifyID}?`,
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
                                        buildingModal("Confirmación",`¿Desea eliminar el item: ${props.dataCliente.identifyID}?`,
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

export default Detalle_Cliente;
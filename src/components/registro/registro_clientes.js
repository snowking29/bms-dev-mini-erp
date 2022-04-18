import React, { useState, useEffect } from 'react';
import * as rs from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icon from '@fortawesome/free-solid-svg-icons';
import * as customer_services from '../../api/services/customer-services';
import CustomModal from "../utils/modal";
import Alerta from "../utils/alerta";
import Loader from "../utils/loader";

function Registro_Clientes(props){

    const [fullName, setFullName] = useState("");
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

    const [action, setAction] = useState("")
    const [mostrarModal, setMostrarModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalBody, setModalBody] = useState("");
    const [modalFooter, setModalFooter] = useState("");
    const [modalConfirmation, setModalConfirmation] = useState(false);

    var date = new Date().toLocaleDateString('es-PE')
    
    function saveCustomer() {

        let dataCustomer = {
            "fullName": fullName,
            "address": address,
            "city": city,
            "phone": phone,
            "email": email,
            "identifyID": identifyID,
            "details": details,
            "creationTime": date,
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

    function ocultarModal(){
        setMostrarModal(false);
    }

    function buildingModal(title,body,footer,action){
        setAction(action)
        setModalTitle(title)
        setModalBody(body)
        setMostrarModal(true)
        setModalFooter(footer)
    }
    
    useEffect(() => {
        if (modalConfirmation === true && action === "guardar") {
            saveCustomer()
        }
    },[modalConfirmation])

    return (
        <rs.Card className='card'>
            <rs.CardHeader className='header'>
                <rs.Row>
                    <rs.Col sm={10}>
                        <h3><FontAwesomeIcon icon={icon.faUserPlus}/>Nuevo Cliente</h3>
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
                                        <FontAwesomeIcon icon={icon.faIdCard}/> Nro de Documento
                                    </rs.Label>
                                    <rs.Input
                                        name="txtIdentifyID"
                                        type="number"
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
                                        <FontAwesomeIcon icon={icon.faCalendar}/> Fecha Registro
                                    </rs.Label>
                                    <rs.Input
                                        name="txtCreationTime"
                                        type="text"
                                        value={date}
                                        disabled
                                    />
                                </rs.FormGroup>
                            </rs.Col>
                            <rs.FormGroup className='actions'>
                                <rs.Button className='right' color='success'onClick={() =>
                                    buildingModal("Confirmación",`¿Desea grabar el nuevo item?`,
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
                                    <FontAwesomeIcon icon={icon.faSave}/>{' '}Grabar
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

export default Registro_Clientes;

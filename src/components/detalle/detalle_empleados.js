import React, { useState, useEffect } from 'react';
import * as rs from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icon from '@fortawesome/free-solid-svg-icons';
import * as employee_services from '../../api/services/employee-services';
import CustomModal from "../utils/modal";
import Alerta from "../utils/alerta";
import Loader from "../utils/loader";
import {removeEmptyData} from "../utils/RemoveEmptyData";

function Detalle_Empleado(props){
    
    const [identifyID, setIdentifyID] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
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
        setPassword("")
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
            var temporaryDataEmployee = {
                "identifyID": identifyID,
                "password": password,
                "fullName": fullName,
                "email": email,
                "phone": phone,            
                "modifiedTime": date
            }
    
            var dataEmployee = removeEmptyData(temporaryDataEmployee)
    
            setShowLoader(true);
            employee_services.putEmployees(props.dataEmpleado.key, dataEmployee)
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
            employee_services.deleteEmployee(props.dataEmpleado.key).then((response) => {
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
                        <h3><FontAwesomeIcon icon={icon.faUserEdit}/> Detalle Empleado: {props.dataEmpleado.fullName}</h3>
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
                                        <FontAwesomeIcon icon={icon.faIdCard}/> DNI
                                    </rs.Label>
                                    <rs.Input
                                        name="txtIdentifyID"
                                        type="number"
                                        value={props.dataEmpleado.identifyID}
                                        disabled
                                        onChange={(e) => setIdentifyID(e.target.value)}
                                    />
                                </rs.FormGroup>
                            </rs.Col>
                            <rs.Col sm={3}>
                                <rs.Label>
                                    <FontAwesomeIcon icon={icon.faFileText}/> Contraseña
                                </rs.Label>
                                <rs.InputGroup>
                                    <rs.Input
                                        name="txtPassword"
                                        type="password"
                                        defaultValue={props.dataEmpleado.password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </rs.InputGroup>
                            </rs.Col>
                            <rs.Col sm={3}>
                                <rs.FormGroup>
                                    <rs.Label>
                                        <FontAwesomeIcon icon={icon.faFileText}/> Nombres y Apellidos
                                    </rs.Label>
                                    <rs.Input
                                        name="txtFullName"
                                        type="text"
                                        defaultValue={props.dataEmpleado.fullName}
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
                                        defaultValue={props.dataEmpleado.phone}
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
                                        defaultValue={props.dataEmpleado.email}
                                        onChange={(e) => setEmail(e.target.value)}
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
                                        defaultValue={props.dataEmpleado.creationTime}
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
                                        defaultValue={props.dataEmpleado.modifiedTime ? props.dataEmpleado.modifiedTime : date}
                                        disabled
                                    />
                                </rs.FormGroup>
                            </rs.Col>
                            <rs.FormGroup className='actions'>
                                <rs.Button color='success' className='left' onClick={() =>
                                    buildingModal("Confirmación",`¿Desea guardar los nuevos datos del item: ${props.dataEmpleado.identifyID}?`,
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
                                        buildingModal("Confirmación",`¿Desea eliminar el item: ${props.dataEmpleado.identifyID}?`,
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

export default Detalle_Empleado;
import React, { useState, useEffect } from 'react';
import * as rs from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icon from '@fortawesome/free-solid-svg-icons';
import * as employee_services from '../../api/services/employee-services';
import CustomModal from "../utils/modal";
import Alerta from "../utils/alerta";
import Loader from "../utils/loader";
import { properties } from '../properties/bms-dev';

function Registro_Empleados(props){

    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
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

    const [isShown, setIsSHown] = useState(false);

    const togglePassword = () => { 
        setIsSHown((isShown) => !isShown);
    };

    var date = new Date().toLocaleDateString('es-PE')
    
    function ocultarAlerta(){
        setMostrarAlert(false);
    }

    function ocultarModal(){
        setMostrarModal(false);
    }

    function buildingModal(title,body,footer,event){
        let result = validate();

        if (result !== "validado") {
            setColor("danger");
            setMsjAlert(result);
            setMostrarAlert(true);
            return;
        }

        setAction(event)
        setModalTitle(title)
        setModalBody(body)
        setMostrarModal(true)
        setModalFooter(footer)
    }

    const validate = () => {
        var error = "validado"
        if (!identifyID) {
            error = properties['error.form.employee.identifyID'];
            return error;
        }
        if (!fullName) {
            error = properties['error.form.employee.fullName'];
            return error;
        }
        if (!phone) {
            error = properties['error.form.employee.phone'];
            return error;
        }
        return error;
    };
    
    useEffect(() => {
        if (modalConfirmation === true && action === "guardar") {
            
            let dataEmployee = {
                "password": password,
                "fullName": fullName,
                "phone": phone,
                "email": email,
                "identifyID": identifyID,
                "creationTime": date,
                "modifiedTime": ""
            }
            setShowLoader(true);
            employee_services.postEmployee(dataEmployee)
                .then((response => {
                    setShowLoader (false);
                    if (response) {
                        if (response.data.meta.status.code === "00") {
                            setColor("success");
                            props.actualizaResultados();
                        }else{
                            setColor("danger");
                        }
                        ocultarModal();
                        setMsjAlert(response.data.meta.status.message_ilgn[0].value);
                        setMostrarAlert(true);
                    }
            }))
            setModalConfirmation("")
            setAction("")
        }
    },[modalConfirmation, action])
    
    return (
        <rs.Card className='card'>
            <rs.CardHeader className='header'>
                <rs.Row>
                    <rs.Col sm={10}>
                        <h3><FontAwesomeIcon icon={icon.faUserPlus}/> Nuevo Empleado</h3>
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
                                        <FontAwesomeIcon icon={icon.faIdCard}/> Numero de Documento
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
                                <rs.Label>
                                    <FontAwesomeIcon icon={icon.faFileText}/> Contraseña
                                </rs.Label>
                                <rs.InputGroup>
                                    <rs.Input
                                        name="txtPassword"
                                        type={isShown ? "text" : "password"}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <rs.Button type="button" title="Mostrar/Ocultar" onClick={togglePassword}>
                                        <FontAwesomeIcon icon={icon.faEye}/>
                                    </rs.Button>
                                </rs.InputGroup>
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
                            <rs.FormGroup className='actions' >
                                <rs.Button className='right' color='success'onClick={() =>
                                    buildingModal("Confirmación",`¿Está seguro de guardar el nuevo cliente?`,
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

export default Registro_Empleados;

/*<rs.Button type="button" color="primary" title="Auto generar">
                                        <FontAwesomeIcon icon={icon.faKey}/>
                                    </rs.Button>
                                    */
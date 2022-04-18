import React, { useState, useEffect } from 'react';
import * as rs from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icon from '@fortawesome/free-solid-svg-icons';
import * as category_service from '../../api/services/category-services';
import CustomModal from "../utils/modal";
import Alerta from "../utils/alerta";
import Loader from "../utils/loader";

function Registro_Categoria(props){

    const [code,setCode] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
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
    
    function saveCategory() {
        
        let dataCategory = {
            "code": code,
            "name": name,
            "description": description,
            "products":[],
            "creationTime": date,
            "modifiedTime": ""
        }
        setShowLoader(true);
        category_service.postCategories(dataCategory)
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
            saveCategory()
        }
    },[modalConfirmation])

    return (
        <rs.Card className='card'>
            <rs.CardHeader className="header">
                <rs.Row>
                    <rs.Col sm={10}>
                        <h3><FontAwesomeIcon icon={icon.faFileCirclePlus}/> Nueva Categoría</h3>
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
                                        <FontAwesomeIcon icon={icon.faBarcode}/> Codigo
                                    </rs.Label>
                                    <rs.Input
                                        name="txtCode"
                                        id="txtCode"
                                        type="text"
                                        onChange={(e) => setCode(e.target.value)}
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
                                        id="txtName"
                                        type="text"
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </rs.FormGroup>
                            </rs.Col>
                            <rs.Col sm={3}>
                                <rs.FormGroup>
                                    <rs.Label>
                                        <FontAwesomeIcon icon={icon.faComment}/> Descripcion
                                    </rs.Label>
                                    <rs.Input
                                        name="txtDescription"
                                        id="txtDescription"
                                        type="text"
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </rs.FormGroup>
                            </rs.Col>
                            <rs.Col sm={3}>
                                <rs.FormGroup>
                                    <rs.Label>
                                        <FontAwesomeIcon icon={icon.faCalendar}/> Fecha Registro
                                    </rs.Label>
                                    <rs.Input
                                        name="txtFCreation"
                                        id="txtFCreation"
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

export default Registro_Categoria;

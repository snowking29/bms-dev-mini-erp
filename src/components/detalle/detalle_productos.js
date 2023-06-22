import React, { useState, useEffect } from 'react';
import * as rs from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icon from '@fortawesome/free-solid-svg-icons';
import * as product_service from '../../api/services/product-services';
import * as category_service from '../../api/services/category-services';
import CustomModal from "../utils/modal";
import Alerta from "../utils/alerta";
import Loader from "../utils/loader";
import {removeEmptyData} from "../utils/RemoveEmptyData";

function Detalle_Producto(props){
    
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [keyCategory, setKeyCategory] = useState("");
    const [categories, setCategories] = useState([]);
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
        setCode("")
        setName("")
        setDescription("")
        setCategory("")
    }

    function ocultarAlerta(){
        setMostrarAlert(false);
    }

    function saveCategoryData (e) {
        setCategory(e.target.value)
        categories.forEach(c=>{
            if (c.props.value === e.target.value){
                setKeyCategory(c.key)
            }
        })
    }

    useEffect(() => {
        category_service.getCategories().then((response) => {
            if (response){
                if (response.status === 200){
                    var filas = [];
                    response.data.data.forEach( c => {
                        filas.push(
                            <option key={c.key} value={c.name}>{c.name}</option>
                        )
                    })
                    setCategories(filas);
                }
            }
        })
    }, [])

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

            var temporaryDataProduct = {
                "code": code,
                "name": name,
                "description": description,
                "category": category,
                "modifiedTime": date
            }
            
            var dataProduct = removeEmptyData(temporaryDataProduct)
    
            setShowLoader(true);
            product_service.putProducts(props.dataProducto.key, dataProduct)
                .then((response => {
                    setShowLoader (false);
                    if (response) {
                        if (response.data.meta.status.code === "00") {
    
                            if (category !== "") {
                                let dataCategory = {
                                    "products":props.dataProducto.key
                                }
                                category_service.putCategories(keyCategory,dataCategory)
                            }
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
                }))
            setModalConfirmation("")
            setAction("")

        } else if (modalConfirmation === true && action === "eliminar") {
            setShowLoader(true);
            product_service.deleteProduct(props.dataProducto.key).then((response) => {
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
                        <h3><FontAwesomeIcon icon={icon.faFileEdit}/> Detalle Producto: {props.dataProducto.code}</h3>
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
                                        defaultValue={props.dataProducto.code}
                                        disabled
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
                                        defaultValue={props.dataProducto.name}
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
                                        type="textarea"
                                        defaultValue={props.dataProducto.description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </rs.FormGroup>
                            </rs.Col>
                            <rs.Col sm={3}>
                                <rs.FormGroup>
                                    <rs.Label>
                                        <FontAwesomeIcon icon={icon.faBoxes}/> Categoría
                                    </rs.Label>
                                    <rs.Input
                                        name="selectCategory"
                                        id="selectCategory"
                                        type="select"
                                        onChange={(e) => saveCategoryData(e)}
                                        defaultValue={props.dataProducto.category}
                                    >
                                        {props.dataProducto.category}
                                        {categories}
                                    </rs.Input>
                                </rs.FormGroup>
                            </rs.Col>
                            
                            <rs.Col sm={3}>
                                <rs.FormGroup>
                                    <rs.Label>
                                        <FontAwesomeIcon icon={icon.faDollarSign}/> Precio de Compra
                                    </rs.Label>
                                    <rs.Input
                                        name="txtPriceSale"
                                        id="txtPriceSale"
                                        type="text"
                                        defaultValue={props.dataProducto.priceSale}
                                        disabled
                                    />
                                </rs.FormGroup>
                            </rs.Col>
                            <rs.Col sm={3}>
                                <rs.FormGroup>
                                    <rs.Label>
                                        <FontAwesomeIcon icon={icon.faMoneyBillTransfer}/> Precio de Venta
                                    </rs.Label>
                                    <rs.Input
                                        name="txtPriceCost"
                                        id="txtPriceCost"
                                        type="text"
                                        defaultValue={props.dataProducto.priceCost}
                                        disabled
                                    />
                                </rs.FormGroup>
                            </rs.Col>
                            <rs.Col sm={3}>
                                <rs.FormGroup>
                                    <rs.Label>
                                        <FontAwesomeIcon icon={icon.faSortNumericAsc}/> Stock
                                    </rs.Label>
                                    <rs.Input
                                        name="txtStock"
                                        id="txtStock"
                                        type="text"
                                        defaultValue={props.dataProducto.stock}
                                        disabled
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
                                        defaultValue={props.dataProducto.user}
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
                                        defaultValue={props.dataProducto.creationTime}
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
                                        defaultValue={props.dataProducto.modifiedTime ? props.dataProducto.modifiedTime : date}
                                        disabled
                                    />
                                </rs.FormGroup>
                            </rs.Col>
                            <rs.FormGroup className='actions'>
                                <rs.Button color='success' className='left' onClick={() =>
                                    buildingModal("Confirmación",`¿Desea guardar los nuevos datos del item: ${props.dataProducto.code}?`,
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
                                        buildingModal("Confirmación",`¿Desea eliminar el item: ${props.dataProducto.code}?`,
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

export default Detalle_Producto;


/*
<rs.Col sm={3}>
                                <rs.FormGroup>
                                    <rs.Label>
                                        <FontAwesomeIcon icon={icon.faWarehouse}/> Almacén
                                    </rs.Label>
                                    <rs.Input
                                        name="txtWarehouse"
                                        id="txtWarehouse"
                                        type="text"
                                        defaultValue={props.dataProducto.warehouse}
                                    />
                                </rs.FormGroup>
                            </rs.Col>
                            */
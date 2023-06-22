import React, { useState, useEffect } from 'react';
import * as rs from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icon from '@fortawesome/free-solid-svg-icons';
import * as product_service from '../../api/services/product-services';
import * as category_service from '../../api/services/category-services';
import CustomModal from "../utils/modal";
import Alerta from "../utils/alerta";
import Loader from "../utils/loader";
import { properties } from '../properties/bms-dev';

function Registro_Producto(props){

    const [code,setCode] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [keyCategory, setKeyCategory] = useState("");
    //const [warehouse, setWarehouse] = useState("");
    const [msjAlert, setMsjAlert] = useState("");
    const [mostrarAlert, setMostrarAlert] = useState(false);
    const [color, setColor] = useState("secondary");
    const [showLoader, setShowLoader] = useState(false);
    const [categories, setCategories] = useState([]);

    const [action, setAction] = useState("")
    const [mostrarModal, setMostrarModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalBody, setModalBody] = useState("");
    const [modalFooter, setModalFooter] = useState("");
    const [modalConfirmation, setModalConfirmation] = useState(false);
    
    var date = new Date().toLocaleDateString('es-PE')

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

    const validate = () => {
        var error = "validado"
        if (!code) {
            error = properties['error.form.product.id']
            return error;
        }
        if (!name) {
            error = properties['error.form.product.name'];
            return error;
        }
        if (!category) {
            error = properties['error.form.product.category'];
            return error;
        }
        return error;
    };


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
    
    useEffect(() => {
        if (modalConfirmation === true && action === "guardar") {
            let dataProduct = {
                "code": code,
                "name": name,
                "category": category,
                "description": description,
                "stock": 0,
                "priceCost": 0,
                "priceSale": 0,
                //"warehouse": warehouse,
                "creationTime": date,
                "modifiedTime": "-"
            }
            setShowLoader(true);
            product_service.getProductByCode(dataProduct.code)
                .then((response => {
                    if (response) {
                        if (response.data.meta.status.code === "00") {
                            setShowLoader (false);
                            setColor("warning");
                            ocultarModal();
                            setMsjAlert("Ya existe un registro con este codigo de producto.");
                            setMostrarAlert(true);
                        } else {
                            product_service.postProducts(dataProduct)
                                .then((response => {
                                    setShowLoader (false);
                                    if (response) {
                                        if (response.data.meta.status.code === "00") {
                                            setColor("success");
                                            let dataCategory = {
                                                "products":[response.data.key]
                                            }
                                            category_service.putCategories(keyCategory,dataCategory)
                                            props.actualizaResultados();
                                        }else{
                                            setColor("danger");
                                        }
                                        ocultarModal();
                                        setMsjAlert(response.data.meta.status.message_ilgn[0].value);
                                        setMostrarAlert(true);
                                    }
                                }))
                        }
                        setModalConfirmation("")
                        setAction("")
                    }
                }))
        }
    },[modalConfirmation, action])

    return (
        <rs.Card className='card'>
            <rs.CardHeader className='header'>
                <rs.Row>
                    <rs.Col sm={10}>
                        <h3><FontAwesomeIcon icon={icon.faFileCirclePlus}/> Nuevo Producto</h3>
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
                            <rs.Col sm={4}>
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
                            <rs.Col sm={4}>
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
                            <rs.Col sm={4}>
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
                            <rs.Col sm={4}>
                                <rs.FormGroup>
                                    <rs.Label>
                                        <FontAwesomeIcon icon={icon.faBoxes}/> Categoria
                                    </rs.Label>
                                    <rs.Input
                                        name="selectCategory"
                                        id="selectCategory"
                                        type="select"
                                        onChange={(e) => saveCategoryData(e)}
                                    >
                                        <option key = "-" value = "-">[Seleccione]</option>
                                        {categories}
                                    </rs.Input>
                                </rs.FormGroup>
                            </rs.Col>
                            <rs.Col sm={4}>
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
                                    buildingModal("Confirmación",`¿¿Está seguro de guardar el nuevo producto?`,
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

export default Registro_Producto;


/*
<rs.Col sm={4}>
                                <rs.FormGroup>
                                    <rs.Label>
                                        <FontAwesomeIcon icon={icon.faWarehouse}/> Almacen
                                    </rs.Label>
                                    <rs.Input
                                        name="txtWarehouse"
                                        id="txtWarehouse"
                                        type="text"
                                        onChange={(e) => setWarehouse(e.target.value)}
                                    />
                                </rs.FormGroup>
                            </rs.Col>
                            */
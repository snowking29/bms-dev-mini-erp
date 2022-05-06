import React, { useEffect, useState } from 'react';
import * as rs from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icon from '@fortawesome/free-solid-svg-icons';
import * as provider_services from '../../api/services/provider-services';
import * as product_services from '../../api/services/product-services';
import * as entry_Services from '../../api/services/entry-services';
import CustomModal from "../utils/modal";
import Alerta from "../utils/alerta";
import Loader from "../utils/loader";
import { properties } from '../properties/bms-dev';
import {removeEmptyData} from "../utils/RemoveEmptyData";

function Detalle_Entrada(props){

    const [dataProducts, setDataProducts] = useState([]);
    const [products, setProducts] = useState([]);

    const [codeEntry, setCodeEntry] = useState("");
    const [provider, setProvider] = useState("");

    const [keyProduct, setKeyProduct] = useState("");
    const [currentStock, setCurrentStock] = useState(0);
    const [codeProduct, setCodeProduct] = useState("");
    const [nameProduct, setNameProduct] = useState("");
    const [categoryProduct, setCategoryProduct] = useState("");
    const [warehouse, setWarehouse] = useState("");
    const [priceCost, setPriceCost] = useState(0);
    const [priceSale, setPriceSale] = useState(0);
    const [quantity, setQuantity] = useState(0);

    const [entriesTable, setEntriesTable] = useState([]);
    const [entriesData, setEntriesData] = useState([]);

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
    
    const user = localStorage.getItem("name");
    var date = new Date().toLocaleDateString('es-PE')

    function saveProductData (e) {
        if (e.target.value !== "-"){
            dataProducts.forEach(c=>{
                if (c.code === e.target.value){
                    setKeyProduct(c.key);
                    setCurrentStock(c.stock);
                    setCodeProduct(c.code)
                    setCategoryProduct(c.category)
                    setWarehouse(c.warehouse)
                    setNameProduct(c.name)
                }
            })
        } else {
            setKeyProduct("");
            setCurrentStock("");
            setCodeProduct("")
            setCategoryProduct("")
            setWarehouse("")
            setNameProduct("")
        }
    }

    useEffect(() => {
        product_services.getProducts().then((response) => {
            if (response){
                if (response.status === 200){
                    var filas = [];
                    response.data.data.forEach( c => {
                        filas.push(
                            <option key={c.code} value={c.code}>{c.code}</option>
                        )
                    })
                    setDataProducts(response.data.data);
                    setProducts(filas);
                }
            }
        })
    }, [])

    useEffect(()=> {
        var filas = [];
        props.dataEntrada.entries.forEach( a => {
            filas.push(
                <tr key= {a.code}>
                    <td><FontAwesomeIcon title="Eliminar" type="button" className= 'select-button'icon={icon.faTrash} onClick={() => deleteEntryFromTable(a.code)}/></td>
                    <td>{a.code}</td>
                    <td>{a.name}</td>
                    <td>{a.priceCost}</td>
                    <td>{a.quantity}</td>
                    <td>{a.subTotal}</td>
                </tr>
            )

            setEntriesTable(filas);
        })
    },[])


    function deleteEntryFromTable(key){
        setEntriesTable(entriesTable.filter(item => item.key !== key));
        entriesData.filter(item=> item.code !== key);
    }

    function checkDuplicity(){
        if (entriesTable.some(e => e.key === codeProduct))return true;
    }

    const validate = () => {
        var error = "validado"
        if (!codeProduct) {
            error = properties['error.form.entry.product.code'];
            return error;
        }
        if (!priceCost) {
            error = properties['error.form.entry.product.priceCost'];
            return error;
        }
        if (!priceSale) {
            error = properties['error.form.entry.product.priceSale'];
            return error;
        }
        if (!quantity) {
            error = properties['error.form.entry.product.quantity'];
            return error;
        }
        return error;
    };

    function setTableItems() {
        var filas = [];
        var subTotal = priceCost * quantity;
        
        let validateResult = validate();

        if (validateResult !== "validado") {
            setColor("danger");
            setMsjAlert(validateResult);
            setMostrarAlert(true);
            return;
        }

        let result = checkDuplicity()
        
        if (result){
            setColor("danger");
            setMsjAlert("El producto ya esta agregado.");
            setMostrarAlert(true);
            return;
        }

        filas.push(
            <tr key={codeProduct}>
                <td><FontAwesomeIcon title="Eliminar" type="button" className= 'select-button'icon={icon.faTrash} onClick={() => deleteEntryFromTable(codeProduct)}/></td>
                <td>{codeProduct}</td>
                <td>{nameProduct}</td>
                <td>{priceCost}</td>
                <td>{quantity}</td>
                <td>{subTotal}</td>
            </tr>
        )
        setEntriesTable((prevArr) => ([...prevArr, filas]));
        
        var newEntry = {
            "key": keyProduct,
            "code": codeProduct,
            "name": nameProduct,
            "category":categoryProduct,
            "warehouse":warehouse,
            "priceCost": parseFloat(priceCost),
            "priceSale": parseFloat(priceSale),
            "quantity": parseInt(quantity),
            "subTotal": parseFloat(subTotal)
        }

        setEntriesData((prevArr) => ([...prevArr, newEntry]))

        clearCurrentEntry();
    }

    function clearCurrentEntry(){
        setKeyProduct("");
        setCodeProduct("");
        setNameProduct("");
        setCategoryProduct("");
        setWarehouse("");
        setPriceCost(0);
        setPriceSale(0);
        setQuantity(0);
    }

    function ocultarAlerta(){
        setMostrarAlert(false);
    }

    function ocultarModal(){
        setMostrarModal(false);
    }

    function buildingModal(title,body,footer,event){
        if (entriesTable.length === 0 ){
            ocultarModal();
            setColor("danger");
            setMsjAlert("La tabla de entradas est� vac�a.");
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
            console.log(entriesTable)
            var subTotals = []
            entriesData.forEach(c=>{ 
                subTotals.push(c.subTotal)
            })
            var total = subTotals.reduce((prevValue, curValue) => { return prevValue+curValue});

            var temporaryDataEntry = {
                "code": codeEntry,
                "user": user,
                "total": total,
                "provider": provider,
                "entries": entriesData,
                "modifiedTime": date
            }

            var dataEntry = removeEmptyData(temporaryDataEntry)

            setShowLoader(true);
            entry_Services.putEntries(props.dataEntrada.key,dataEntry, "false")
                .then((response => {
                setShowLoader (false);
                if (response) {
                    if (response.data.meta.status.code === "00") {
                        entriesData.forEach( e=> {
                            let data = {
                                "priceCost":e.priceCost,
                                "priceSale": e.priceSale,
                                "stock": e.stock
                            }
                            product_services.putProducts(e.key,data)
                        })
                        setColor("success");
                            props.actualizaResultados();
                            setEntriesTable([]);
                            setProvider("");
                            setCodeEntry("");
                            clearCurrentEntry();
                    }else{
                        setColor("danger");
                    }
                    ocultarModal();
                    setMsjAlert(response.data.meta.status.message_ilgn[0].value);
                    setMostrarAlert(true);
                }
            }))
        }
    },[modalConfirmation, action])

    return ( 
        <rs.Card className='card'>
            <rs.CardHeader className="header">
                <rs.Row>
                    <rs.Col sm={10}>
                        <h3>&nbsp;Detalle Entrada</h3>
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
                                        <FontAwesomeIcon icon={icon.faFileText}/> Nro de Documento
                                    </rs.Label>
                                    <rs.Input
                                        name="txtName"
                                        type="text"
                                        value={props.dataEntrada.code}
                                        disabled
                                    />
                                </rs.FormGroup>
                            </rs.Col>
                            <rs.Col sm={4}>
                                <rs.FormGroup>
                                    <rs.Label>
                                        <FontAwesomeIcon icon={icon.faCalendar}/> Fecha de Registro
                                    </rs.Label>
                                    <rs.Input
                                        name="txtCreationTime"
                                        type="text"
                                        value={props.dataEntrada.creationTime}
                                        disabled
                                    />
                                </rs.FormGroup>
                            </rs.Col>
                            <rs.Col sm={4}>
                                <rs.FormGroup>
                                    <rs.Label>
                                        <FontAwesomeIcon icon={icon.faUser}/> Usuario
                                    </rs.Label>
                                    <rs.Input
                                        name="txtUser"
                                        type="text"
                                        value={user}
                                        disabled
                                    />
                                </rs.FormGroup>
                            </rs.Col>
                            <rs.Col sm={4}>
                                <rs.FormGroup>
                                    <rs.Label>
                                        <FontAwesomeIcon icon={icon.faAlignJustify}/> Proveedor
                                    </rs.Label>
                                    <rs.Input
                                        name="txtProvider"
                                        id="txtProvider"
                                        type="text"
                                        value={props.dataEntrada.provider}
                                        disabled
                                    />
                                </rs.FormGroup>
                            </rs.Col>
                            <rs.Col sm={4}>
                                <rs.FormGroup>
                                    <rs.Label>
                                        <FontAwesomeIcon icon={icon.faBoxArchive}/> Codigo Producto
                                    </rs.Label>
                                    <rs.Input
                                        name="selectCodProd"
                                        id="selectCodProd"
                                        type="select"
                                        value={codeProduct}
                                        onChange={(e) => saveProductData(e)}
                                    >
                                        <option key = "-" value = "-">[Seleccione]</option>
                                        {products}
                                    </rs.Input>
                                </rs.FormGroup>
                            </rs.Col>
                            <rs.Col sm={4}>
                                <rs.FormGroup>
                                    <rs.Label>
                                        <FontAwesomeIcon icon={icon.faAlignJustify}/> Nombre Producto
                                    </rs.Label>
                                    <rs.Input
                                        name="txtNameProd"
                                        id="txtNameProd"
                                        type="text"
                                        value={nameProduct}
                                        disabled
                                    />
                                </rs.FormGroup>
                            </rs.Col>
                            <rs.Col sm={4}>
                                <rs.FormGroup>
                                    <rs.Label>
                                        <FontAwesomeIcon icon={icon.faMoneyBill}/> Precio Compra
                                    </rs.Label>
                                    <rs.Input
                                        name="txtPriceCost"
                                        id="txtPriceCost"
                                        value={priceCost}
                                        onChange={(e) => setPriceCost(e.target.value)}
                                        type="number"
                                    />
                                </rs.FormGroup>
                            </rs.Col>
                            <rs.Col sm={4}>
                                <rs.FormGroup>
                                    <rs.Label>
                                        <FontAwesomeIcon icon={icon.faMoneyBill}/> Precio Venta
                                    </rs.Label>
                                    <rs.Input
                                        name="txtPriceSale"
                                        id="txtPriceSale"
                                        value={priceSale}
                                        onChange={(e) => setPriceSale(e.target.value)}
                                        type="number"
                                    />
                                </rs.FormGroup>
                            </rs.Col>
                            <rs.Col sm={4}>
                                <rs.FormGroup>
                                    <rs.Label>
                                        <FontAwesomeIcon icon={icon.faSortNumericAsc}/> Cantidad
                                    </rs.Label>
                                    <rs.Input
                                        name="txtQuantity"
                                        id="txtQuantity"
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                        type="number"
                                    />
                                </rs.FormGroup>
                            </rs.Col>
                            <rs.FormGroup>
                                <div className='actions'>
                                    <rs.Button className='right' color="primary" onClick={() => setTableItems() }><FontAwesomeIcon icon={icon.faPlus}/> Agregar</rs.Button>
                                </div>
                            </rs.FormGroup>
                        </rs.Row>
                        <rs.FormGroup>
                            <rs.Table responsive className='styled-table'>
                                <thead>
                                    <tr>
                                        <th style={{width: "0%"}}>
                                            
                                        </th>
                                        <th style={{width: "10%"}}>
                                            Codigo
                                        </th>
                                        <th style={{width: "30%"}}>
                                            Nombre
                                        </th>
                                        <th style={{width: "20%"}}>
                                            Precio de Compra
                                        </th>
                                        <th style={{width: "20%"}}>
                                            Cantidad
                                        </th>
                                        <th style={{width: "20%"}}>
                                            Sub Total
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {entriesTable}
                                </tbody>
                            </rs.Table>
                        </rs.FormGroup>
                        <hr/>
                        <rs.FormGroup className='actions'>
                            <rs.Button className='right' color='success'onClick={() =>
                                buildingModal("Confirmación",`¿Está seguro de guardar la nueva entrada?`,
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
                    </rs.Form>
                }
                <CustomModal modalVisible={mostrarModal} ocultar={ocultarModal} modalTitle={modalTitle} modalBody={modalBody} modalFooter={modalFooter}/>
                <Alerta msj={msjAlert} alertVisible={mostrarAlert} color={color} ocultar={ocultarAlerta}/>
            </rs.CardBody>
        </rs.Card>
    )
}

export default Detalle_Entrada;

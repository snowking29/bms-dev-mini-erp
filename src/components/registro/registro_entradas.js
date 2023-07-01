import React, { useEffect, useState } from 'react';
import * as rs from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icon from '@fortawesome/free-solid-svg-icons';
import * as provider_services from '../../api/services/provider-services';
import * as product_services from '../../api/services/product-services';
import * as entry_Services from '../../api/services/entry-services';
import * as inventory_services from '../../api/services/inventory-services';
import CustomModal from "../utils/modal";
import Alerta from "../utils/alerta";
import Loader from "../utils/loader";

function Registro_Entrada(props){

    const [dataProducts, setDataProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [dataProviders, setDataProviders] = useState([]);
    const [providers, setProviders] = useState([]);

    var date = new Date().toLocaleDateString('es-PE');
    const user = props.currentUser.fullName;

    /* LOADER STATES & FUNCTIONS */
    const [msjAlert, setMsjAlert] = useState("");
    const [mostrarAlert, setMostrarAlert] = useState(false);
    const [color, setColor] = useState("secondary");
    const [showLoader, setShowLoader] = useState(false);

    function ocultarAlerta(){
        setMostrarAlert(false);
    }
    /* END LOADER STATES*/

    /* MODAL STATES & FUNCTIONS */
    const [action, setAction] = useState("")
    const [mostrarModal, setMostrarModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalBody, setModalBody] = useState("");
    const [modalFooter, setModalFooter] = useState("");
    const [modalConfirmation, setModalConfirmation] = useState(false);

    const [provider, setProvider] = useState("");
    const [nameProduct, setNameProduct] = useState("");
    const [stock, setStock] = useState(0);

    const [entries, setEntries] = useState([]);
    const [addFormData, setAddFormData] = useState({
        documentNumber: "",
        productKey: "",
        productCode: "",
        productName: "",
        category: "",
        priceCost: "",
        priceSale: "",
        quantity: "",
        stock: "",
        subTotal: "",
        provider: "",
    })

    function ocultarModal(){
        setMostrarModal(false);
    }
    /* END MODAL STATES */

    /* INVOKE SERVICES FOR FILL COMBOS */
    function buildingModal(title,body,footer,event){
        if (entries.length === 0 ){
            ocultarModal();
            setColor("danger");
            setMsjAlert("La tabla de entradas está vacía.");
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
        provider_services.getProviders().then((response) => {
            if (response){
                if (response.status === 200){
                    var filas = [];
                    response.data.data.forEach( c => {
                        filas.push(
                            <option key={c.indetifiyID} value={c.identifyID}>{c.identifyID}</option>
                        )
                    })
                    setDataProviders(response.data.data);
                    setProviders(filas);
                }
            }
        })
    }, [])

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
    /* END INVOKE SERVICES FOR FILL COMBOS */

    const handleAddFormChange = (event) => {
        event.preventDefault();
        if (event.target.name === "providerId") {
            if (event.target.value !== "-") {
                dataProviders.forEach(c=>{
                    if (c.identifyID === event.target.value) {
                        setProvider(c.fullName);
                    }
                })
            } else {
                setProvider("");
            }
        } 

        if (event.target.name === "productCode"){
            if (event.target.value !== "-"){
                dataProducts.forEach(c=>{
                    if (c.code === event.target.value){
                        setNameProduct(c.name);
                    }
                })
            } else {
                setNameProduct("");
            }
        } 

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;
    
        const newFormData = { ...addFormData };
        newFormData[fieldName] = fieldValue;

        var subTotal = parseFloat(newFormData["priceCost"]) * parseInt(newFormData["quantity"]);
        newFormData["subTotal"] = subTotal;
        newFormData["provider"] = provider;
        dataProducts.forEach(c=>{
            if (c.code === event.target.value) {
                newFormData["productKey"] = c.key;
                newFormData["productName"] = c.name;
                newFormData["category"] = c.category;
                
                setStock(parseInt(c.stock))
                
            }
        })
        var totalStock = parseInt(newFormData["quantity"]) + stock;
        newFormData["stock"] = parseInt(totalStock);
        
        setAddFormData(newFormData);
    };

    function checkDuplicity(key){    
        if (entries.some((entry) => entry.productKey === key)) return true;
    }

    const handleAddFormSubmit = (event) => {
        event.preventDefault();
        let result = checkDuplicity(addFormData.productKey)
        
        if (result){
            setColor("danger");
            setMsjAlert("El producto ya esta agregado.");
            setMostrarAlert(true);
            return;
        }

        const newEntry = {
            productKey: addFormData.productKey,
            productCode: addFormData.productCode,
            productName: addFormData.productName,
            category: addFormData.category,
            priceCost: addFormData.priceCost,
            priceSale: addFormData.priceSale,
            quantity: addFormData.quantity,
            stock: addFormData.stock,
            subTotal: addFormData.subTotal,
        };
        const newEntries = [...entries, newEntry];
        setEntries(newEntries);

        clearFields(event);
    };

    function clearFields(event) {
        setProvider("");
        setNameProduct("");
        for (var e of event.target) {
            if (e.name !== "documentNumber") {
                e.value = ""
            }
        }
    }

    const handleDeleteClick = (key) => {
        const newEntries = [...entries];
    
        const index = entries.findIndex((entry) => entry.productKey === key);
    
        newEntries.splice(index, 1);
    
        setEntries(newEntries);
    };

    useEffect(() => {
        if (modalConfirmation === true && action === "guardar") {

            var subTotals = []
            entries.forEach(e=>{ subTotals.push(e.subTotal)})
            var total = subTotals.reduce((prevValue, curValue) => { return prevValue+curValue});
            
            let dataEntry = {
                "code": addFormData.documentNumber,
                "user": user,
                "total": total,
                "provider": addFormData.provider,
                "entries": entries,
                "creationTime": date
            }
            
            setShowLoader(true);
            entry_Services.postEntries(dataEntry)
                .then((response => {
                    ocultarModal();
                    setShowLoader (false);
                    if (response) {
                        if (response.data.meta.status.code === "00") {

                            let dataInventory = {
                                "creationTime": date,
                                "products": []
                            }

                            let productsModified = []

                            entries.forEach( e=> {
                                let data = {
                                    "priceCost":e.priceCost,
                                    "priceSale": e.priceSale,
                                    "stock": e.stock
                                }
                                product_services.putProducts(e.productKey,data)

                                let dataProducts = {
                                    "code": e.productCode,
                                    "name": e.productName,
                                    "category": e.category,
                                    "entries": parseFloat(e.quantity),
                                    "totalEntries": e.subTotal
                                }

                                let dataProductsModified = {
                                    "code": e.productCode,
                                    "entries": e.quantity,
                                    "totalEntries": e.subTotal
                                }

                                dataInventory.products.push(dataProducts)
                                productsModified.push(dataProductsModified)

                            })

                            let query = {
                                "creationTime": date
                            }

                            inventory_services.getInventoryBy(query)
                                .then((response => {
                                    if (response) {
                                        if (response.data.meta.status.code === "01") {
                                            inventory_services.postInventory(dataInventory)
                                        } else {
                                            var currentInventory = response.data.data[0]
                                            currentInventory["modifiedTime"] = date
                                            currentInventory.products.forEach(product => {
                                                productsModified.forEach(productMod => {
                                                    if (product.code === productMod.code) {
                                                        if (product.hasOwnProperty("entries")) {
                                                            var finalEntries = parseFloat(product.entries) + parseFloat(productMod.entries)
                                                            product["entries"] = finalEntries
                                                        } else {
                                                            product["entries"] = productMod.entries
                                                        }                                                      
                                                        
                                                        product["totalEntries"] = productMod.totalSales
                                                    } else {
                                                        currentInventory.products.push(productMod)
                                                    }
                                                })
                                            })
                                            inventory_services.putInventory(response.data.data[0].key, currentInventory,"true")
                                        }
                                    }
                                }))
                                
                            setEntries([]);
                            setColor("success");
                            props.actualizaResultados();
                        }else{
                            setColor("danger");
                        }
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
            <rs.CardHeader className="header">
                <rs.Row>
                    <rs.Col sm={10}>
                        <h3>&nbsp;Nueva Entrada</h3>
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
                    <div>
                        <rs.Form onSubmit={handleAddFormSubmit} id="entryInput">
                            <rs.Row>
                                <rs.Col sm={4}>
                                    <rs.FormGroup>
                                        <rs.Label>
                                            <FontAwesomeIcon icon={icon.faFileText}/> Numero de Guía
                                        </rs.Label>
                                        <rs.Input
                                            name="documentNumber"
                                            type="text"
                                            required="required"
                                            onChange={handleAddFormChange}
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
                                            value={date}
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
                                            <FontAwesomeIcon icon={icon.faTruckMoving}/> Doc. Proveedor
                                        </rs.Label>
                                        <rs.Input
                                            name="providerId"
                                            id="selectProvider"
                                            type="select"
                                            //value={providerID}
                                            required="required"
                                            onChange={handleAddFormChange}
                                        >
                                            <option key = "-" value = "-">[Seleccione]</option>
                                            {providers}
                                        </rs.Input>
                                    </rs.FormGroup>
                                </rs.Col>
                                <rs.Col sm={4}>
                                    <rs.FormGroup>
                                        <rs.Label>
                                            <FontAwesomeIcon icon={icon.faAlignJustify}/> Nombre Proveedor
                                        </rs.Label>
                                        <rs.Input
                                            name="providerName"
                                            id="txtProvider"
                                            type="text"
                                            value={provider}
                                            disabled
                                            onChange={handleAddFormChange}
                                        />
                                    </rs.FormGroup>
                                </rs.Col>
                                <rs.Col sm={4}>
                                    <rs.FormGroup>
                                        <rs.Label>
                                            <FontAwesomeIcon icon={icon.faBoxArchive}/> Codigo Producto
                                        </rs.Label>
                                        <rs.Input
                                            name="productCode"
                                            id="selectCodProd"
                                            type="select"
                                            //value={codeProduct}
                                            required="required"
                                            onChange={handleAddFormChange}
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
                                            name="productName"
                                            id="txtNameProd"
                                            type="text"
                                            value={nameProduct}
                                            disabled
                                            required="required"
                                            onChange={handleAddFormChange}
                                        />
                                    </rs.FormGroup>
                                </rs.Col>
                                <rs.Col sm={3}>
                                    <rs.FormGroup>
                                        <rs.Label>
                                            <FontAwesomeIcon icon={icon.faMoneyBill}/> Precio Compra
                                        </rs.Label>
                                        <rs.Input
                                            name="priceCost"
                                            id="txtPriceCost"
                                            //value={priceCost}
                                            type="number"
                                            step="0.01"
                                            required="required"
                                            onChange={handleAddFormChange}
                                        />
                                    </rs.FormGroup>
                                </rs.Col>
                                <rs.Col sm={3}>
                                    <rs.FormGroup>
                                        <rs.Label>
                                            <FontAwesomeIcon icon={icon.faMoneyBill}/> Precio Venta
                                        </rs.Label>
                                        <rs.Input
                                            name="priceSale"
                                            id="txtPriceSale"
                                            //value={priceSale}
                                            type="number"
                                            step="0.01"
                                            required="required"
                                            onChange={handleAddFormChange}
                                        />
                                    </rs.FormGroup>
                                </rs.Col>
                                <rs.Col sm={2}>
                                    <rs.FormGroup>
                                        <rs.Label>
                                            <FontAwesomeIcon icon={icon.faSortNumericAsc}/> Cantidad
                                        </rs.Label>
                                        <rs.Input
                                            name="quantity"
                                            id="txtQuantity"
                                            //value={quantity}
                                            type="number"
                                            required="required"
                                            onChange={handleAddFormChange}
                                        />
                                    </rs.FormGroup>
                                </rs.Col>
                                <rs.FormGroup>
                                    <div className='actions'>
                                        <rs.Button className='right' color="primary" type="submit"><FontAwesomeIcon icon={icon.faPlus}/> Agregar</rs.Button>
                                    </div>
                                </rs.FormGroup>
                            </rs.Row>
                        </rs.Form>
                            <rs.FormGroup>
                                <rs.Table className='fl-table' responsive>
                                    <thead>
                                        <tr>
                                            <th>
                                                
                                            </th>
                                            <th>
                                                Codigo
                                            </th>
                                            <th>
                                                Descripcion
                                            </th>
                                            <th>
                                                Precio de Compra
                                            </th>
                                            <th>
                                                Cantidad
                                            </th>
                                            <th>
                                                Sub Total
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {entries.map((entry) => (
                                            <tr>
                                                <td><FontAwesomeIcon title="Eliminar" type="button" className='select-button' onClick={() => handleDeleteClick(entry.productKey)} icon={icon.faTrash}/></td>
                                                <td>{entry.productCode}</td>
                                                <td>{entry.productName}</td>
                                                <td>{entry.priceCost}</td>
                                                <td>{entry.quantity}</td>
                                                <td>{entry.subTotal}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </rs.Table>
                            </rs.FormGroup>
                        <hr/>
                        <rs.FormGroup className='actions'>
                            <rs.Button className='right' color='success' onClick={() =>
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
                    </div>
                }
                <CustomModal modalVisible={mostrarModal} ocultar={ocultarModal} modalTitle={modalTitle} modalBody={modalBody} modalFooter={modalFooter}/>
                <Alerta msj={msjAlert} alertVisible={mostrarAlert} color={color} ocultar={ocultarAlerta}/>
            </rs.CardBody>
        </rs.Card>
    )
}

export default Registro_Entrada;

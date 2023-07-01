import React, { useEffect, useState } from 'react';
import * as rs from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icon from '@fortawesome/free-solid-svg-icons';
import * as customer_services from '../../api/services/customer-services';
import * as product_services from '../../api/services/product-services';
import * as sales_services from '../../api/services/sales-services';
import * as inventory_services from '../../api/services/inventory-services';
import CustomModal from "../utils/modal";
import Alerta from "../utils/alerta";
import Loader from "../utils/loader";
import { properties } from '../properties/bms-dev';

function Registro_Salida(props){

    const [dataProducts, setDataProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [dataCustomers, setDataCustomers] = useState([]);
    const [customers, setCustomers] = useState([]);

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

    const [customer, setCustomer] = useState("");
    const [nameProduct, setNameProduct] = useState("");
    const [stock, setStock] = useState(0);
    const [priceProduct, setPriceProduct] = useState(0);

    const [sales, setSales] = useState([]);
    const [addFormData, setAddFormData] = useState({
        documentNumber: "",
        productKey: "",
        productCode: "",
        productName: "",
        category: "",
        price: "",
        quantity: "",
        stock: "",
        subTotal: "",
        customer: "",
    })

    function ocultarModal(){
        setMostrarModal(false);
    }
    /* END MODAL STATES */

    /* INVOKE SERVICES FOR FILL COMBOS */
    function buildingModal(title,body,footer,event){
        if (sales.length === 0 ){
            ocultarModal();
            setColor("danger");
            setMsjAlert("La tabla de salidas está vacía.");
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
        customer_services.getCustomers().then((response) => {
            if (response){
                if (response.status === 200){
                    var filas = [];
                    response.data.data.forEach( c => {
                        filas.push(
                            <option key={c.indetifiyID} value={c.identifyID}>{c.identifyID}</option>
                        )
                    })
                    setDataCustomers(response.data.data);
                    setCustomers(filas);
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

    function validateCustomerRegister() {
        if (sales.some((sale) => sale.customer !== customer)) return true;
    }

    const handleAddFormChange = (event) => {
        event.preventDefault();
        if (event.target.name === "customerId") {
            if (event.target.value !== "-") {
                dataCustomers.forEach(c=>{
                    if (c.identifyID === event.target.value) {
                        setCustomer(c.fullName);
                    }
                })
            } else {
                setCustomer("");
            }
        } 

        if (event.target.name === "productCode"){
            if (event.target.value !== "-"){
                dataProducts.forEach(c=>{
                    if (c.code === event.target.value){
                        setNameProduct(c.name);
                        setPriceProduct(c.priceSale);
                    }
                })
            } else {
                setNameProduct("");
                setPriceProduct("");
            }
        } 

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;
    
        const newFormData = { ...addFormData };
        newFormData[fieldName] = fieldValue;

        var subTotal = parseFloat(priceProduct) * parseInt(newFormData["quantity"]);
        newFormData["subTotal"] = subTotal;
        newFormData["customer"] = customer;
        newFormData["price"] = priceProduct;
        dataProducts.forEach(c=>{
            if (c.code === event.target.value) {
                newFormData["productKey"] = c.key;
                newFormData["productName"] = c.name;
                newFormData["category"] = c.category;
                
                setStock(parseInt(c.stock))
                
            }
        })
        var newStock = stock - parseInt(newFormData["quantity"]);
        newFormData["stock"] = parseInt(newStock);
        setAddFormData(newFormData);
    };

    function checkDuplicity(key){    
        if (sales.some((sale) => sale.productKey === key)) return true;
    }

    const handleAddFormSubmit = (event) => {
        event.preventDefault();
        let resultDuplicity = checkDuplicity(addFormData.productKey)
        
        if (resultDuplicity){
            setColor("danger");
            setMsjAlert("El producto ya esta agregado.");
            setMostrarAlert(true);
            return;
        }

        /*let resultValidate = validateCustomerRegister()

        if (resultValidate) {
            setColor("danger");
            setMsjAlert("No es posible agregar más de un cliente en un documento de salida.");
            setMostrarAlert(true);
            return;
        }*/

        const newSale = {
            productKey: addFormData.productKey,
            productCode: addFormData.productCode,
            productName: addFormData.productName,
            category: addFormData.category,
            price: addFormData.price,
            quantity: addFormData.quantity,
            stock: addFormData.stock,
            subTotal: addFormData.subTotal,
        };
        const newSales = [...sales, newSale];
        setSales(newSales);

        clearFields(event);
    };

    function clearFields(event) {
        setNameProduct("");
        for (var e of event.target) {
            if (e.name !== "documentNumber" && e.name !== "customerId" && e.name !== "customerName") {
                e.value = ""
            }
        }
    }

    const handleDeleteClick = (key) => {
        const newSales = [...sales];
    
        const index = sales.findIndex((sale) => sale.productKey === key);
    
        newSales.splice(index, 1);
    
        setSales(newSales);
    };

    useEffect(() => {
        if (modalConfirmation === true && action === "guardar") {

            var subTotals = []
            sales.forEach(e=>{ subTotals.push(e.subTotal)})
            var total = subTotals.reduce((prevValue, curValue) => { return prevValue+curValue});
            
            let dataSale = {
                "code": addFormData.documentNumber,
                "user": user,
                "total": total,
                "customer": addFormData.customer,
                "sales": sales,
                "creationTime": date
            }
            
            setShowLoader(true);
            sales_services.postSales(dataSale)
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
                            
                            sales.forEach( e=> {
                                let data = {
                                    "stock": e.stock
                                }
                                product_services.putProducts(e.productKey,data)

                                let dataProducts = {
                                    "code": e.productCode,
                                    "name": e.productName,
                                    "category": e.category,
                                    "sales": parseFloat(e.quantity),
                                    "totalSales": e.subTotal
                                }

                                let dataProductsModified = {
                                    "code": e.productCode,
                                    "sales": e.quantity,
                                    "totalSales": e.subTotal
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
                                                        if (product.hasOwnProperty("sales")) {
                                                            var finalEntries = parseFloat(product.entries) + parseFloat(productMod.entries)
                                                            product["sales"] = finalEntries
                                                        } else {
                                                            product["sales"] = productMod.entries
                                                        }                                                      
                                                        
                                                        product["totalSales"] = productMod.totalSales
                                                    } else {
                                                        currentInventory.products.push(productMod)
                                                    }
                                                })
                                            })
                                            inventory_services.putInventory(response.data.data[0].key, currentInventory,"true")
                                        }
                                    }
                                }))

                            setSales([]);
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
                        <h3>&nbsp;Nueva Salida</h3>
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
                                            <FontAwesomeIcon icon={icon.faTruckMoving}/> Doc. Cliente
                                        </rs.Label>
                                        <rs.Input
                                            name="customerId"
                                            id="selectCustomer"
                                            type="select"
                                            required="required"
                                            onChange={handleAddFormChange}
                                        >
                                            <option key = "-" value = "-">[Seleccione]</option>
                                            {customers}
                                        </rs.Input>
                                    </rs.FormGroup>
                                </rs.Col>
                                <rs.Col sm={4}>
                                    <rs.FormGroup>
                                        <rs.Label>
                                            <FontAwesomeIcon icon={icon.faAlignJustify}/> Nombre Cliente
                                        </rs.Label>
                                        <rs.Input
                                            name="customerName"
                                            id="txtCustomer"
                                            type="text"
                                            value={customer}
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
                                            name="price"
                                            id="txtPrice"
                                            type="number"
                                            value={priceProduct}
                                            disabled
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
                                                Precio
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
                                        {sales.map((sale) => (
                                            <tr>
                                                <td><FontAwesomeIcon title="Eliminar" type="button" className='select-button' onClick={() => handleDeleteClick(sale.productKey)} icon={icon.faTrash}/></td>
                                                <td>{sale.productCode}</td>
                                                <td>{sale.productName}</td>
                                                <td>{sale.price}</td>
                                                <td>{sale.quantity}</td>
                                                <td>{sale.subTotal}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </rs.Table>
                            </rs.FormGroup>
                        <hr/>
                        <rs.FormGroup className='actions'>
                            <rs.Button className='right' color='success' onClick={() =>
                                buildingModal("Confirmación",`¿Está seguro de guardar la nueva salida?`,
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

export default Registro_Salida;

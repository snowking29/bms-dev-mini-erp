import React, { useState, useEffect } from 'react';
import * as rs from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icon from '@fortawesome/free-solid-svg-icons';
import RegistroEntrada from "../components/registro/registro_entradas";
import * as entry_services from '../api/services/entry-services';
import Loader from "../components/utils/loader";
import DetalleProducto from "../components/detalle/detalle_productos";
import * as provider_services from '../api/services/provider-services';

function Entradas () {

    const [action, setAction] = useState("filtros");
    const [btnActionTxt, setBtnActionTxt] = useState("Agregar");
    const [btnIcon, setBtnIcon] = useState(<FontAwesomeIcon icon={icon.faPlusCircle}/>);
    const [showLoader, setShowLoader] = useState(false);
    const [entradas, setEntradas] = useState([]);
    const initialFormState = {}
    const [currentEntry , setCurrentEntry] = useState(initialFormState)

    const [codeEntry, setCodeEntry] = useState("");
    const [total, setTotal] = useState("");
    const [provider, setProvider] = useState("");
    const [codeProduct, setCodeProduct] = useState("");
    const [descriptionProduct, setDescriptionProduct] = useState("");
    const [categoryProduct, setCategoryProduct] = useState("");
    const [priceCost, setPriceCost] = useState("");
    const [priceSale, setPriceSale] = useState("");
    const [quantity, setQuantity] = useState("");
    const [subTotal, setSubTotal] = useState("");

    const [toggleRegister, setToggeRegister] = useState(false);
    const [toggleList, setToggeList] = useState(true);

    var date = new Date().toLocaleDateString()
    const user = localStorage.getItem("name");


    function showRegistroEntradas(){
        if (btnActionTxt === "Agregar"){
            setBtnIcon(<FontAwesomeIcon icon={icon.faFilter}/>)
            setBtnActionTxt("Filtros")
            setAction("registrar")
        }else{
            setBtnIcon(<FontAwesomeIcon icon={icon.faPlusCircle}/>)
            setBtnActionTxt("Agregar")
            setAction("filtrar")
        }
    }

    useEffect(() => {
        getEntryTable();
    },[])

    function saveEntry() {

        let dataEntry = {
            "codeEntry": codeEntry,
            "user": user,
            "total": total,
            "provider": provider,
            "codeProduct": codeProduct,
            "descriptionProduct": descriptionProduct,
            "categoryProduct": categoryProduct,
            "priceCost": priceCost,
            "priceSale": priceSale,
            "quantity": quantity,
            "subTotal": subTotal,
            "creationTime": date
        }
        setShowLoader(true);
        provider_services.postProviders(dataEntry)
            .then((response => {
                setShowLoader (false);
                if (response) {
                    if (response.status === 200) {
                        actualizarTabla();
                    }
                }
            }))
    }

    function getEntryTable () {
        /*setShowLoader(true);
        entry_services.getEntries().then( (response) => {
            setShowLoader(false);
            if (response.status === 200){
                var filas = [];
                let body = response.data.data

                if (Array.isArray(body)) {
                    body.forEach( a => {
                        filas.push(
                            <tr key= {a.key}>
                                <td>{a.creationTime}</td>
                                <td>{a.code}</td>
                                <td>{a.user}</td>
                                <td>{a.total}</td>
                                <td>
                                    <FontAwesomeIcon icon={icon.faCheckSquare}
                                        type="button" 
                                        className= 'select-button'
                                        title="Seleccionar"
                                        onClick = { () => {
                                            setAction("detalle")
                                            setCurrentEntry(a)
                                        }}
                                    />
                                </td>
                            </tr>
                        )
                    })
                }
                setEntradas(filas);
            } else if(response.status === 401) {
                console.log("NOT AUTHORIZED, AUTH AGAIN OR REDIRECT TO LOGIN")
            }
        })*/
    }

    function actualizarTabla () {
        if (entradas.length !== 0 || typeof(entradas) !== 'undefined'){
            getEntryTable()
        }
    }

    return (
        <div>
            <rs.Card className='card'>
                <rs.CardHeader className='header' onClick={() => setToggeRegister(!toggleRegister)}>
                    <rs.Row>
                        <rs.Col sm={10}>
                            <h2>&nbsp;Registro de Entradas</h2>
                        </rs.Col>
                    </rs.Row>
                </rs.CardHeader>
                <rs.Collapse isOpen={toggleRegister}>
                    <rs.CardBody>
                        <rs.Form>
                            <rs.FormGroup>
                                <rs.Row>
                                    <rs.Col sm={4}>
                                        <rs.Label>
                                            <FontAwesomeIcon icon={icon.faFileText}/> Nro de Documento
                                        </rs.Label>
                                        <rs.Input
                                            name="txtName"
                                            type="text"
                                            onChange={(e) => setCodeEntry(e.target.value)}
                                        />
                                    </rs.Col>
                                    <rs.Col sm={4}>
                                        <rs.Label>
                                            <FontAwesomeIcon icon={icon.faTruckMoving}/> Proveedor
                                        </rs.Label>
                                        <rs.Input
                                            name="selectProvider"
                                            id="selectProvider"
                                            type="select"
                                        >
                                            <option key = "-" value = "-">[Seleccione]</option>
                                        </rs.Input>
                                    </rs.Col>
                                    <rs.Col sm={4}>
                                        <rs.Label>
                                            Precio Compra
                                        </rs.Label>
                                        <rs.Input
                                            name="txtPriceCost"
                                            id="txtPriceCost"
                                            type="number"
                                        />
                                    </rs.Col>
                                </rs.Row>
                            </rs.FormGroup>
                            <rs.FormGroup>
                                <rs.Row>
                                    <rs.Col sm={4}>
                                        <rs.Label>
                                            <FontAwesomeIcon icon={icon.faCalendar}/> Fecha de Registro
                                        </rs.Label>
                                        <rs.Input
                                            name="txtCreationTime"
                                            type="text"
                                            value={date}
                                            disabled
                                        />
                                    </rs.Col>
                                    <rs.Col sm={4}>
                                        <rs.Label>
                                            <FontAwesomeIcon icon={icon.faBoxArchive}/> Codigo Producto
                                        </rs.Label>
                                        <rs.Input
                                            name="selectCodProd"
                                            id="selectCodProd"
                                            type="select"
                                        >
                                            <option key = "-" value = "-">[Seleccione]</option>
                                        </rs.Input>
                                    </rs.Col>
                                    <rs.Col sm={4}>
                                        <rs.Label>
                                            Precio Venta
                                        </rs.Label>
                                        <rs.Input
                                            name="txtPriceSale"
                                            id="txtPriceSale"
                                            type="number"
                                        />
                                    </rs.Col>
                                </rs.Row>
                            </rs.FormGroup>
                            <rs.FormGroup>
                                <rs.Row>
                                    <rs.Col sm={4}>
                                        <rs.Label>
                                            <FontAwesomeIcon icon={icon.faUser}/> Usuario
                                        </rs.Label>
                                        <rs.Input
                                            name="txtUser"
                                            type="text"
                                            value={user}
                                            disabled
                                        />
                                    </rs.Col>
                                    <rs.Col sm={4}>
                                        <rs.Label>
                                            Descripcion Producto
                                        </rs.Label>
                                        <rs.Input
                                            name="txtDescription"
                                            id="txtDescription"
                                            type="text"
                                            disabled
                                        />
                                    </rs.Col>
                                    <rs.Col sm={4}>
                                        <rs.Label>
                                            Cantidad
                                        </rs.Label>
                                        <rs.Input
                                            name="txtQuantity"
                                            id="txtQuantity"
                                            type="number"
                                        />
                                    </rs.Col>
                                </rs.Row>
                            </rs.FormGroup>
                            <rs.FormGroup>
                                    <div className='actions right'>
                                        <rs.Button color="primary"><FontAwesomeIcon icon={icon.faPlus}/> Agregar Entrada</rs.Button>
                                    </div>
                            </rs.FormGroup>
                            <hr/>
                            <rs.FormGroup>
                                <rs.Table responsive className='styled-table'>
                                    <thead>
                                        <tr>
                                            <th style={{width: "5%"}}>
                                                
                                            </th>
                                            <th style={{width: "10%"}}>
                                                Codigo
                                            </th>
                                            <th style={{width: "30%"}}>
                                                Descripcion
                                            </th>
                                            <th style={{width: "20%"}}>
                                                Precio de Compra
                                            </th>
                                            <th style={{width: "10%"}}>
                                                Cantidad
                                            </th>
                                            <th style={{width: "10%"}}>
                                                Sub Total
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <FontAwesomeIcon icon={icon.faTrash}/>
                                            </td>
                                            <td>
                                                COD001
                                            </td>
                                            <td>
                                                Bidon de agua sin caño X20L
                                            </td>
                                            <td>
                                                24.50
                                            </td>
                                            <td>
                                                10
                                            </td>
                                            <td>
                                                245
                                            </td>
                                        </tr>
                                    </tbody>
                                </rs.Table>
                            </rs.FormGroup>
                            <rs.FormGroup>
                                <rs.Button color="success" onClick={saveEntry}>
                                    <FontAwesomeIcon icon={icon.faSave}/>{' '}Guardar Entrada
                                </rs.Button>
                            </rs.FormGroup>
                        </rs.Form>
                    </rs.CardBody>
                </rs.Collapse>
            </rs.Card>
            <br/>
            <rs.Card className='card'>
                <rs.CardHeader className='header' onClick={() => setToggeList(!toggleList)}>
                    <h4>&nbsp;Lista de Entradas</h4>
                </rs.CardHeader>
                <rs.Collapse isOpen={toggleList}>
                    <rs.CardBody className='body'>
                        <rs.Form>
                                <rs.Row>
                                    <rs.Col sm={4}>
                                        <rs.FormGroup row>
                                            <rs.Label for="productFromDate" sm={4}>
                                                Fecha Inicio
                                            </rs.Label>
                                            <rs.Col sm={8}>
                                                <rs.Input
                                                    id="productFromDate"
                                                    name="date"
                                                    placeholder="date placeholder"
                                                    type="date"
                                                />
                                            </rs.Col>
                                        </rs.FormGroup>
                                    </rs.Col>
                                    <rs.Col sm={4}>
                                        <rs.FormGroup row>
                                            <rs.Label for="productToDate" sm={4}>
                                                Fecha Fin
                                            </rs.Label>
                                            <rs.Col sm={8}>
                                                <rs.Input
                                                    id="productToDate"
                                                    name="date"
                                                    placeholder="date placeholder"
                                                    type="date"
                                                />
                                            </rs.Col>
                                        </rs.FormGroup>
                                    </rs.Col>
                                    <rs.Col sm={4}>
                                        <rs.InputGroup>
                                            <rs.Input
                                                id="searchCust"
                                                name="Search"
                                                placeholder="Buscar"
                                                type="search"
                                            />
                                            <rs.InputGroupText>
                                                <FontAwesomeIcon icon={icon.faSearch}/>
                                            </rs.InputGroupText>
                                        </rs.InputGroup>
                                    </rs.Col>
                                </rs.Row>
                        </rs.Form>
                        <hr/>
                        {showLoader ? <Loader /> :
                            <rs.Form>
                                <rs.FormGroup>
                                    <rs.Table responsive className='styled-table'>
                                        <thead>
                                            <tr>
                                                <th style={{width: "10%"}}>
                                                    Fecha de Registro
                                                </th>
                                                <th style={{width: "10%"}}>
                                                    Nro de Documento
                                                </th>
                                                <th style={{width: "10%"}}>
                                                    Usuario Registro
                                                </th>
                                                <th style={{width: "10%"}}>
                                                    Monto Total
                                                </th>
                                                <th style={{width: "10%"}}>
                                                    Proveedor
                                                </th>
                                                <th style={{width: "10%"}}>
                                                    Codigo Producto
                                                </th>
                                                <th style={{width: "10%"}}>
                                                    Descripcion Producto
                                                </th>
                                                <th style={{width: "10%"}}>
                                                    Categoria Producto
                                                </th>
                                                <th style={{width: "5%"}}>
                                                    Precio Compra
                                                </th>
                                                <th style={{width: "5%"}}>
                                                    Precio Venta
                                                </th>
                                                <th style={{width: "5%"}}>
                                                    Cantidad
                                                </th>
                                                <th style={{width: "5%"}}>
                                                    Sub Total
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {entradas}
                                        </tbody>
                                    </rs.Table>
                                </rs.FormGroup>
                            </rs.Form>
                        }
                    </rs.CardBody>
                </rs.Collapse>
            </rs.Card>
        </div>
    )
}

export default Entradas;
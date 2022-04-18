import React, { useEffect, useState } from 'react';
import * as rs from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icon from '@fortawesome/free-solid-svg-icons';
import * as provider_services from '../../api/services/provider-services';
import Alerta from "../utils/alerta";
import Loader from "../utils/loader";

function Registro_Entrada(props){

    const [codeEntry, setCodeEntry] = useState("");
    const [total, setTotal] = useState("");
    const [provider, setProvider] = useState("");
    const [codeProduct, setCodeProduct] = useState("");
    const [descriptionProduct, setDescriptionProduct] = useState("");
    const [priceCost, setPriceCost] = useState(0);
    const [priceSale, setPriceSale] = useState(0);
    const [quantity, setQuantity] = useState(0);
    var subTotal = 0;

    const [msjAlert, setMsjAlert] = useState("");
    const [mostrarAlert, setMostrarAlert] = useState(false);
    const [color, setColor] = useState("secondary");
    const [showLoader, setShowLoader] = useState(false);
    const [entriesTable, setEntriesTable] = useState([]);
    var fillTable = [];

    var date = new Date().toLocaleDateString('es-PE')
    const user = localStorage.getItem("name");

    function saveEntry() {

        let dataEntry = {
            "codeEntry": codeEntry,
            "user": user,
            "total": total,
            "provider": provider,
            "codeProduct": codeProduct,
            "descriptionProduct": descriptionProduct,
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

    function fillDataTable() {
        subTotal = priceCost * quantity;

        console.log(fillTable)
        fillTable.push(subTotal)
        setEntriesTable(fillTable)
        console.log(fillTable)
    }

    

    function ocultarAlerta(){
        setMostrarAlert(false);
    }

    return ( 
        <rs.Card className='card'>
            <rs.CardHeader className="header">
                <rs.Row>
                    <rs.Col sm={10}>
                        <h3>&nbsp;Nuevo Entrada</h3>
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
                                        onChange={(e) => setCodeEntry(e.target.value)}
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
                                        <FontAwesomeIcon icon={icon.faTruckMoving}/> Proveedor
                                    </rs.Label>
                                    <rs.Input
                                        name="selectProvider"
                                        id="selectProvider"
                                        type="select"
                                    >
                                        <option key = "-" value = "-">[Seleccione]</option>
                                    </rs.Input>
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
                                        onChange={(e) => setCodeProduct(e)}
                                    >
                                        <option key = "-" value = "-">[Seleccione]</option>
                                    </rs.Input>
                                </rs.FormGroup>
                            </rs.Col>
                            <rs.Col sm={4}>
                                <rs.FormGroup>
                                    <rs.Label>
                                        <FontAwesomeIcon icon={icon.faAlignJustify}/> Descripcion Producto
                                    </rs.Label>
                                    <rs.Input
                                        name="txtDescription"
                                        id="txtDescription"
                                        type="text"
                                        onChange={(e) => setDescriptionProduct(e.target.value)}
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
                                        onChange={(e) => setQuantity(e.target.value)}
                                        type="number"
                                    />
                                </rs.FormGroup>
                            </rs.Col>
                            <rs.FormGroup>
                                <div className='actions'>
                                    <rs.Button className='right' color="primary" onClick={() => fillDataTable() }><FontAwesomeIcon icon={icon.faPlus}/> Agregar Entrada</rs.Button>
                                </div>
                            </rs.FormGroup>
                        </rs.Row>
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
                                </tbody>
                            </rs.Table>
                        </rs.FormGroup>
                        <rs.FormGroup>
                            <rs.Button color="success" onClick={saveEntry}>
                                <FontAwesomeIcon icon={icon.faSave}/>{' '}Guardar Entrada
                            </rs.Button>
                        </rs.FormGroup>
                    </rs.Form>
                }
                <Alerta msj={msjAlert} alertVisible={mostrarAlert} color={color} ocultar={ocultarAlerta}/>
            </rs.CardBody>
        </rs.Card>
    )
}

export default Registro_Entrada;

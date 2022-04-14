import React, { useState } from 'react';
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
    const [categoryProduct, setCategoryProduct] = useState("");
    const [priceCost, setPriceCost] = useState("");
    const [priceSale, setPriceSale] = useState("");
    const [quantity, setQuantity] = useState("");
    const [subTotal, setSubTotal] = useState("");
    const [creationTime, setCreationTime] = useState("");
    const [showLoader, setShowLoader] = useState(false);

    var date = new Date().toLocaleDateString()
    const user = localStorage.getItem("name");

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
                        props.actualizaResultados();
                    }
                }
            }))
    }

    return (
        <rs.Col sm={3}>
            {showLoader ? <Loader /> : 
                <rs.Card className='card'>
                    <rs.CardHeader className="h4 register">
                        <FontAwesomeIcon icon={icon.faTruckMoving}/>
                        {' '}
                        Registrar Entradas
                    </rs.CardHeader>
                    <rs.CardBody>
                        <rs.Form>
                            <rs.FormGroup>
                                <rs.Row>
                                    <rs.Col sm={6}>
                                        <rs.Label>
                                            <FontAwesomeIcon icon={icon.faFileText}/> Nro de Documento
                                        </rs.Label>
                                        <rs.Input
                                            name="txtName"
                                            type="text"
                                            onChange={(e) => setCodeEntry(e.target.value)}
                                        />
                                    </rs.Col>
                                    <rs.Col sm={6}>
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
                                </rs.Row>
                            </rs.FormGroup>
                            <hr/>
                            <rs.FormGroup>
                                <rs.Row>
                                    <rs.Col sm={6}>
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
                                    <rs.Col sm={6}>
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
                                </rs.Row>
                            </rs.FormGroup>
                            <hr/>
                            <rs.FormGroup>
                                <rs.Row>
                                    <rs.Col sm={6}>
                                        <rs.Label>
                                            <FontAwesomeIcon icon={icon.faBoxArchive}/> Codigo Producto
                                        </rs.Label>
                                        <rs.Input
                                            name="txtCodProduct"
                                            type="text"
                                        />
                                    </rs.Col>
                                    <rs.Col sm={6}>
                                        <rs.Label>
                                            Descrip. Producto
                                        </rs.Label>
                                        <rs.Input
                                            name="selectProvider"
                                            id="selectProvider"
                                            type="select"
                                        >
                                        </rs.Input>
                                    </rs.Col>
                                </rs.Row>
                            </rs.FormGroup>
                            <hr/>
                            <rs.FormGroup className='actions'>
                                <div className='left'>
                                    <rs.Button color="success" onClick={saveEntry}>
                                        <FontAwesomeIcon icon={icon.faSave}/>{' '}Grabar
                                    </rs.Button>
                                </div>
                            </rs.FormGroup>
                        </rs.Form>
                    </rs.CardBody>
                </rs.Card>
            }
        </rs.Col>
    )
}

export default Registro_Entrada;

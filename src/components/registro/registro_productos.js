import React, { useState, useEffect } from 'react';
import * as rs from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icon from '@fortawesome/free-solid-svg-icons';
import * as product_service from '../../api/services/product-services';
import * as category_service from '../../api/services/category-services';
import Alerta from "../utils/alerta";
import Loader from "../utils/loader";

function Registro_Producto(props){

    const [code,setCode] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [stock, setStock] = useState("");
    const [cost, setCost] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [keyCategory, setKeyCategory] = useState("");
    const [creationTime, setCreationTime] = useState("");
    const [showLoader, setShowLoader] = useState(false);
    const [categories, setCategories] = useState([]);
    
    function saveProduct() {
        var date = new Date(creationTime)
        let dataProduct = {
            "code": code,
            "name": name,
            "category": category,
            "description": description,
            "stock": stock,
            "priceCost": cost,
            "priceSale": price,
            "creationTime": date.toLocaleString('es-PE'),
            "modifiedTime": ""
        }
        setShowLoader(true);
        product_service.postProducts(dataProduct)
            .then((response => {
                setShowLoader (false);
                if (response) {
                    if (response.status === 200) {
                        let dataCategory = {
                            "products":[code]
                        }
                        category_service.putCategories(keyCategory,dataCategory)
                        props.actualizaResultados();
                    }
                }
            }))
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
                if (response.status == 200){
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

    return (
        <rs.Col sm={3}>
            {showLoader ? <Loader /> : 
                <rs.Card className='card'>
                    <rs.CardHeader className="h4 register">
                        <FontAwesomeIcon icon={icon.faBoxesPacking}/>
                        {' '}
                        Nuevo Producto
                    </rs.CardHeader>
                    <rs.CardBody>
                        <rs.Form>
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
                            <rs.FormGroup>
                                <rs.Label>
                                    <FontAwesomeIcon icon={icon.faComment}/> Descripcion
                                </rs.Label>
                                <rs.Input
                                    name="txtDescription"
                                    id="txtDescription"
                                    type="textarea"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </rs.FormGroup>
                            <rs.Row>
                                <rs.Col sm={4}>
                                    <rs.FormGroup>
                                        <rs.Label>
                                            <FontAwesomeIcon icon={icon.faListNumeric}/> Stock
                                        </rs.Label>
                                        <rs.Input
                                            name="txtStock"
                                            id="txtStock"
                                            type="text"
                                            onChange={(e) => setStock(e.target.value)}
                                        />
                                    </rs.FormGroup>
                                </rs.Col>
                                <rs.Col sm={4}>
                                    <rs.FormGroup>
                                        <rs.Label>
                                            <FontAwesomeIcon icon={icon.faHandHoldingDollar}/> Costo
                                        </rs.Label>
                                        <rs.Input
                                            name="txtCost"
                                            id="txtCost"
                                            type="text"
                                            onChange={(e) => setCost(e.target.value)}
                                        />
                                    </rs.FormGroup>
                                </rs.Col>
                                <rs.Col sm={4}>
                                    <rs.FormGroup>
                                        <rs.Label>
                                            <FontAwesomeIcon icon={icon.faMoneyBill}/> Precio
                                        </rs.Label>
                                        <rs.Input
                                            name="txtPrice"
                                            id="txtPrice"
                                            type="text"
                                            onChange={(e) => setPrice(e.target.value)}
                                        />
                                    </rs.FormGroup>
                                </rs.Col>
                            </rs.Row>
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
                            <rs.FormGroup>
                                <rs.Label>
                                    <FontAwesomeIcon icon={icon.faCalendar}/> Fecha de creacion
                                </rs.Label>
                                <rs.Input
                                    name="txtFCreation"
                                    id="txtFCreation"
                                    type="datetime-local"
                                    onChange={(e) => setCreationTime(e.target.value)}
                                />
                            </rs.FormGroup>
                            <hr/>
                            <rs.FormGroup className='actions'>
                                <div className='left'>
                                    <rs.Button color="success" onClick={saveProduct}>
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

export default Registro_Producto;

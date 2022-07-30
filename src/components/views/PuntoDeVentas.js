import React, {useRef, useState, useEffect} from 'react'
import * as rs from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as product_services from '../../api/services/product-services';
import * as icon from '@fortawesome/free-solid-svg-icons';
import "../../css/Sales.css";
import SelectSearch from "react-select";

function PuntoDeVentas (props) {
    const searchInput = useRef();
    const [productos, setProductos] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState();
    const [localProd, setLocalProd] = useState([]);
    const [salidas, setSalidas] = useState([]);
    const [count, setCount] = useState(0)

    const incrementIndex = () => setCount(x => x+1)
    
    function getProductTable () {
        product_services.getProducts().then( (response) => {
            if (response.status === 200){
                var filas = [];
                var dataLocal = [];
                let body = response.data.data

                if (Array.isArray(body)) {
                    body.forEach( a => {
                        filas.push({label: a.name, value:a.code})
                        dataLocal.push({
                            code: a.code,
                            name: a.name,
                            price: a.priceSale
                        })
                    })
                    setProductos(filas)
                    setLocalProd(dataLocal)
                }
            } else if(response.status === 401) {
                console.log("NOT AUTHORIZED, AUTH AGAIN OR REDIRECT TO LOGIN")
            }
        })
    }
    
    function handleSelect(data) {
        setSelectedOptions(data);
        localProd.forEach( val => {
            if (val.code === data.value) {
                setSalidas(
                    <tr key={val.code}>
                        <th scope="row">{count}</th>
                        <td style={{display:'flex', justifyContent:'center'}}>
                            <rs.Input
                                style={{ width: 70, padding: 0, textAlign: 'center'}}
                                id="cant"
                                name="Cant"
                                type="number"
                            />
                        </td>
                        <td>{val.name}</td>
                        <td>S/.{val.price}</td>
                        <td>S/.{val.price}</td>
                        <td>
                            <FontAwesomeIcon icon={icon.faTrash}
                                type="button" 
                                className= 'select-button'
                                title="Eliminar"
                            />
                        </td>
                    </tr>
                )
            }
        })
        incrementIndex();
      }

    useEffect(() => {
        getProductTable();
    },[])

    return (
        <div>
            <rs.Card className='card'>
                <rs.CardHeader className='header'>
                    <h3>
                        <FontAwesomeIcon icon={icon.faShoppingCart}/> Punto de Venta
                    </h3>
                </rs.CardHeader>
            </rs.Card>
            <br/>
            <rs.Row>
                <rs.Col sm={8}>
                    <rs.Card>
                        <rs.CardHeader className='pos-list-header'>
                            <rs.FormGroup row>
                                <rs.Col sm={4}>
                                    <div className="dropdown-container">
                                        <SelectSearch
                                            options={productos}
                                            placeholder="Buscar por nombre"
                                            value={selectedOptions}
                                            onChange={handleSelect}
                                            isSearchable={true}
                                        />
                                    </div>
                                </rs.Col>
                                <rs.Col sm={8} className="inline-buttons">
                                    <rs.Button className="inline-button" color="primary"><FontAwesomeIcon icon={icon.faAdd}/> Agregar producto</rs.Button>
                                    <rs.Button className="inline-button" color="warning"><FontAwesomeIcon icon={icon.faTrash}/> Vaciar Carrito</rs.Button>
                                    <rs.Button className="inline-button" color="success"><FontAwesomeIcon icon={icon.faCheck}/> Guardar Compra</rs.Button>
                                </rs.Col>
                            </rs.FormGroup>
                        </rs.CardHeader>
                    </rs.Card>
                    <br/>
                    <rs.Card className='card'>
                        <rs.CardBody>
                                <rs.Table className='fl-table' responsive>
                                    <thead>
                                        <tr>
                                            <th>
                                                ITEM
                                            </th>
                                            <th>
                                                CANT.
                                            </th>
                                            <th>
                                                PRODUCTO
                                            </th>
                                            <th>
                                                PRECIO
                                            </th>
                                            <th>
                                                IMPORTE
                                            </th>
                                            <th>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {salidas}
                                    </tbody>
                                </rs.Table>
                        </rs.CardBody>
                    </rs.Card>
                </rs.Col>
                <br/>
                <rs.Col sm={4}>
                    <rs.Card className='card'>
                        <rs.CardTitle className='card-header title'>
                            S/. 35.00
                        </rs.CardTitle>
                        <rs.CardBody>
                            <rs.Form>
                                <rs.FormGroup>
                                    <rs.Label><strong>CLIENTE</strong></rs.Label>
                                    <rs.InputGroup>
                                        <rs.Input
                                            id="searchCategory"
                                            name="Search"
                                            placeholder="Buscar por DNI"
                                            type="search"
                                        />
                                        <rs.InputGroupText>
                                            <FontAwesomeIcon icon={icon.faSearch}/>
                                        </rs.InputGroupText>
                                    </rs.InputGroup>
                                </rs.FormGroup>
                                <rs.FormGroup row>
                                    <rs.Col sm={6} className='separator'>
                                        <rs.Label><strong>DOCUMENTO</strong></rs.Label>
                                        <rs.Input
                                            name="selectDocument"
                                            id="selectDocument"
                                            type="select"
                                        >
                                            <option key = "-" value = "-">[Seleccione]</option>
                                            <option key = "Factura" value="1">Factura</option>
                                            <option key = "Boleta" value="2">Boleta</option>
                                        </rs.Input>
                                    </rs.Col>
                                    <rs.Col sm={6}>
                                        <rs.Label><strong>TIPO DE PAGO</strong></rs.Label>
                                        <rs.Input
                                            name="selectMethod"
                                            id="selectMethod"
                                            type="select"
                                        >
                                            <option key = "-" value = "-">[Seleccione]</option>
                                            <option key = "Factura" value="1">Efectivo</option>
                                            <option key = "Boleta" value="2">Yape</option>
                                            <option key = "Boleta" value="2">Plin</option>
                                            <option key = "Boleta" value="2">Transferencia Bancaria</option>
                                            <option key = "Boleta" value="2">Tarjeta de Credito</option>
                                            <option key = "Boleta" value="2">Tarjeta de Debito</option>
                                        </rs.Input>
                                    </rs.Col>
                                </rs.FormGroup>
                                <rs.FormGroup row>
                                    <rs.Col sm={4}>
                                        <rs.Label><strong>SERIE</strong></rs.Label>
                                        <rs.Input
                                            tpye="text"
                                            disabled
                                            />
                                    </rs.Col>
                                    <rs.Col sm={8}>
                                        <rs.Label><strong>NRO. VENTA</strong></rs.Label>
                                        <rs.Input
                                            tpye="text"
                                            disabled
                                        />
                                    </rs.Col>
                                </rs.FormGroup>
                                <rs.FormGroup>
                                    <rs.Label><strong>FECHA DE COMPRA</strong></rs.Label>
                                    <rs.Input
                                        name="txtFCreation"
                                        id="txtFCreation"
                                        type="date"
                                    />
                                </rs.FormGroup>
                                <hr/>
                                <rs.FormGroup>
                                    <rs.Table responsive>
                                        <thead>
                                            <tr>
                                                <td>
                                                    <strong>SUBTOTAL:</strong>
                                                </td>
                                                <td>
                                                    S/.30
                                                </td>
                                                <td>
                                                    <strong>IGV(18%):</strong>
                                                </td>
                                                <td>
                                                    S/.5,4
                                                </td>
                                                <td>
                                                    <strong>TOTAL:</strong>
                                                </td>
                                                <td>
                                                    S/.35
                                                </td>
                                            </tr>
                                        </thead>
                                    </rs.Table>
                                </rs.FormGroup>
                            </rs.Form>
                        </rs.CardBody>
                    </rs.Card>
                </rs.Col>
            </rs.Row>
        </div>
    )
}
export default PuntoDeVentas;
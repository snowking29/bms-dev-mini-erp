import React, { useState, useEffect } from 'react';
import * as rs from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icon from '@fortawesome/free-solid-svg-icons';
import * as sales_service from '../../api/services/sales-services';
import Loader from "../utils/loader";

function Salidas (props) {

    const [showLoader, setShowLoader] = useState(false);
    const [salidas, setSalidas] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        getSaleTable();
    },[search])

    function getSaleTable () {
        setShowLoader(true);
        sales_service.getSales().then( (response) => {
            setShowLoader(false);
            if (response.status === 200){
                var filas = [];
                let body = response.data.data

                if (Array.isArray(body)) {
                    body.filter(val=>{
                        if(search === ''){
                            return val;
                        } else if (val.saleNumber.toLowerCase().includes(search.toLocaleLowerCase())
                            || val.user.toLowerCase().includes(search.toLocaleLowerCase())
                            || val.creationTime.toLowerCase().includes(search.toLocaleLowerCase())){
                            return val
                        }
                    }).forEach( a => {
                        a.sales.forEach( e => {
                            filas.push(
                                <tr key= {a.code.concat(e.code)}>
                                    <td>{a.creationTime}</td>
                                    <td>{a.serial}</td>
                                    <td>{a.saleNumber}</td>
                                    <td>{a.user}</td>
                                    <td>S/.{a.total}</td>
                                    <td>{e.code}</td>
                                    <td>{e.name}</td>
                                    <td>{e.category}</td>
                                    <td>{e.warehouse}</td>
                                    <td>S/.{e.priceCost}</td>
                                    <td>S/.{e.priceSale}</td>
                                    <td>{e.quantity}</td>
                                    <td>S/.{e.subTotal}</td>
                                </tr>
                            )
                        })
                    })
                }
                setSalidas(filas);
            } else if(response.status === 401) {
                console.log("NOT AUTHORIZED, AUTH AGAIN OR REDIRECT TO LOGIN")
            }
        })
    }

    return (
        <div>
            <rs.Card className='card'>
                <rs.CardHeader className='header'>
                    <h3><FontAwesomeIcon icon={icon.faListNumeric}/> Lista de Salidas</h3>
                </rs.CardHeader>
                <rs.CardBody className='body'>
                    <rs.InputGroup>
                        <rs.Input
                            id="searchSale"
                            name="Search"
                            placeholder="Buscar por registro, numero de venta o usuario..."
                            type="search"
                            style={{ textAlign: 'center'}}
                                onChange={(e)=>{
                                    setSearch(e.target.value)
                            }}
                        />
                        <rs.InputGroupText>
                            <FontAwesomeIcon icon={icon.faSearch}/>
                        </rs.InputGroupText>
                    </rs.InputGroup>
                    <br/>
                    {showLoader ? <Loader /> :
                        <rs.Form>
                            <rs.Table className='fl-table' responsive>
                                <thead>
                                    <tr>
                                        <th>
                                            REGISTRO
                                        </th>
                                        <th>
                                            SERIAL
                                        </th>
                                        <th>
                                            NUMERO DE VENTA
                                        </th>
                                        <th>
                                            USUARIO
                                        </th>
                                        <th>
                                            IMPORTE
                                        </th>
                                        <th>
                                            ITEM
                                        </th>
                                        <th>
                                            NOMBRE
                                        </th>
                                        <th>
                                            CATEGORIA
                                        </th>
                                        <th>
                                            ALAMACEN
                                        </th>
                                        <th>
                                            COMPRA
                                        </th>
                                        <th>
                                            VENTA
                                        </th>
                                        <th>
                                            CANT
                                        </th>
                                        <th>
                                            SUB. TOTAL
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {salidas}
                                </tbody>
                            </rs.Table>
                            {salidas.length === 0 ?
                                <h5 className="noData">
                                    No data.
                                </h5>
                            : <span/>}
                        </rs.Form>
                    }
                </rs.CardBody>
            </rs.Card>
        </div>
    )
}

export default Salidas;
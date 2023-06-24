import React, { useState, useEffect } from 'react';
import * as rs from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icon from '@fortawesome/free-solid-svg-icons';
import * as inventory_services from '../../api/services/inventory-services';
import Loader from "../utils/loader";

function Inventario (props) {

    const [showLoader, setShowLoader] = useState(false);
    const [inventario, setInventario] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        getInventoryTable();
    },[search])
    
    function getInventoryTable () {
        setShowLoader(true);
        inventory_services.getInventory().then( (response) => {
            setShowLoader(false);
            if (response.status === 200){
                var filas = [];
                let body = response.data.data

                if (Array.isArray(body)) {
                    body.filter(val=>{
                        if(search === ''){
                            return val;
                        } else if (val.product.toLowerCase().includes(search.toLocaleLowerCase())
                            || val.name.toLowerCase().includes(search.toLocaleLowerCase())){
                            return val
                        }
                    }).forEach( a => {
                        console.log(a.products)
                        a.products.forEach( p => {
                            filas.push(
                                <tr key= {a.key}>
                                    <td>{a.creationTime}</td>
                                    <td>{p.code}</td>
                                    <td>{p.name}</td>
                                    <td>{p.category}</td>
                                    <td>{p.entries}</td>
                                    <td>{p.sales}</td>
                                    <td>{p.totalEntries}</td>
                                    <td>{p.totalSales}</td>
                                </tr>
                            )
                        })
                    })
                }
                setInventario(filas);
            } else if(response.status === 401) {
                console.log("NOT AUTHORIZED, AUTH AGAIN OR REDIRECT TO LOGIN")
            }
        })
    }

    return (
        <div>
            <rs.Card className='card'>
                <rs.CardHeader className='header'>
                    <h3><FontAwesomeIcon icon={icon.faListNumeric}/> Inventario</h3>
                </rs.CardHeader>
                <rs.CardBody className='body'>
                    <rs.InputGroup>
                        <rs.Input
                            id="searchInventory"
                            name="Search"
                            placeholder="Buscar por item, nombre, categoria o almacen..."
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
                                            FECHA DE REGISTRO
                                        </th>
                                        <th>
                                            CODIGO DEL ITEM
                                        </th>
                                        <th>
                                            ITEM
                                        </th>
                                        <th>
                                            CATEGORIA
                                        </th>
                                        <th>
                                            CANT. ENTRADAS
                                        </th>
                                        <th>
                                            CANT. SALIDAS
                                        </th>
                                        <th>
                                            TOTAL INGRESOS
                                        </th>
                                        <th>
                                            TOTAL EGRESOS
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {inventario}
                                </tbody>
                            </rs.Table>
                            {inventario.length === 0 ?
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

export default Inventario;
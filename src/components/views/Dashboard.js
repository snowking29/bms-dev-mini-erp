import React, { useState, useEffect } from 'react';
import * as rs from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icon from '@fortawesome/free-solid-svg-icons';
import AuthService from "../../api/services/auth-services";
import * as product_services from '../../api/services/product-services';
import * as entry_services from '../../api/services/entry-services';
import * as customer_services from '../../api/services/customer-services';
import * as employee_services from '../../api/services/employee-services';
import * as sales_service from '../../api/services/sales-services';

function Dashboard(props){
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [role, setRole] = useState(null);
    const [cantProd, setCantProd] = useState(null);
    const [cantEntries, setCantEntries] = useState(null);
    const [cantCustomers, setCantCustomers] = useState(null);
    const [cantSales, setCantSales] = useState(null);
    const defaultUser = require('../../assets/user.png');

    useEffect(() => {
        getDashboardData();
    },[])

    function getDashboardData () {
        product_services.getProducts().then( (response) => {
            if (response.status === 200){
                setCantProd(response.data.data.length)
            }
        })

        entry_services.getEntries().then( (response) => {
            if (response.status === 200){
                setCantEntries(response.data.data.length)
            }
        })

        customer_services.getCustomers().then( (response) => {
            if (response.status === 200) {
                setCantCustomers(response.data.data.length)
            }
        })

        sales_service.getSales().then( (response) => {
            if (response.status === 200) {
                setCantSales(response.data.data.length)
            }
        })
    }

    function putProfile () {
        
    }
    

    useEffect(() => {
        const currentUser = AuthService.getCurrentUser();
        if (currentUser) {
            setName(currentUser.fullName)
            setEmail(currentUser.email)
            setRole(currentUser.role)
        }
    },[])
    return (
        <div>
            <rs.Card className='card'>
                <rs.CardHeader className='header'>
                    <h3><FontAwesomeIcon icon={icon.faUserCheck}/> Dashboard</h3>
                </rs.CardHeader>
            </rs.Card>
            <br/>
            <rs.Row>
                <rs.Col sm={3}>
                    <rs.Card className='dashboard' body>
                        <rs.CardTitle tag="h1">
                            <FontAwesomeIcon className="icon" icon={icon.faBoxes}/> {cantProd}
                        </rs.CardTitle>
                        <rs.CardText className="text" tag ="h5">
                            Productos 
                        </rs.CardText>
                    </rs.Card>
                </rs.Col>
                <rs.Col sm={3}>
                    <rs.Card className='dashboard' body>
                        <rs.CardTitle tag="h1">
                            <FontAwesomeIcon className="icon" icon={icon.faCartPlus}/> {cantSales}
                        </rs.CardTitle>
                        <rs.CardText className="text" tag ="h5">
                            Ventas Totales
                        </rs.CardText>
                    </rs.Card>
                </rs.Col>
                <rs.Col sm={3}>
                    <rs.Card className='dashboard' body>
                        <rs.CardTitle tag="h1">
                            <FontAwesomeIcon className="icon" icon={icon.faCartArrowDown}/> {cantEntries}
                        </rs.CardTitle>
                        <rs.CardText className="text" tag ="h5">
                            Entradas Totales
                        </rs.CardText>
                    </rs.Card>
                </rs.Col>
                <rs.Col sm={3}>
                    <rs.Card className='dashboard' body>
                        <rs.CardTitle tag="h1">
                            <FontAwesomeIcon icon={icon.faUsers}/> {cantCustomers}
                        </rs.CardTitle>
                        <rs.CardText className="text" tag ="h5">
                            Nuevos Clientes
                        </rs.CardText>
                    </rs.Card>
                </rs.Col>
            </rs.Row>
            <br/>
            <rs.Row>
                <rs.Col sm={6}>
                    <rs.Card className='inner-div'>
                        <div className='front'>
                            <div className='front__bkg-photo'></div>
                            <img src={defaultUser} className='front__face-photo'/>
                            <div className='front__text'>
                                <h3 className='front__text-header'>{name}</h3>
                                <p className='front__txt-para'>{email}</p>
                                <span className='front__text-hover'>{role}</span>
                            </div>
                        </div>
                    </rs.Card>
                </rs.Col>
                <rs.Col sm={6}>
                    <rs.Card>
                        <rs.CardHeader  className='profile-header'>
                            <h3>Actualizar Datos</h3>
                        </rs.CardHeader>
                        <rs.CardBody>
                            <rs.Form>
                                <rs.Row>
                                    <rs.Col sm={12}>
                                        <rs.Row>
                                            <rs.Col md={12}>
                                                <rs.FormGroup>
                                                    <rs.Label><FontAwesomeIcon icon={icon.faFileText}/> Nombre</rs.Label>
                                                    <rs.Input
                                                        name="name"
                                                        placeholder={name}
                                                        type="text"
                                                        disabled
                                                    />
                                                </rs.FormGroup>
                                            </rs.Col>
                                            <rs.Col md={12}>
                                                <rs.FormGroup>
                                                    <rs.Label><FontAwesomeIcon icon={icon.faAt}/> Email</rs.Label>
                                                    <rs.Input
                                                        name="email"
                                                        placeholder={email}
                                                        type="email"
                                                        disabled
                                                    />
                                                </rs.FormGroup>
                                            </rs.Col>
                                            <rs.Col md={12}>
                                                <rs.FormGroup>
                                                    <rs.Label><FontAwesomeIcon icon={icon.faKey}/> Contraseña</rs.Label>
                                                    <rs.Input
                                                        name="password"
                                                        placeholder=""
                                                        type="password"
                                                        disabled
                                                    />
                                                </rs.FormGroup>
                                            </rs.Col>
                                            <rs.Col md={12}>
                                                <rs.FormGroup>
                                                    <rs.Label><FontAwesomeIcon icon={icon.faKey}/> Confirmar Contraseña</rs.Label>
                                                    <rs.Input
                                                        name="confirmPassword"
                                                        placeholder=""
                                                        type="password"
                                                        disabled
                                                    />
                                                </rs.FormGroup>
                                            </rs.Col>
                                            <rs.Col md={12}>
                                                <rs.FormGroup>
                                                    <rs.Button color="success" >Actualizar</rs.Button>
                                                </rs.FormGroup>
                                            </rs.Col>
                                        </rs.Row>
                                    </rs.Col>
                                    
                                </rs.Row>
                                <hr/>
                            </rs.Form>
                        </rs.CardBody>
                    </rs.Card>
                </rs.Col>
            </rs.Row>        
        </div>
    );
}

export default Dashboard;
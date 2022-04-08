import React, { useState, useEffect } from 'react';
import * as rs from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icon from '@fortawesome/free-solid-svg-icons';
import * as customer_services from '../../api/services/customer-services';

function Registro_Clientes(){

    return (
        <rs.Col sm={3}>
            <rs.Card>
                <rs.CardHeader className="h4 card-filters">
                    <FontAwesomeIcon icon={icon.faUserCheck}/>
                    {' '}
                    Registrar Cliente
                </rs.CardHeader>
                <rs.CardBody>
                    <rs.Form>
                        <rs.FormGroup>
                            <rs.Label>
                                <FontAwesomeIcon icon={icon.faFileText}/> Nombre
                            </rs.Label>
                            <rs.Input
                                name="txtName"
                                type="text"
                            />
                        </rs.FormGroup>
                        <rs.FormGroup>
                            <rs.Label>
                                <FontAwesomeIcon icon={icon.faFileText}/> Apellidos
                            </rs.Label>
                            <rs.Input
                                name="txtLastname"
                                type="text"
                            />
                        </rs.FormGroup>
                        <rs.FormGroup>
                            <rs.Label>
                                <FontAwesomeIcon icon={icon.faPhone}/> Telefono
                            </rs.Label>
                            <rs.Input
                                name="txtPhone"
                                type="number"
                            />
                        </rs.FormGroup>
                        <rs.FormGroup>
                            <rs.Label>
                                <FontAwesomeIcon icon={icon.faMailBulk}/> Email
                            </rs.Label>
                            <rs.Input
                                name="txtEmail"
                                type="email"
                            />
                        </rs.FormGroup>
                        <rs.FormGroup>
                            <rs.Label>
                                <FontAwesomeIcon icon={icon.faIdCard}/> DNI / RUC
                            </rs.Label>
                            <rs.Input
                                name="txtIdentifyID"
                                type="number"
                            />
                        </rs.FormGroup>
                        <rs.FormGroup>
                            <rs.Label>
                                <FontAwesomeIcon icon={icon.faComment}/> Detalle
                            </rs.Label>
                            <rs.Input
                                name="txtDetail"
                                type="textarea"
                            />
                        </rs.FormGroup>
                        <rs.FormGroup>
                            <rs.Label>
                                <FontAwesomeIcon icon={icon.faCalendar}/> Fecha de creacion
                            </rs.Label>
                            <rs.Input
                                name="txtFCreation"
                                type="datetime-local"
                            />
                        </rs.FormGroup>
                        <rs.Button color="success">
                            <FontAwesomeIcon icon={icon.faSave}/>{' '}Grabar
                        </rs.Button>
                    </rs.Form>
                </rs.CardBody>
            </rs.Card>
        </rs.Col>
    )
}

export default Registro_Clientes;

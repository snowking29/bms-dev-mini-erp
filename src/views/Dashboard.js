import React from "react";
import * as rs from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icon from '@fortawesome/free-solid-svg-icons';

function Dashboard(){

    return (
        <div>
            <rs.Row>
                <rs.Col sm={3}>
                    <rs.Card className='dashboard' body>
                        <rs.CardTitle tag="h1">
                            50 <FontAwesomeIcon className="icon" icon={icon.faBoxes}/> 
                        </rs.CardTitle>
                        <rs.CardText className="text" tag ="h5">
                            Productos Vendidos
                        </rs.CardText>
                    </rs.Card>
                </rs.Col>
                <rs.Col sm={3}>
                    <rs.Card className='dashboard' body>
                        <rs.CardTitle tag="h1">
                            20 <FontAwesomeIcon className="icon" icon={icon.faLineChart}/>
                        </rs.CardTitle>
                        <rs.CardText className="text" tag ="h5">
                            Ventas Totales
                        </rs.CardText>
                    </rs.Card>
                </rs.Col>
                <rs.Col sm={3}>
                    <rs.Card className='dashboard' body>
                        <rs.CardTitle tag="h1">
                            <FontAwesomeIcon icon={icon.faDollar}/> 10
                        </rs.CardTitle>
                        <rs.CardText className="text" tag ="h5">
                            Compras Totales
                        </rs.CardText>
                    </rs.Card>
                </rs.Col>
                <rs.Col sm={3}>
                    <rs.Card className='dashboard' body>
                        <rs.CardTitle tag="h1">
                            <FontAwesomeIcon icon={icon.faUsers}/> 10
                        </rs.CardTitle>
                        <rs.CardText className="text" tag ="h5">
                            Nuevos Clientes
                        </rs.CardText>
                    </rs.Card>
                </rs.Col>
            </rs.Row>
        </div>
    );
}

export default Dashboard;
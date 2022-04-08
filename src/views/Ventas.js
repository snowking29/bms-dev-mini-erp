import React, {Component} from 'react'
import * as rs from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icon from '@fortawesome/free-solid-svg-icons';

class Ventas extends Component {
    render() {
        return (
            <div>
                <div>
                    <h2>&nbsp;Punto de venta</h2>
                    <hr/>
                </div>
                <rs.Container fluid className="p-8" >
                    <rs.Row>
                        <rs.Col sm={8}>
                            <rs.Card>
                                <rs.Row>
                                    <rs.Col sm={4}>
                                        <br/>
                                        <h4 className='card-header-card-left-side'>Costo de Venta: S/. 32.30</h4>
                                    </rs.Col>
                                    <rs.Col sm={4} className="btnActions">
                                        <br/>
                                        <rs.Button color="success">Generar Venta <FontAwesomeIcon icon={icon.faCheckCircle}/></rs.Button>
                                        {' '}
                                        <rs.Button color="danger">Vaciar Listado </rs.Button>
                                    </rs.Col>
                                </rs.Row>
                                <rs.CardBody>
                                    <rs.Table>
                                        <thead>
                                            <tr>
                                                <th>
                                                    Codigo
                                                </th>
                                                <th>
                                                    Producto
                                                </th>
                                                <th>
                                                    Cantidad
                                                </th>
                                                <th>
                                                    Precio
                                                </th>
                                                <th>
                                                    Total
                                                </th>
                                                <th>
                                                    
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    EXAMPLE_123
                                                </td>
                                                <td>
                                                    Bidon de agua con cano x 20L
                                                </td>
                                                <td>
                                                    1
                                                </td>
                                                <td>
                                                    35.00
                                                </td>
                                                <td>
                                                    35.00
                                                </td>
                                                <td>
                                                    <div>
                                                        <rs.Button color="primary" value='Agregar'><FontAwesomeIcon icon={icon.faPlusSquare}/></rs.Button>
                                                        {' '}
                                                        <rs.Button color="warning" value='Editar'><FontAwesomeIcon icon={icon.faEdit}/></rs.Button>
                                                        {' '}
                                                        <rs.Button color="danger" value='Eliminar'><FontAwesomeIcon icon={icon.faXmarkSquare}/></rs.Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </rs.Table>
                                </rs.CardBody>
                            </rs.Card>
                        </rs.Col>
                        <br/>
                        <rs.Col sm={4}>
                            <rs.Card>
                                <rs.CardTitle className="h4 card-header-card-right-side">
                                    Total Venta: S/. 32.30
                                </rs.CardTitle>
                                <rs.CardBody>
                                    <rs.Form>
                                        <rs.FormGroup>
                                            <FontAwesomeIcon icon={icon.faUser}/> Cliente (*)
                                            <rs.Row>
                                                <rs.Col sm={8}>
                                                    <rs.Input
                                                        tpye='text'
                                                        value="Renzo Costa"
                                                        disabled
                                                    />
                                                </rs.Col>
                                                <rs.Col sm={4}>
                                                    <rs.Button color="success" value="Seleccionar Cliente">Buscar cliente <FontAwesomeIcon icon={icon.faUserFriends}/></rs.Button>
                                                </rs.Col>
                                            </rs.Row>
                                        </rs.FormGroup>
                                        <rs.FormGroup>
                                            <FontAwesomeIcon icon={icon.faFile}/> Documento (*)
                                        </rs.FormGroup>
                                        <rs.FormGroup>
                                            <rs.Col sm={6}>
                                                <rs.Input
                                                    name="rbtnDocumentType"
                                                    type="radio"
                                                />
                                                {' '}
                                                F. de Creacion
                                            </rs.Col>
                                            <br/>
                                            <rs.Col sm={6}>
                                                <rs.Input
                                                    name="rbtnDocumentType"
                                                    type="radio"
                                                />
                                                {' '}
                                                F. de Modificacion
                                            </rs.Col>
                                        </rs.FormGroup>
                                        <rs.FormGroup>
                                            <FontAwesomeIcon icon={icon.faMoneyBill}/> Tipo de pago (*)
                                        </rs.FormGroup>
                                        <rs.FormGroup>
                                            <rs.Row>
                                                <rs.Col sm={4}>
                                                    <strong>Serie</strong>
                                                    <rs.Input
                                                        tpye="text"
                                                        disabled
                                                        value="00001"
                                                        />
                                                </rs.Col>
                                                <rs.Col sm={8}>
                                                    <strong>Nro. Venta</strong>
                                                    <rs.Input
                                                        tpye="text"
                                                        disabled
                                                    />
                                                </rs.Col>
                                            </rs.Row>
                                        </rs.FormGroup>
                                        <rs.FormGroup>
                                            <strong>Efectivo recibido o por recibir</strong>
                                            <rs.Input
                                                tpye="text"
                                            />
                                        </rs.FormGroup>
                                        <rs.FormGroup>
                                            <h5>Monto Recibido: S/. 32.30</h5>
                                            <h5>Vuelto: S/. 0.00</h5>
                                            <hr/>
                                            <h6>SUBTOTAL: </h6>
                                            <h6>IGV(18%): </h6>
                                            <h6>TOTAL: </h6>
                                        </rs.FormGroup>
                                    </rs.Form>
                                </rs.CardBody>
                            </rs.Card>
                        </rs.Col>
                    </rs.Row>
                </rs.Container>
            </div>
        )
    }
}
export default Ventas;
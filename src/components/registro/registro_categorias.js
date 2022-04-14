import React, { useState } from 'react';
import * as rs from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icon from '@fortawesome/free-solid-svg-icons';
import * as category_service from '../../api/services/category-services';
import Loader from "../utils/loader";

function Registro_Categoria(props){

    const [code,setCode] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [creationTime, setCreationTime] = useState("");
    const [showLoader, setShowLoader] = useState(false);

    function saveCategory() {

        var date = new Date(creationTime)
        
        let dataCategory = {
            "code": code,
            "name": name,
            "description": description,
            "products":[],
            "creationTime": date.toLocaleString('es-PE'),
            "modifiedTime": ""
        }
        setShowLoader(true);
        category_service.postCategories(dataCategory)
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
                        <FontAwesomeIcon icon={icon.faTags}/>
                        {' '}
                        Nueva Categoria
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
                            <rs.FormGroup>
                                <rs.Label>
                                    <FontAwesomeIcon icon={icon.faCalendar}/> Fecha de creacion
                                </rs.Label>
                                <rs.Input
                                    name="txtFCreation"
                                    id="txtDescription"
                                    type="datetime-local"
                                    onChange={(e) => setCreationTime(e.target.value)}
                                />
                            </rs.FormGroup>
                            <hr/>
                            <rs.FormGroup className='actions'>
                                <div className='left'>
                                    <rs.Button color="success" onClick={saveCategory}>
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

export default Registro_Categoria;

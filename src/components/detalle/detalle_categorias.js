import React, { useState, useEffect } from 'react';
import * as rs from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icon from '@fortawesome/free-solid-svg-icons';
import * as category_services from '../../api/services/category-services';
import Loader from "../utils/loader";
import {removeEmptyData} from "../utils/RemoveEmptyData";

function Detalle_Categoria(props){

    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [showLoader, setShowLoader] = useState(false);
    var key = props.dataCategoria.key;

    function saveCategory() {
        
        var date = new Date()

        var temporaryDataCategory = {
            "code": code,
            "name": name,
            "description": description,          
            "modifiedTime": date.toLocaleString('es-PE')
        }

        var dataCategory = removeEmptyData(temporaryDataCategory)

        setShowLoader(true);
        category_services.putCategories(key, dataCategory)
            .then(
                (response => {
                    setShowLoader (false);
                    if (response) {
                        if (response.data.meta.status.code === "00") {
                            clearFields();
                            props.actualizaResultados();
                        }
                    }
                })
            )
    }

    function clearFields(){
        setCode("")
        setName("")
        setDescription("")
    }

    function deleteCategory (){
        setShowLoader(true);
        category_services.deleteCategories(key).then((response) => {
            if (response) {
                setShowLoader (false);
                if ( response.data.meta.status.code === "00" ) {
                    props.actualizaResultados();
                }
            }
        })
    }

    return (
        <rs.Col sm={3}>
            {showLoader ? <Loader /> : 
                <rs.Card className='card'>
                    <rs.CardHeader className="h4 editing">
                        <FontAwesomeIcon icon={icon.faFileEdit}/>
                        {' '}
                        Detalle Categoria
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
                                    placeholder={props.dataCategoria.code}
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
                            <hr/>
                            <rs.FormGroup className='actions'>
                                <div className='left'>
                                    <rs.Button color='success'onClick={() => saveCategory()}>
                                        <FontAwesomeIcon icon={icon.faSave}/>{' '}Guardar
                                    </rs.Button>
                                </div>
                                <div className='right'>
                                    <rs.Button color='danger' onClick={() => deleteCategory()}>
                                        <FontAwesomeIcon icon={icon.faTrash}/>{' '}Eliminar
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

export default Detalle_Categoria;

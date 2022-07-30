import React, { useState, useEffect } from 'react';
import * as rs from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icon from '@fortawesome/free-solid-svg-icons';
import AuthService from "../../api/services/auth-services";
import "../../css/Perfil.css";

function Perfil () {
    

    /*const handleImageChange = (e) => {
        setError(false);
        const selected = e.target.files[0];
        const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];

        if (selected && ALLOWED_TYPES.includes(selected.type)) {
            let reader = new FileReader();
            reader.onloadend = () => {
                setImgPreview(reader.result);
            }
            reader.readAsDataURL(selected);
        } else {
            setError(true);
        }
    }*/

    return (
        <div>
                
        </div>
    )
}

export default Perfil;

/*
<rs.Col sm={6}>
                                        <rs.FormGroup>
                                            <rs.Label><FontAwesomeIcon icon={icon.faImage}/> Foto de Perfil</rs.Label>
                                            <div className='box-container'>
                                                <div className="imgPreview" 
                                                    style={{background: imgPreview 
                                                        ? `url("${imgPreview}") no-repeat center/cover` 
                                                        : "#131313"
                                                    }}
                                                >
                                                    {!imgPreview && (
                                                        <>
                                                            <rs.Label htmlFor="fileUpload" className="customFileUpload">
                                                                Elegir Archivo
                                                            </rs.Label>
                                                            <rs.Input
                                                                id="fileUpload"
                                                                className="imgInput"
                                                                type="file"
                                                                onChange={handleImageChange}
                                                            />
                                                            <span>(.jpg .jpeg .png)</span>
                                                        </>
                                                    )}
                                                </div>
                                                {imgPreview && (
                                                    <rs.Button className="removeBtn" onClick={() => setImgPreview(null)}>Remover imagen</rs.Button>
                                                )}
                                                {error && <p className="errorMsg">Archivo no soportado.</p>}
                                            </div>
                                        </rs.FormGroup>
                                    </rs.Col>
*/
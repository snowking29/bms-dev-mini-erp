import React, { useState, useEffect } from 'react';
import * as rs from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icon from '@fortawesome/free-solid-svg-icons';
import AuthService from "../../api/services/auth-services";
import "../../css/Perfil.css";

function Perfil () {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState(null);
    const [role, setRole] = useState(null);
    const [imgPreview, setImgPreview] = useState(null);
    const [error, setError] = useState(false);

    const defaultUser = require('../../assets/user.png');
    
    useEffect(() => {
        const currentUser = AuthService.getCurrentUser();
        if (currentUser) {
            setUser(currentUser.name)
            setEmail(currentUser.email)
            setRole(currentUser.role)
        }
    },[])

    const handleImageChange = (e) => {
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
    }

    return (
        <div>
            <rs.Card className='card'>
                <rs.CardHeader className='header'>
                    <h3><FontAwesomeIcon icon={icon.faUserCheck}/> Perfil</h3>
                </rs.CardHeader>
            </rs.Card>
            <br/>
            <rs.Row>
                <rs.Col sm={4}>
                    <rs.Card className='inner-div'>
                        <div className='front'>
                            <div className='front__bkg-photo'></div>
                            <img src={defaultUser} className='front__face-photo'/>
                            <div className='front__text'>
                                <h3 className='front__text-header'>{user}</h3>
                                <p className='front__txt-para'>{email}</p>
                                <span className='front__text-hover'>{role}</span>
                            </div>
                        </div>
                    </rs.Card>
                </rs.Col>
                <rs.Col sm={8}>
                    <rs.Card>
                        <rs.CardHeader  className='profile-header'>
                            <h3>Actualizar Datos</h3>
                        </rs.CardHeader>
                        <rs.CardBody>
                            <rs.Form>
                                <rs.Row>
                                    <rs.Col sm={6}>
                                        <rs.Row>
                                            <rs.Col md={12}>
                                                <rs.FormGroup>
                                                    <rs.Label><FontAwesomeIcon icon={icon.faFileText}/> Nombre</rs.Label>
                                                    <rs.Input
                                                        name="name"
                                                        placeholder={user}
                                                        type="text"
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
                                                    />
                                                </rs.FormGroup>
                                            </rs.Col>
                                            <rs.Col md={12}>
                                                <rs.FormGroup>
                                                    <rs.Label><FontAwesomeIcon icon={icon.faClipboardList}/> Rol</rs.Label>
                                                    <rs.Input
                                                        name="role"
                                                        placeholder={role}
                                                        type="text"
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
                                </rs.Row>
                                <hr/>
                            </rs.Form>
                        </rs.CardBody>
                    </rs.Card>
                </rs.Col>
            </rs.Row>            
        </div>
    )
}

export default Perfil;

/*

*/
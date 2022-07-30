import React, { useState, useEffect } from "react";
import * as rs from 'reactstrap'
import "../../css/Login.css";
import AuthService from "../../api/services/auth-services";
import { useNavigate  } from 'react-router-dom';
import Alerta from "../utils/alerta";
import CustomModal from "../utils/modalWithIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icon from '@fortawesome/free-solid-svg-icons';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msjAlert, setMsjAlert] = useState("");
  const [mostrarAlert, setMostrarAlert] = useState(false);
  const [color, setColor] = useState("secondary");

  const [modalIcon, setModalIcon] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [modalFooter, setModalFooter] = useState("");

  const avatar = require('../../assets/avatar.png');
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      navigate("/dashboard")
    }
  },[])

  useEffect(() => {
    if (mostrarModal === true) {
      setTimeout(() => ocultarModal(), 3000);
    }
  },[mostrarModal])

  function ocultarAlerta(){
    setMostrarAlert(false);
  }
  function ocultarModal(){
    setMostrarModal(false);
    navigate("/dashboard")
  }

  const onSubmit = async(event) => {
    event.preventDefault();
    await AuthService.login(email, password).then(
      (data) => {
        if (data.success === "false") {
          setColor("danger");
          setMsjAlert(data.meta.status.message_ilgn[0].value);
          setMostrarAlert(true);
        } else {
          setModalTitle(<h4>Bienvenido!</h4>)
          setModalIcon(<FontAwesomeIcon icon={icon.faCheck} className="mr-2"/>)
          setModalBody("Has ingresado correctamente.")
          setModalFooter(<rs.Button className="btn btn-lg btn-success btn-block" onClick={()=> ocultarModal()}>OK</rs.Button>)
          setMostrarModal(true)
        }
      }
    );
  };

  return (
    <rs.Card className="login">
      <div className="login-content">
        <rs.CardTitle>
          <div className="login-header">
            <div className="avatar">
              <img src={avatar} alt="Avatar"/>
            </div>
            <br/>
            <h4>Bienvenido</h4>
          </div>
        </rs.CardTitle>
        <br/>
        <rs.CardBody>
          <rs.Form onSubmit={onSubmit}>
            <rs.FormGroup>
              <rs.Input
                type="email"
                name="email"
                id="Email"
                placeholder="Correo Electronico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </rs.FormGroup>
            <rs.FormGroup>
              <rs.Input
                type="password"
                name="password"
                id="Password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </rs.FormGroup>
            <rs.Button className="btn-lg btn-block btn-grad" type="submit">Ingresar</rs.Button>
          </rs.Form>
          <br/>
          <CustomModal modalVisible={mostrarModal} ocultar={ocultarModal} modalIcon={modalIcon} modalTitle={modalTitle} modalBody={modalBody} modalFooter={modalFooter}/>
          <Alerta msj={msjAlert} alertVisible={mostrarAlert} color={color} ocultar={ocultarAlerta}/>
        </rs.CardBody>
      </div>
    </rs.Card>
  );
}

export default Login;
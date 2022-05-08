import React, { useState, useContext } from "react";
import { Navigate  } from 'react-router-dom';
import * as rs from 'reactstrap'
import "../../css/Login.css";
import { AccountContext } from "../utils/Account";


const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { authenticate } = useContext(AccountContext )

  const onSubmit = (event) => {
    event.preventDefault();
    authenticate(email, password)
      .then((data) => {
        if (data.hasOwnProperty("isFirstLogin")) {
          console.log("FirstLogin");
          
        } else {
          console.log("Logged In")
        }
      })
      .catch((err) => {
        console.error("Failed")
      })
  };

  return (
    <rs.Card className="login">

      <rs.CardTitle className="title">
        <h3>Login</h3>
      </rs.CardTitle>
      <rs.CardBody className="form">
        <rs.Form onSubmit={onSubmit}>
          <rs.FormGroup>
            <rs.Label for="Email">Correo electronico</rs.Label>
            <rs.Input
              type="email"
              name="email"
              id="Email"
              placeholder="ejemplo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </rs.FormGroup>
          <rs.FormGroup>
            <rs.Label for="Password">Contraseña</rs.Label>
            <rs.Input
              type="password"
              name="password"
              id="Password"
              placeholder="*******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </rs.FormGroup>
          <rs.FormGroup>
            <rs.Button className="btn-grad" color="primary" type="submit">Ingresar</rs.Button>
          </rs.FormGroup>
          <br/>
        </rs.Form>
      </rs.CardBody>
    </rs.Card>
  );
}

export default Login;
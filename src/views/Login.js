import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../api/services/auth-services";
import { Button, Form, Input, Label, FormGroup, FormFeedback } from 'reactstrap'
import "../css/Login.css";
import UserPool from "../components/utils/UserPool";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const user = new CognitoUser({
      Username: email,
      Pool: UserPool,
    })

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    })

    user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        console.log("onSuccess: ",data);
      },
      onFailure: (err) => {
        console.log("onFailure: ", err);
      }
    })
    /*try {
      await AuthService.login(email, password).then(
        () => {
          navigate("/dashboard");
          window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }*/
  };

  return (
    <div className="Login" >
      <h1>Bienvenido.</h1>
        <Form className='form' onSubmit={handleLogin}>
          <FormGroup>
            <Label for="Email">Usuario</Label>
            <Input
              type="email"
              name="email"
              id="Email"
              placeholder="ejemplo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormFeedback>
              Por favor ingresa un usuario valido.
            </FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="Password">Contraseña</Label>
            <Input
              type="password"
              name="password"
              id="Password"
              placeholder="*******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          <Button color="primary" type="submit">Ingresar</Button>
          <br/>
        </Form>
    </div>
  );
}

export default Login;
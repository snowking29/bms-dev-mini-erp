import React, { useState, useContext, useEffect } from "react";
import * as rs from 'reactstrap'
import "../../css/Login.css";
import { AccountContext } from "../utils/Account";

const NewPasswordChallenge = () => {

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [isFirstLogin, setIsFirstLogin] = useState(false);

    const { getSession } = useContext(AccountContext)

    const onSubmit = (event) => {
        event.preventDefault();
        getSession().then(({ user }) => {
            setLoggedIn(true);
            if (user.hasOwnProperty("isFirstLogin")) {
                user.completeNewPasswordChallenge(newPassword, (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(result);
                    }
                })
            }
        })
    }
    
    return (
        <div className="newPassword">
            {loggedIn && (
                <rs.Card className="login">
                    <rs.CardTitle className="title">
                        <h3>Actualizar Contraseña</h3>
                    </rs.CardTitle>
                    <rs.CardBody className="form">
                        <rs.Form onSubmit={onSubmit}>
                        <rs.FormGroup>
                            <rs.Label for="newPassword">Nueva contraseña</rs.Label>
                            <rs.Input
                            type="password"
                            name="newPassword"
                            placeholder="*******"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </rs.FormGroup>
                        <rs.FormGroup>
                            <rs.Label for="confirmPassword">Confirmar contraseña</rs.Label>
                            <rs.Input
                            type="password"
                            name="confirmPassword"
                            placeholder="*******"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </rs.FormGroup>
                        <rs.FormGroup>
                            <rs.Button className="btn-grad" color="primary" type="submit">Actualizar</rs.Button>
                        </rs.FormGroup>
                        <br/>
                        </rs.Form>
                    </rs.CardBody>
                </rs.Card>
            )}
        </div>
    );
}
    
export default NewPasswordChallenge;
import React, { useState, useContext, useEffect }  from "react";
import { AccountContext } from "./Account";

const Status = () => {
    const [status, setStatus] = useState(false);

    const { getSession } = useContext(AccountContext);

    useEffect(() => {
        getSession().then((session) => {
            console.log("Session: ", session);
            setStatus(true);
        })
    }, []);
    return <div>{status ? "Estás conectado!" : "Por favor inicia sesión."}</div>
};

export default Status;
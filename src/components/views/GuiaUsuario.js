import React, { useState, useEffect } from 'react';
import * as rs from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icon from '@fortawesome/free-solid-svg-icons';

function GuiaUsuario(props){
    return (
        <div>
            <rs.Card className='card'>
                <rs.CardHeader className='header'>
                    <h3><FontAwesomeIcon icon={icon.faFileLines}/> Guia de Usuario</h3>
                </rs.CardHeader>
            </rs.Card>
            <br/>
            <iframe title='manual_de_usuario' src="https://drive.google.com/file/d/17X6A-g84AXEUKv0PrRUmGA2HLkwz_gUT/preview" width="100%" height="740" allow="autoplay"></iframe>
        </div>
    )
}

export default GuiaUsuario;
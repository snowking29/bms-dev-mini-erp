import React, { useState, useEffect } from 'react';
import * as rs from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icon from '@fortawesome/free-solid-svg-icons';
import RegistroEntrada from "../registro/registro_entradas";
import * as entry_services from '../../api/services/entry-services';
import Alerta from "../utils/alerta";
import Loader from "../utils/loader";
import CustomTableModal from "../utils/modalTable";
import CustomModal from "../utils/modal";

function Entradas (props) {

    const [action, setAction] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [entradas, setEntradas] = useState([]);
    const initialFormState = {}
    const [currentEntry , setCurrentEntry] = useState(initialFormState)
    const [search, setSearch] = useState("");

    /* MODAL STATES & FUNCTIONS */
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mostrarTableModal, setMostrarTableModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalBody, setModalBody] = useState("");
    const [modalFooter, setModalFooter] = useState(false);
    const [modalTableTitle, setModalTableTitle] = useState("");
    const [modalTableHead, setModalTableHead] = useState("");
    const [modalTableBody, setModalTableBody] = useState("");
    const [modalTableFooter, setModalTableFooter] = useState(false);
    const [modalConfirmation, setModalConfirmation] = useState(false);
    const [msjAlert, setMsjAlert] = useState("");
    const [mostrarAlert, setMostrarAlert] = useState(false);
    const [color, setColor] = useState("secondary");

    function ocultarAlerta(){
        setMostrarAlert(false);
    }

    function showRegistroEntradas(){
        setAction("registrar")
    }
    
    function ocultarTableModal(){
        setMostrarTableModal(false);
    }

    function ocultarModal(){
        setMostrarModal(false);
    }
    
    useEffect(() => {
        getEntryTable();
    },[search])

    function getEntryTable () {
        setShowLoader(true);
        entry_services.getEntries().then( (response) => {
            setShowLoader(false);
            if (response.status === 200){
                var filas = [];
                let body = response.data.data

                if (Array.isArray(body)) {
                    body.filter(val=>{
                        if(search === ''){
                            return val;
                        } else if (val.code.toLowerCase().includes(search.toLocaleLowerCase())
                            || val.user.toLowerCase().includes(search.toLocaleLowerCase())
                            || val.creationTime.toLowerCase().includes(search.toLocaleLowerCase())){
                            return val
                        }
                    }).forEach( a => {
                        setCurrentEntry(a.key);
                        filas.push(
                            <tr key= {a.code} onClick = { () => {
                                var entryTitle = <><rs.Label className='left'>Entrada: {a.code}</rs.Label></>;
                                var entryHead = <><thead><th>CODIGO</th><th>ITEM</th><th>CATEGORIA</th><th>COSTO</th><th>PRECIO</th><th>CANTIDAD</th><th>SUBTOTAL</th></thead></>
                                var entryBody = []
                                a.entries.forEach( e => {
                                    entryBody.push(
                                    <tr>
                                        <td>{e.productCode}</td>
                                        <td>{e.productName}</td>
                                        <td>{e.category}</td>
                                        <td>S/.{e.priceCost}</td>
                                        <td>S/.{e.priceSale}</td>
                                        <td>{e.quantity}</td>
                                        <td>S/.{e.subTotal}</td>
                                    </tr>)
                                }) 
                                var entryFooter = <><rs.Button color='danger' className='right' onClick={() =>
                                    buildingModal("Confirmación",`¿Desea eliminar la entrada: ${a.code}?`,
                                        <>
                                            <rs.Button color="primary" className='left'
                                                onClick={()=> setModalConfirmation(true)}
                                            >
                                                Aceptar
                                            </rs.Button>
                                            <rs.Button color="danger"  className='right'
                                                onClick={()=> ocultarModal()}
                                            >
                                                Cancelar
                                            </rs.Button>
                                        </>
                                        , "eliminar"
                                    )
                                    }>
                                    <FontAwesomeIcon icon={icon.faTrash}/>{' '}Eliminar
                                </rs.Button></>
                                
                                buildingTableModal(entryTitle,entryHead,entryBody,entryFooter)
                                }}
                                
                            >
                            <td>{a.creationTime}</td>
                            <td>{a.code}</td>
                            <td>{a.user}</td>
                            <td>S/.{a.total}</td>
                            <td>{a.provider}</td>
                            </tr>
                        )
                    })
                }
                setEntradas(filas);
            } else if(response.status === 401) {
                console.log("NOT AUTHORIZED, AUTH AGAIN OR REDIRECT TO LOGIN")
            }
        })
    }

    function actualizarTabla () {
        if (entradas.length !== 0 || typeof(entradas) !== 'undefined'){
            getEntryTable()
        }
    }

    function selectAction(value){
        setAction(value)
    }

    function buildingTableModal(title,head,body,footer){
        setModalTableTitle(title)
        setModalTableHead(head)
        setModalTableBody(body)
        setMostrarTableModal(true)
        setModalTableFooter(footer)
    }

    function buildingModal(title,body,footer,event){
        setAction(event)
        setModalTitle(title)
        setModalBody(body)
        setMostrarModal(true)
        setModalFooter(footer)
    }

    useEffect(() => {
        if (modalConfirmation === true && action === "eliminar") {
            setShowLoader(true);
            setMostrarModal(false)
            setMostrarTableModal(false)
            entry_services.deleteEntry(currentEntry).then((response) => {
                if (response) {
                    setShowLoader (false);
                    if ( response.data.meta.status.code === "00" ) {
                        actualizarTabla();
                    }else{
                        setColor("danger");
                        setMsjAlert(response.data.meta.status.message_ilgn[0].value);
                    }
                }
            })
            setModalConfirmation("")
        }
    },[modalConfirmation, action])

    return (
        <div>
            {action === "registrar" ? <RegistroEntrada currentUser={props.currentUser} actualizaResultados={actualizarTabla} selectAction={selectAction}/> :
                <rs.Card className='card'>
                    <rs.CardHeader className='header'>
                        <rs.Row>
                            <rs.Col sm={10}>
                                <h3><FontAwesomeIcon icon={icon.faListNumeric}/> Lista de Entradas</h3>
                            </rs.Col>
                            <rs.Col sm={2}>
                                <rs.Button 
                                    className='button'
                                    value="Registrar"
                                    onClick={showRegistroEntradas}
                                >
                                    <FontAwesomeIcon icon={icon.faPlusCircle}/> Nuevo
                                </rs.Button>
                            </rs.Col>
                        </rs.Row>
                    </rs.CardHeader>
                    <rs.CardBody className='body'>
                        <rs.InputGroup>
                            <rs.Input
                                id="searchEntry"
                                name="Search"
                                placeholder="Buscar registro, documento, usuario..."
                                type="search"
                                style={{ textAlign: 'center'}}
                                onChange={(e)=>{
                                    setSearch(e.target.value)
                                }}
                            />
                            <rs.InputGroupText>
                                <FontAwesomeIcon icon={icon.faSearch}/>
                            </rs.InputGroupText>
                        </rs.InputGroup>
                        <br/>
                        {showLoader ? <Loader /> :
                            <rs.Form>
                                <rs.Table className='fl-table' responsive>
                                    <thead>
                                        <tr>
                                            <th>
                                                FECHA DE REGISTRO
                                            </th>
                                            <th>
                                                N° GUIA
                                            </th>
                                            <th>
                                                USUARIO
                                            </th>
                                            <th>
                                                IMPORTE
                                            </th>
                                            <th>
                                                PROVEEDOR
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {entradas}
                                    </tbody>
                                </rs.Table>
                                {entradas.length === 0 ?
                                    <h5 className="noData">
                                        No data.
                                    </h5>
                                : <span/>}
                            </rs.Form>
                        }
                        <CustomTableModal modalVisible={mostrarTableModal} ocultar={ocultarTableModal} modalTableTitle={modalTableTitle} modalTableHead={modalTableHead} modalTableBody={modalTableBody} modalTableFooter={modalTableFooter}/>
                        <CustomModal modalVisible={mostrarModal} ocultar={ocultarModal} modalTitle={modalTitle} modalBody={modalBody} modalFooter={modalFooter}/>
                        <Alerta msj={msjAlert} alertVisible={mostrarAlert} color={color} ocultar={ocultarAlerta}/>
                    </rs.CardBody>
                </rs.Card>
            }
        </div>
    )
}

export default Entradas;
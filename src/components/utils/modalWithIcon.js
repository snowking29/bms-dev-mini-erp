import React, {Component} from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../../css/Modal.css';

class CustomModal extends Component {

    cerrarModal = () => {
        this.props.ocultar();
    }
    
    render() {
        return (
            <Modal className='modal-dialog modal-confirm' isOpen={this.props.modalVisible}  toggle={this.cerrarModal}>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <div className='icon-box'>
                            <i className="material-icons">{this.props.modalIcon}</i>
                        </div>
                        {this.props.modalTitle}
                    </div>
                    <div className='modal-body'>
                        {this.props.modalBody}
                    </div>
                    <div className='modal-footer'>
                        {this.props.modalFooter}
                    </div>
                </div>
            </Modal>
        );
    }
}

export default CustomModal
import React, {Component} from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class CustomModal extends Component {

    cerrarModal = () => {
        this.props.ocultar();
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.modalVisible}  toggle={this.cerrarModal}>
                    <ModalHeader>
                        {this.props.modalTitle}
                    </ModalHeader>
                    <ModalBody>
                        {this.props.modalBody}
                    </ModalBody>
                    <ModalFooter>
                        {this.props.modalFooter}
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default CustomModal
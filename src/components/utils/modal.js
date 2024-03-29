import React, {Component} from 'react'
import * as rs from 'reactstrap';

class CustomModal extends Component {

    cerrarModal = () => {
        this.props.ocultar();
    }
    
    render() {
        return (
            <div>
                <rs.Modal isOpen={this.props.modalVisible}  toggle={this.cerrarModal}>
                    <rs.ModalHeader>
                        {this.props.modalTitle}
                    </rs.ModalHeader>
                    <rs.ModalBody>
                        {this.props.modalBody}
                    </rs.ModalBody>
                    <rs.ModalFooter>
                        {this.props.modalFooter}
                    </rs.ModalFooter>
                </rs.Modal>
            </div>
        );
    } 
}

export default CustomModal
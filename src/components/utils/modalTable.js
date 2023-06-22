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
                        {this.props.modalTableTitle}
                    </rs.ModalHeader>
                    <rs.ModalBody>
                        <rs.Table className='fl-modal-table' responsive>
                            <thead>
                                {this.props.modalTableHead}
                            </thead>
                            <tbody>
                                {this.props.modalTableBody}
                            </tbody>
                        </rs.Table>
                    </rs.ModalBody>
                    <rs.ModalFooter>
                        {this.props.modalTableFooter}
                    </rs.ModalFooter>
                </rs.Modal>
            </div>
        );
    } 
}

export default CustomModal
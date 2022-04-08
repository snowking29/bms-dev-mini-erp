import React, {Component} from 'react'
import { Alert } from 'reactstrap';

class Alerta extends Component {

    cerrarAlerta = () => {
        this.props.ocultar();
    }

    render() {
        return (
            <div>
                <Alert color={this.props.color} isOpen={this.props.alertVisible}  toggle={this.cerrarAlerta}>
                    {this.props.msj}
                </Alert>
            </div>
        );
    }
}

export default Alerta
import React, {Component} from 'react'
import {Col, Row} from "reactstrap";
import loader from "../../assets/loader.gif";

class Loader extends Component {

    render() {
        return(
            <div>
                <Row className="align-items-center" >
                    <Col className="text-center" >
                        <img src={loader} className="img-fluid" />
                    </Col>
                </Row>
            </div>
        )
    }

}

export default Loader
import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';

export default class CustomModal extends Component{
    render(){
        return(
            <Modal show={this.props.show} dialogClassName={this.props.dialogClassName} onHide={() =>{}}>
                <Modal.Body>
                    <Modal.Title>
                        {this.props.title}
                        <div className="modal-closebtn" onClick={this.props.onClick}>
                            <div className="closeIcon">X</div>
                        </div>
                    </Modal.Title>
                    <br/>
                    {this.props.children}
                </Modal.Body>
            </Modal>
        );
    }
}
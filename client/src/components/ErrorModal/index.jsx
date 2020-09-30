import React from 'react';
import { Modal } from 'react-bootstrap'
import './error.css';

const ErrorModal = (props) => {
    return (
        <>
            <Modal show={props.show} onHide={() => props.hide(false)} className="seeThrough">
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>

                <div className="p-2">
                    {props.text}
                </div>
            </Modal>
        </>
    )
}

export default ErrorModal;
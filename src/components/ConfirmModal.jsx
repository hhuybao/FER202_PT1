import React from "react";
import { Button, Modal } from "react-bootstrap";

const ConfirmModal = ({ show, title, message, handleConfirm, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{message}</Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} className="me-2">
          Cancel
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Xác nhận
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;

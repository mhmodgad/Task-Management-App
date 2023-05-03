import React from "react";
import { Modal, Button } from "react-bootstrap";

function RemoveMemberModal(props) {
  const { show, onHide, handleRemoveMemberSubmit } = props;

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Remove Member</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to remove this member?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleRemoveMemberSubmit}>
          Remove
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RemoveMemberModal;

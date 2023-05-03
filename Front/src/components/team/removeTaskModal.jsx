import React from "react";
import { Modal, Button } from "react-bootstrap";

function RemoveTaskModal(props) {
  const { show, onHide, selectedTask, handleRemoveTaskSubmit } = props;
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Remove Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Are you sure you want to remove the task "{selectedTask?.name}"?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleRemoveTaskSubmit}>
          Remove
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RemoveTaskModal;

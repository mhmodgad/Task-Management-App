import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

function AssignTaskModal(props) {
  const {
    show,
    onHide,
    members,
    handleAssignTaskSubmit,
    handleCheckboxChange,
  } = props;

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Assign Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleAssignTaskSubmit}>
          <Form.Group controlId="formBasicCheckbox">
            {members.map((member) => (
              <Form.Check
                key={member._id}
                type="checkbox"
                label={member.name}
                value={member._id}
                onChange={handleCheckboxChange}
              />
            ))}
          </Form.Group>
          <Button variant="primary" type="submit">
            Assign
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AssignTaskModal;

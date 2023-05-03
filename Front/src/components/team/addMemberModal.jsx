import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import Autosuggest from "react-autosuggest";

function AddMemberModal(props) {
  const {
    show,
    onHide,
    handleAddMemberSubmit,
    memberSuggestions,
    fetchMemberSuggestions,
    newMember,
    setNewMember,
  } = props;

  return (
    <Modal
      show={show}
      onHide={() => {
        onHide();
        setNewMember("");
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Member</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleAddMemberSubmit}>
          <Form.Group controlId="memberId">
            <Form.Label>Member username</Form.Label>
            <Autosuggest
              suggestions={memberSuggestions}
              onSuggestionsFetchRequested={({ value }) =>
                fetchMemberSuggestions(value)
              }
              getSuggestionValue={(suggestion) => suggestion}
              renderSuggestion={(suggestion) => <div>{suggestion}</div>}
              inputProps={{
                placeholder: "Enter member username",
                value: newMember,
                onChange: (_, { newValue }) => setNewMember(newValue),
                required: true,
              }}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddMemberModal;

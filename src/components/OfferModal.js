import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export default function OfferModal({ show, handleClose, handleSubmit }) {
  const [validated, setValidated] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  const handleFormChange = () => {
    setValidated(false);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form
        noValidate
        onSubmit={(e) =>
          handleSubmit(e, { name, comment, phone, email }, setValidated)
        }
        validated={validated}
        onChange={handleFormChange}
      >
        <Modal.Header closeButton>
          <Modal.Title>Замовлення</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-1">
            <Form.Label>
              Ваше ім`я: <sup>*</sup>
            </Form.Label>
            <Form.Control
              onChange={(e) => setName(e.target.value)}
              name="name"
              value={name}
              required
              type="text"
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-1">
            <Form.Label>
              Ваш телефон: <sup>*</sup>
            </Form.Label>
            <Form.Control
              onChange={(e) => setPhone(e.target.value)}
              name="phone"
              value={phone}
              required
              type="text"
            />
          </Form.Group>
          <Form.Group className="mb-1">
            <Form.Label>Ваш email:</Form.Label>
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              value={email}
              type="email"
            />
          </Form.Group>
          <Form.Group className="mb-1">
            <Form.Label>Коментар до замовлення:</Form.Label>
            <Form.Control
              as="textarea"
              onChange={(e) => setComment(e.target.value)}
              name={comment}
              value={comment}
              style={{ height: "100px" }}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" className="w-100" variant="primary">
            Замовити
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

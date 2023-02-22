import React from "react";
import { Button, Modal } from "react-bootstrap";

export default function ThankModal({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Дякуємо</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Дякуємо що обрали нас! <br />
        Наш менеджер звяжеться з Вами найближчим часом!
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={handleClose}
          type="submit"
          className="w-100"
          variant="primary"
        >
          Закрити
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

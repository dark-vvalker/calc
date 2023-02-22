import React from "react";
import { Card, CloseButton, Col, Row } from "react-bootstrap";
import Image from "./Image";

export default function CartItem({ item, remove }) {
  return (
    <Card className="cart-item">
      <Row className="align-items-center">
        <Col md={4}>
          <Image {...item.image} />
        </Col>
        <Col md={8}>
          <Card.Body>
            <Card.Title>{item.style.caption}</Card.Title>
            <Card.Text>
              Тип:{" "}
              {item.film.properties
                .map((el) => `${el.name}, ${el.value}`)
                .join(", ")}
              <br />
              Колір: {item.color.caption}
              <br />
              Розмір штори (Ш×В): {item.width} x {item.height} мм <br />
              {item.combinedHeight && (
                <>
                  <span>
                    Висота тенту без окантовки: {item.combinedHeight} мм.
                  </span>{" "}
                  <br />
                </>
              )}
              К-сть: {item.count} шт. <br />
              Вартість: {item.price} грн <br />
              {item.discountValue > 0 && (
                <>
                  <span>Знижка: {item.discountValue} грн.</span>
                  <br />
                </>
              )}
              <b>Всього: {item.total} грн.</b>
              <br />
            </Card.Text>
            <CloseButton
              type="button"
              className="cart-item-close"
              onClick={() => remove(item.id)}
            ></CloseButton>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}

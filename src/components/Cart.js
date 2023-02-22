import React from "react";
import { Row, Col } from "react-bootstrap";
import CartItem from "./CartItem";

export default function Cart({ setup, cart, remove }) {
  const isSetup = cart.some((el) => el.isSetup);

  const getTotal = () => {
    let total = cart.reduce((acc, el) => {
      return acc + el.total;
    }, 0);

    if (isSetup) {
      total += setup.price;
    }

    return total;
  };

  return (
    <>
      <div className="cart">
        {cart.map((item, index) => (
          <Row className="mb-2" key={index}>
            <Col>
              <CartItem remove={remove} item={item} />
            </Col>
          </Row>
        ))}
        {cart.length > 0 && (
          <>
            <Row>
              {isSetup && (
                <p className="text-center">
                  Монтаж: <b>{setup.price}</b> грн.
                </p>
              )}
              <h5 className="text-center mb-3">
                Загальна вартість замовлення: <b>{getTotal()}</b> грн.
              </h5>
            </Row>
          </>
        )}
      </div>
    </>
  );
}

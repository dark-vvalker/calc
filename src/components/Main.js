import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  Alert,
  Button,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import offersApi from "../api/offers";
import useApi from "../hooks/useApi";
import { objectFlip } from "../utility/helpers";
import Cart from "./Cart";
import { COLORS, FILM_STYLES, PRICE, SOURCE_ID } from "./constants";
import Image from "./Image";
import OfferModal from "./OfferModal";
import ThankModal from "./ThankModal";

let id = 0;

export default function Main() {
  const [showToast, setToastShow] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success");

  const [cart, setCart] = useState([]);
  const [validated, setValidated] = useState(false);
  const [offerModalShow, setOfferModalShow] = useState(false);
  const [thankModalShow, setThankModalShow] = useState(false);

  const [filmStyle, setFilmStyle] = useState("transparent");
  const [height, setHeight] = useState(2000);
  const [combinedHeight, setCombinedHeight] = useState("");
  const [width, setWidth] = useState(1260);
  const [filmType, setFilmType] = useState("");
  const [count, setCount] = useState(1);
  const [color, setColor] = useState("brown");
  const [isBelt, setIsBelt] = useState(true);
  const [isSnakeRight, setIsSnakeRight] = useState(false);
  const [isSnakeLeft, setIsSnakeLeft] = useState(false);
  const [isSnakeCenter, setIsSnakeCenter] = useState(false);
  const [isSetup, setIsSetup] = useState(false);
  const [isReflux, setIsReflux] = useState(false);
  const [discount, setDiscount] = useState(0);

  const [bindingTop, setBindingTop] = useState(PRICE["fixed"]);
  const [bindingBot, setBindingBot] = useState(PRICE["pocket"]);
  const [bindingLeft, setBindingLeft] = useState(PRICE["belt"]);
  const [bindingRight, setBindingRight] = useState(PRICE["belt"]);

  const getOffersApi = useApi(offersApi.getOffers);

  useEffect(() => {
    if (!!getOffersApi.data.length) {
      setFilmType(
        getOffersApi.data.find(
          (el) =>
            el.product_id ===
            FILM_STYLES.find((el) => el.name === filmStyle).productId
        ).id
      );
    }
  }, [filmStyle, getOffersApi.data, getOffersApi.loading]);

  const addToCart = (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    e.stopPropagation();

    if (!form.checkValidity()) {
      setValidated(true);
      form.querySelector(":invalid").scrollIntoView();
      return;
    }

    let item = {};
    const edgingArea = 70; //in mm
    let siliconHeight;
    let siliconWidth;
    let siliconSquare;
    let edgingSquare;
    let price;
    let discountPrice = 0;
    let wStep = 250;
    let hStep = 250;

    if (width <= 1000) {
      wStep = 250;
    } else if (width <= 1800) {
      wStep = 300;
    } else if (width <= 2500) {
      wStep = 350;
    } else {
      wStep = 370;
    }

    if (height <= 1000) {
      hStep = 250;
    } else if (height <= 1800) {
      hStep = 300;
    } else if (height <= 2500) {
      hStep = 350;
    } else {
      hStep = 370;
    }

    switch (filmStyle) {
      case "transparent":
      case "onetone":
        siliconHeight = height - edgingArea * 2 + 60;
        siliconWidth = width - edgingArea * 2 + 60;
        siliconSquare = siliconHeight * siliconWidth;
        edgingSquare = edgingArea * 2 * (width * 2 + height * 2);

        price =
          (siliconHeight / 1000) *
            getOffersApi.data.find((el) => +el.id === +filmType).price +
          (edgingSquare / 1000000) *
            getOffersApi.data.find((el) => +el.id === +PRICE["tent"]).price;
        break;
      case "combined":
        let tentHeightWithoutEdging = combinedHeight;
        let edgingSquareWithTent =
          edgingArea * 2 * (width * 2 + height * 2) +
          height * tentHeightWithoutEdging;

        siliconHeight = height - edgingArea * 2 + 60;
        siliconWidth = width - edgingArea * 2 + 60 - tentHeightWithoutEdging;
        siliconSquare = siliconHeight * siliconWidth;

        price =
          (siliconSquare / 1000000) *
            getOffersApi.data.find((el) => +el.id === +filmType).price +
          (edgingSquareWithTent / 1000000) *
            getOffersApi.data.find((el) => +el.id === +PRICE["tent"]).price;
        break;
      default:
        break;
    }

    item.base = price;

    if (isBelt) {
      let beltsPice =
        2 * getOffersApi.data.find((el) => +el.id === +PRICE["belts"]).price;
      price += beltsPice;
      item.belts = beltsPice;
    }

    if (isSnakeLeft) {
      let snakeLeftPirce =
        (height / 1000) *
        getOffersApi.data.find((el) => +el.id === +PRICE["zip"]).price;
      price += snakeLeftPirce;
      item.snakeLeftPrice = snakeLeftPirce;
    }

    if (isSnakeRight) {
      let snakeRightPrice =
        (height / 1000) *
        getOffersApi.data.find((el) => +el.id === +PRICE["zip"]).price;
      price += snakeRightPrice;
      item.snakeRightPrice = snakeRightPrice;
    }

    if (isSnakeCenter) {
      let snakeCenterPrice =
        (height / 1000) *
        getOffersApi.data.find((el) => +el.id === +PRICE["zip"]).price;
      price += snakeCenterPrice;
      item.snakeCenterPrice = snakeCenterPrice;
    }

    if (isReflux) {
      let refluxPrice =
        (width / 1000) *
        getOffersApi.data.find((el) => +el.id === +PRICE["reflux"]).price;
      price += refluxPrice;
      item.refluxPrice = refluxPrice;
    }

    if (bindingTop) {
      let bindingTopPrice =
        Math.max(2, Math.round(width / wStep)) *
        getOffersApi.data.find((el) => +el.id === +bindingTop).price;
      price += bindingTopPrice;
      item.bindingTopPrice = bindingTopPrice;
    }

    if (bindingBot) {
      let bindingBotPrice =
        Math.max(2, Math.round(width / wStep)) *
        getOffersApi.data.find((el) => +el.id === +bindingBot).price;
      price += bindingBotPrice;
      item.bindingBotPrice = bindingBotPrice;
    }

    if (bindingLeft) {
      let bindingLeftPrice =
        Math.max(2, Math.round(height / hStep)) *
        getOffersApi.data.find((el) => +el.id === +bindingLeft).price;
      price += bindingLeftPrice;
      item.bindingLeftPrice = bindingLeftPrice;
    }

    if (bindingRight) {
      let bindingRightPrice =
        Math.max(2, Math.round(height / hStep)) *
        getOffersApi.data.find((el) => +el.id === +bindingRight).price;
      price += bindingRightPrice;
      item.bindingRightPrice = bindingRightPrice;
    }

    if (discount > 0) {
      discountPrice = Math.ceil(price * count * (discount / 100));
      item.discount = discountPrice;
    }

    let total = Math.ceil(price) * count - discountPrice;

    item = {
      id: ++id,
      style: FILM_STYLES.find((el) => el.name === filmStyle),
      film: getOffersApi.data.find((el) => +el.id === +filmType),
      width,
      height,
      combinedHeight,
      color: COLORS.find((el) => el.name === color),
      count,
      price: Math.ceil(price),
      discount,
      discountValue: discountPrice,
      total,
      isSetup,
      bTop: {
        ...getOffersApi.data.find((el) => +el.id === +bindingTop),
        quantity: Math.max(2, Math.round(width / wStep)),
      },
      bBot: {
        ...getOffersApi.data.find((el) => +el.id === +bindingBot),
        quantity: Math.max(2, Math.round(width / wStep)),
      },
      bLeft: {
        ...getOffersApi.data.find((el) => +el.id === +bindingLeft),
        quantity: Math.max(2, Math.round(height / hStep)),
      },
      bRight: {
        ...getOffersApi.data.find((el) => +el.id === +bindingRight),
        quantity: Math.max(2, Math.round(height / hStep)),
      },
      image: {
        filmStyle,
        isBelt,
        isZipLeft: isSnakeLeft,
        isZipCenter: isSnakeCenter,
        isZipRight: isSnakeRight,
        isReflux,
        bindingTop: objectFlip(PRICE)[bindingTop],
        bindingBot: objectFlip(PRICE)[bindingBot],
        bindingLeft: objectFlip(PRICE)[bindingLeft],
        bindingRight: objectFlip(PRICE)[bindingRight],
      },
    };

    setCart([...cart, item]);
    setToastVariant("success");
    setToastMessage("Товар додано до кошика!");
    setToastShow(true);
  };

  const removeFromCart = (id) => {
    const newCart = cart.filter((el) => el.id !== id);

    setCart(newCart);

    setToastVariant("success");
    setToastMessage("Товар видалено з кошика!");
    setToastShow(true);
  };

  const handleFormChange = (e) => {
    setValidated(false);
  };

  const offerSubmit = (e, formData, setValidated) => {
    const form = e.currentTarget;
    const { comment, phone, email, name } = formData;

    e.preventDefault();
    e.stopPropagation();

    if (!form.checkValidity()) {
      setValidated(true);
      form.querySelector(":invalid").focus();
      return;
    }

    let data = {
      source_id: SOURCE_ID,
      buyer_comment: comment,
      buyer: {
        full_name: name,
        phone,
        email,
      },
      products: cart.map((item) => {
        let properties = [];

        properties.push({
          name: "Колір",
          value: item.color.caption,
        });

        properties.push({
          name: "Тип",
          value: item.style.caption,
        });

        properties.push({
          name: "Плівка",
          value: item.film.properties
            .map((el) => `${el.name}: ${el.value}`)
            .join(", "),
        });

        properties.push({
          name: "Ширина",
          value: `${item.width} мм`,
        });

        properties.push({
          name: "Висота",
          value: `${item.height} мм`,
        });

        if (item.combinedHeight) {
          properties.push({
            name: "Висота тенту без окантовки",
            value: `${item.combinedHeight} мм`,
          });
        }

        properties.push({
          name: "Ремінці підвязувальні",
          value: item?.image?.isBelt ? "Yes" : "No",
        });

        properties.push({
          name: "Відлив (знизу)",
          value: item?.image?.isReflux ? "Yes" : "No",
        });

        properties.push({
          name: "Блискавка (Середина)",
          value: item?.image?.isZipCenter ? "Yes" : "No",
        });

        properties.push({
          name: "Блискавка (Зліва)",
          value: item?.image?.isZipLeft ? "Yes" : "No",
        });

        properties.push({
          name: "Блискавка (Справа)",
          value: item?.image?.isZipRight ? "Yes" : "No",
        });

        properties.push({
          name: "Кріплення (Верх)",
          value: `${item.bTop.properties
            .map((el) => `${el.name} ${el.value}`)
            .join(", ")} x ${item.bTop.quantity} шт.`,
        });

        properties.push({
          name: "Кріплення (Низ)",
          value: `${item.bBot.properties
            .map((el) => `${el.name} ${el.value}`)
            .join(", ")} x ${item.bTop.quantity} шт.`,
        });

        properties.push({
          name: "Кріплення (Зліва)",
          value: `${item.bLeft.properties
            .map((el) => `${el.name} ${el.value}`)
            .join(", ")} x ${item.bTop.quantity} шт.`,
        });

        properties.push({
          name: "Кріплення (Справа)",
          value: `${item.bRight.properties
            .map((el) => `${el.name} ${el.value}`)
            .join(", ")} x ${item.bTop.quantity} шт.`,
        });

        return {
          price: item.price,
          discount_percent: item.discount,
          discount_amount: item.discountValue,
          quantity: +item.count,
          properties,
        };
      }),
    };
    console.log(data);
    // addOrder(data);

    try {
      // addOrder(data);
      setOfferModalShow(false);
      setToastVariant("success");
      setToastMessage("Товар успішно замовлено!");
      setToastShow(true);
      setThankModalShow(true);
    } catch (error) {
      setToastVariant("danger");
      setToastMessage("Щось пішло не так! Спробуйте пізніше!");
      setToastShow(true);
    }
  };

  return (
    <Container>
      <Form
        noValidate
        validated={validated}
        onSubmit={addToCart}
        onChange={handleFormChange}
      >
        <Row className="justify-content-center mb-2">
          {FILM_STYLES.map((el, index) => (
            <Col key={el.productId} xs={6} sm={4} md={3}>
              <Form.Check className="custom-box" type="radio">
                <Form.Check.Input
                  type="radio"
                  name="film-type"
                  value={el.name}
                  id={el.name}
                  checked={filmStyle === el.name}
                  onChange={(e) => {
                    setFilmStyle(e.target.value);
                    setCombinedHeight("");
                  }}
                />
                <Form.Check.Label htmlFor={el.name} className="label-box">
                  <div className="box">
                    <div className="box-iamge">
                      <img
                        src={require(`../img/${el.name}.png`)}
                        alt={el.caption}
                      />
                    </div>
                    <span className="box-title">{el.caption}</span>
                  </div>
                </Form.Check.Label>
              </Form.Check>
            </Col>
          ))}
        </Row>
        <Row>
          <Col>
            <h2 className="text-center mb-3">
              {FILM_STYLES.find((el) => el.name === filmStyle)?.caption}
            </h2>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <Image
              filmStyle={filmStyle}
              isBelt={isBelt}
              isZipLeft={isSnakeLeft}
              isZipCenter={isSnakeCenter}
              isZipRight={isSnakeRight}
              isReflux={isReflux}
              bindingTop={objectFlip(PRICE)[bindingTop]}
              bindingBot={objectFlip(PRICE)[bindingBot]}
              bindingLeft={objectFlip(PRICE)[bindingLeft]}
              bindingRight={objectFlip(PRICE)[bindingRight]}
            />
            <Alert variant="info">
              Введіть ширину, висоту, кількість і додаткові параметри ПВХ штори,
              натисніть кнопку "Додати". <b>ВАЖЛИВО!</b> При розрахунку
              необхідно додавати 70 мм з кожного боку вікна до світлового
              прорізу для технічної окантовки.
            </Alert>
          </Col>
          <Col lg={6}>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column xl={3}>
                Висота:
              </Form.Label>
              <Col xl={9}>
                <InputGroup>
                  <Form.Control
                    onChange={(e) => setHeight(e.target.value)}
                    name="height"
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    value={height}
                    min={1}
                    required
                  />
                  <InputGroup.Text>мм</InputGroup.Text>
                </InputGroup>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column xl={3}>
                Ширина:
              </Form.Label>
              <Col xl={9}>
                <InputGroup>
                  <Form.Control
                    onChange={(e) => setWidth(e.target.value)}
                    value={width}
                    name="width"
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    min={1}
                    required
                  />
                  <InputGroup.Text>мм</InputGroup.Text>
                </InputGroup>
              </Col>
            </Form.Group>
            {filmStyle === "combined" && (
              <Form.Group as={Row} className="mb-3">
                <Form.Label column xl={3}>
                  Висота тенту без окантовки:
                </Form.Label>
                <Col xl={9}>
                  <InputGroup>
                    <Form.Control
                      onChange={(e) => setCombinedHeight(e.target.value)}
                      value={combinedHeight}
                      name="combinedHeight"
                      type="number"
                      onWheel={(e) => e.target.blur()}
                      min={1}
                      required
                    />
                    <InputGroup.Text>мм</InputGroup.Text>
                  </InputGroup>
                </Col>
              </Form.Group>
            )}
            {filmStyle !== "onetone" && (
              <Form.Group as={Row} className="mb-3">
                <Form.Label column xl={3}>
                  Вибір плівки:
                </Form.Label>
                <Col xl={9}>
                  <Form.Select
                    onChange={(e) => setFilmType(e.target.value)}
                    name="film-type"
                  >
                    {!getOffersApi.loading &&
                      getOffersApi.data
                        .filter(
                          (el) =>
                            el.product_id ===
                            FILM_STYLES.find((el) => el.name === filmStyle)
                              .productId
                        )
                        .map((el, index) => {
                          return (
                            <option key={el.id} value={el.id}>
                              {el.properties.map((el) => el.value).join(", ")}
                            </option>
                          );
                        })}
                  </Form.Select>
                </Col>
              </Form.Group>
            )}

            <Form.Group as={Row} className="mb-3">
              <Form.Label column xl={3}>
                Кіл-сть штор:
              </Form.Label>
              <Col xl={9}>
                <InputGroup>
                  <Form.Control
                    name="count"
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    placeholder="1"
                    value={count}
                    min={1}
                    onChange={(e) => setCount(e.target.value)}
                  />
                  <InputGroup.Text>шт</InputGroup.Text>
                </InputGroup>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column xl={3}>
                Колір окантовки:
              </Form.Label>
              <Col xl={9}>
                <Form.Select
                  onChange={(e) => setColor(e.target.value)}
                  name="color"
                  value={color}
                >
                  {COLORS.map((el) => (
                    <option key={el.name} value={el.name}>
                      {el.caption}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column xl={3}>
                Ремінь підв'язувальний:
              </Form.Label>
              <Col xl={9}>
                <div className="d-flex">
                  <span>Ні</span>
                  <Form.Check
                    className="mx-1 d-flex justify-content-center"
                    type="switch"
                    name="is-belt"
                    checked={isBelt}
                    onChange={(e) => setIsBelt(!isBelt)}
                  />
                  <span>Так</span>
                </div>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column xl={3}>
                Змійка:
              </Form.Label>
              <Col xl={9}>
                <Form.Check
                  type="checkbox"
                  label="Зліва"
                  name="is-snake-left"
                  checked={isSnakeLeft}
                  onChange={() => setIsSnakeLeft(!isSnakeLeft)}
                />
                <Form.Check
                  type="checkbox"
                  label="Справа"
                  name="is-snake-right"
                  checked={isSnakeRight}
                  onChange={() => setIsSnakeRight(!isSnakeRight)}
                />
                <Form.Check
                  type="checkbox"
                  label="По центру"
                  name="is-snake-center"
                  checked={isSnakeCenter}
                  onChange={() => setIsSnakeCenter(!isSnakeCenter)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column xl={3}>
                Монтаж:
              </Form.Label>
              <Col xl={9}>
                <div className="d-flex">
                  <span>Ні</span>
                  <Form.Check
                    className="mx-1 d-flex justify-content-center"
                    type="switch"
                    name="is-setup"
                    checked={isSetup}
                    onChange={() => setIsSetup(!isSetup)}
                  />
                  <span>Так</span>
                </div>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column xl={3}>
                Відлив (знизу):
              </Form.Label>
              <Col xl={9}>
                <div className="d-flex">
                  <span>Ні</span>
                  <Form.Check
                    className="mx-1 d-flex justify-content-center"
                    type="switch"
                    name="is-reflux"
                    checked={isReflux}
                    onChange={() => setIsReflux(!isReflux)}
                  />
                  <span>Так</span>
                </div>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column xl={3}>
                Ваша знижка:
              </Form.Label>
              <Col xl={9}>
                <InputGroup>
                  <Form.Control
                    name="discount"
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    placeholder="0"
                    min={0}
                    max={100}
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                  <InputGroup.Text>%</InputGroup.Text>
                </InputGroup>
              </Col>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <h5 className="mb-0">Тип кріплення штори:</h5>
            <p>(рекомендовані значення вже обрані)</p>
          </Col>
        </Row>
        <Row>
          <Col md={6} xl={3}>
            <Form.Group className="mb-3">
              <Form.Label className="d-block text-center">Верх</Form.Label>
              <Form.Select
                value={bindingTop}
                onChange={(e) => {
                  setBindingTop(e.target.value);
                }}
              >
                {getOffersApi.data
                  .filter((el) => el.product_id === 4 && el.id !== 22)
                  .map((el) => (
                    <option key={el.id} value={el.id}>
                      {el.properties.map((el) => el.value).join(",")}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6} xl={3}>
            <Form.Group className="mb-3">
              <Form.Label className="d-block text-center">Низ</Form.Label>
              <Form.Select
                value={bindingBot}
                onChange={(e) => {
                  setBindingBot(e.target.value);
                }}
              >
                {getOffersApi.data
                  .filter((el) => el.product_id === 4)
                  .map((el) => (
                    <option key={el.id} value={el.id}>
                      {el.properties.map((el) => el.value).join(",")}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6} xl={3}>
            <Form.Group className="mb-3">
              <Form.Label className="d-block text-center">Зліва</Form.Label>
              <Form.Select
                value={bindingLeft}
                onChange={(e) => {
                  setBindingLeft(e.target.value);
                }}
              >
                {getOffersApi.data
                  .filter((el) => el.product_id === 4 && el.id !== 22)
                  .map((el) => (
                    <option key={el.id} value={el.id}>
                      {el.properties.map((el) => el.value).join(",")}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6} xl={3}>
            <Form.Group className="mb-3">
              <Form.Label className="d-block text-center">Справа</Form.Label>
              <Form.Select
                value={bindingRight}
                onChange={(e) => {
                  setBindingRight(e.target.value);
                }}
              >
                {getOffersApi.data
                  .filter((el) => el.product_id === 4 && el.id !== 22)
                  .map((el) => (
                    <option key={el.id} value={el.id}>
                      {el.properties.map((el) => el.value).join(",")}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center mb-3">
          <Col md={4}>
            <Button className="w-100" variant="primary" type="submit">
              Додати до розрахунку
            </Button>
          </Col>
        </Row>
      </Form>
      <Cart
        setup={getOffersApi.data.find((el) => el.id === PRICE["setup"])}
        remove={removeFromCart}
        cart={cart}
      ></Cart>
      <OfferModal
        show={offerModalShow}
        handleClose={() => setOfferModalShow(false)}
        handleSubmit={offerSubmit}
      />
      {cart.length > 0 && (
        <Row className="justify-content-center">
          <Col md={6}>
            <Button
              onClick={() => setOfferModalShow(true)}
              className="w-100"
              type="button"
            >
              Оформити замовлення
            </Button>
          </Col>
        </Row>
      )}
      <ThankModal
        show={thankModalShow}
        handleClose={() => setThankModalShow(false)}
      />
      <ToastContainer containerPosition="fixed" position="top-end">
        <Toast
          onClose={() => setToastShow(false)}
          show={showToast}
          delay={3000}
          autohide={true}
          bg={toastVariant}
        >
          <Toast.Body className="text-white">{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
}

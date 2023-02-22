import React from "react";

export default function Image({
  filmStyle,
  isBelt,
  isZipLeft,
  isZipCenter,
  isZipRight,
  isReflux,
  bindingBot,
  bindingTop,
  bindingLeft,
  bindingRight,
  ...other
}) {
  return (
    <div className="image">
      <img
        className="image-responsive"
        src={require("../img/base.png")}
        alt={"film"}
      />
      {filmStyle === "transparent" && (
        <img
          className="image-responsive"
          src={require("../img/style-transparent.png")}
          alt="film"
        />
      )}
      {filmStyle === "combined" && (
        <img
          className="image-responsive"
          src={require("../img/style-combined.png")}
          alt="film"
        />
      )}
      {isZipLeft && (
        <img
          className="image-responsive"
          src={require("../img/zip-left.png")}
          alt="film"
        />
      )}
      {isZipRight && (
        <img
          className="image-responsive"
          src={require("../img/zip-right.png")}
          alt="film"
        />
      )}
      {isZipCenter && (
        <img
          className="image-responsive"
          src={require("../img/zip-center.png")}
          alt="film"
        />
      )}
      {bindingTop !== "fixed" && bindingTop && (
        <img
          className="image-responsive"
          src={require(`../img/${bindingTop}-top.png`)}
          alt="film"
        />
      )}
      {bindingBot !== "fixed" && bindingBot && (
        <img
          className="image-responsive"
          src={require(`../img/${bindingBot}-bot.png`)}
          alt="film"
        />
      )}
      {bindingLeft !== "fixed" && bindingLeft && (
        <img
          className="image-responsive"
          src={require(`../img/${bindingLeft}-left.png`)}
          alt="film"
        />
      )}
      {bindingRight !== "fixed" && bindingRight && (
        <img
          className="image-responsive"
          src={require(`../img/${bindingRight}-right.png`)}
          alt="film"
        />
      )}
      {isReflux && (
        <img
          className="image-responsive"
          src={require("../img/otliv.png")}
          alt="film"
        />
      )}
      {isBelt && (
        <img
          className="image-responsive"
          src={require("../img/belt.png")}
          alt="film"
        />
      )}
    </div>
  );
}

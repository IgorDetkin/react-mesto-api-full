import React, { useEffect, useState } from "react";
import responseYes from "../images/ok.svg";
import responseNo from "../images/fail.svg";

function InfoToolTip(props) {
  const className = `popup ${props.isOpen ? "popup_opened" : ""}`;

  return (
    <div className={className} onClick={props.onClose}>
      <div
        className="popup__container"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <img
          className="popup__sign-image"
          src={props.result 
            ? responseYes 
            : responseNo}
          alt="логотип"
        />
        <h2 className="popup__title-result">
          {props.result
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
        <button
          type="button"
          aria-label="exit"
          className="popup__exit"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoToolTip;




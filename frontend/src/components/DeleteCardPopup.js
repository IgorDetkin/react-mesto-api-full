import React from "react";
import { useState, useRef } from "react";
import Card from "./Card.js";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWIthForm.js";

function DeleteCardPopup(props) {
  function handleSubmit(e) {
    e.preventDefault();
    props.onDeleteCard();
  }

  return (
    <PopupWithForm
      name="deleteCard"
      title="Вы уверены?"
      buttonTitle={props.buttonTitle}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    />
  );
}

export default DeleteCardPopup;

import React from "react";

function ImagePopup(props) {
  const className = `popup popup_type_${props.name} ${
    props.isOpen ? "popup_opened" : ""
  }`;

  return (
    <div className={className} onClick={props.onClose}>
      <div
        className="popup__image-container"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <img
          className="popup__image-img"
          src={props.cardProp.card.link}
          alt={props.cardProp.card.name}
        />
        <p className="popup__image-title">{props.cardProp.card.name}</p>
        <button
          type="button"
          aria-label="exit"
          className="popup__exit popup__exit_img"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;

//после форматирования

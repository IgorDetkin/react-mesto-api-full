import React from "react";

function PopupWithForm(props) {
  const className = `popup popup_type_${props.name} ${
    props.isOpen ? "popup_opened" : ""
  }`;

  return (
    <div className={className} onClick={props.onClose}>
      <div
        className="popup__container"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <form
          name={`form${props.name}`}
          className={`popup__form popup__form${props.name}-form`}
          onSubmit={props.onSubmit}
        >
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button
            type="submit"
            aria-label="save"
            className="popup__form-submit popup__save"
          >
            {props.buttonTitle}
          </button>
        </form>
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

export default PopupWithForm;

//после форматирования

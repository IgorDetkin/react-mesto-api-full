import React from "react";
import { useState } from "react";
import Card from "./Card.js";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWIthForm.js";

function EditProfilePopup(props) {
  const [name, setName] = useState({});
  const [description, setDescription] = useState({});

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      buttonTitle={props.buttonTitle}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__form-field">
        <input
          name="name"
          id="name-input"
          type="text"
          placeholder="Ваше имя"
          value={name || ""} // если просто указать name, то консоль ругается
          onChange={handleChangeName}
          className="popup__name"
          required
          minLength="2"
          maxLength="40"
        />
        <span className="name-input-error popup__name-error"></span>
      </label>

      <label className="popup__form-field">
        <input
          name="about"
          id="about-input"
          type="text"
          placeholder="Род деятельности"
          value={description || ""} // если просто указать name, то консоль ругается
          onChange={handleChangeDescription}
          className="popup__name"
          required
          minLength="2"
          maxLength="200"
        />
        <span className="about-input-error popup__name-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;

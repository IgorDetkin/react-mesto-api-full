import React from "react";
import { useState, useRef } from "react";
import Card from "./Card.js";
import PopupWithForm from "./PopupWIthForm.js";

function EditAvatarPopup(props) {

  const avatar = useRef("");

  React.useEffect(() => {
    avatar.current.value = "";
  }, [props.isOpen]); // это чтобы форма была пустой при открытии

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatar.current.value,
    });
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      // buttonTitle={"Обновить"}
      buttonTitle={props.buttonTitle}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__form-field">
        <input
          name="avatarLink"
          id="avatar"
          type="url"
          placeholder="Ссылка на фото пользователя"
          // value={""}
          // onChange={handleChangeAvatar}
          className="popup__name popup__name_input_link"
          ref={avatar}
          required
        />
        <span className="avatar-error popup__name-error">
          Необходимо заполнить данное поле
        </span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;

import React from "react";
import { useState } from "react";
import Card from "./Card.js";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWIthForm.js";

function AddPlacePopup(props) {
  const [name, setName] = useState({});
  const [link, setLink] = useState({});


  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    console.log(e.target.value);
    setLink(e.target.value);
  }


  // для добавления возможности добавления картинки с компьютера
  // function handleUploadLink(e) {
  //   console.log(e.target.files);
  //   setLink(URL.createObjectURL(e.target.files[0]));
  // }

 

 


  


  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]); // это чтобы форма была пустой при открытии

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({ name, link });
  }

  return (
    <PopupWithForm
      name="addCard"
      title="Новое место"
      buttonTitle={props.buttonTitle}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__form-field">
        <input
          name="name"
          id="cardname"
          type="text"
          placeholder="Название"
          value={name || ""}
          onChange={handleChangeName}
          className="popup__name popup__name_input_term"
          required
          minLength="2"
          maxLength="30"
        />
        <span className="cardname-error popup__name-error">
          Необходимо заполнить данное поле
        </span>
      </label>

      <label className="popup__form-field">
        <div className="popup__link-wrapper">
          <input
            name="link"
            id="cardlink"
            type="url"
            placeholder="Ссылка на картинку"
            value={link || ""}
            onChange={handleChangeLink}
            className="popup__name popup__name_input_link"
            required
          />
          
          {/* <div className="popup__input-icon">
            <input
              name="link"
              id="cardupload"
              type={"file"}
              placeholder="Ссылка на картинку"
              value={""}
              onChange={handleUploadLink}
              className="popup__name-file popup__name_input_link"
              // required
            />
          </div> */}
        </div>


        
        <span className="cardlink-error popup__name-error">
          Необходимо заполнить данное поле
        </span> 

      </label>



      {/* <label className="popup__form-field">
        <input
          name="link"
          id="cardlink"
          type={"file"}
          placeholder="Ссылка на картинку"
          value={""}
          onChange={handleUploadLink}
          // className="popup__name popup__name_input_link"
          className="popup__name-file popup__name_input_link"
          // required
        />
      </label> */}
    </PopupWithForm>
  );
}

export default AddPlacePopup;

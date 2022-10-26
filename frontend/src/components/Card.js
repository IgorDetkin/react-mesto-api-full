import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
const isOwn = props.fullCard.owner._id === currentUser._id;
// Создаём переменную, которую после зададим в `className` для кнопки удаления
const cardDeleteButtonClassName = (
  `elements__delete ${isOwn ? 'elements__delete' : 'elements__delete_hidden'}`
); 

// Определяем, есть ли у карточки лайк, поставленный текущим пользователем
const isLiked = props.fullCard.likes.some(i => i._id === currentUser._id);
// Создаём переменную, которую после зададим в `className` для кнопки лайка
const cardLikeButtonClassName = (
  `elements__like ${isLiked ? 'elements__like_active' : 'elements__like'}`
); 

  function handleClick() {
    props.onCardClick(props.fullCard); //если поменять тут card, то нужно менять и в Main.js строку с card={data} 
  }

  function handleLikeClick() {
    props.onCardLike(props.fullCard)
}

  function handleCardDelete() {
    // props.onCardDelete(props.fullCard);
    props.onCardDeleteClick(props.fullCard)
  }

  return (
    <div className="elements__card">
      <img
        className="elements__img"
        src={props.link}
        alt={props.name}
        onClick={handleClick}
      />
      <div className="elements__border">
        <h2 className="elements__title">{props.name}</h2>
        <div className="elements__like-counter">
          <button
            type="button"
            aria-label="like"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <div className="elements__counter">{props.likes}</div>
        </div>
      </div>
      <button
        type="button"
        aria-label="delete"
        className={cardDeleteButtonClassName}
        onClick={handleCardDelete}
      ></button>
    </div>
  );
}

export default Card;

//после форматирования

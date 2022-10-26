import React from "react";
import { useState } from "react";
import Card from "./Card.js";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main(props) {
  // const [cards, setCards] = useState([]);
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <button
          className="profile__image-hover"
          onClick={props.onEditAvatar}
        ></button>
        <img className="profile__image" src={currentUser.avatar} alt="аватар" />
        <div className="profile__info">
          <div className="profile__name-edit">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              type="button"
              aria-label="edit"
              className="profile__edit"
              onClick={props.onEditProfile}
            ></button>
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button
          type="button"
          aria-label="add"
          className="profile__add"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="elements">
        {props.cards.map((data) => {
          return (
            <Card
              // card={card}
              // key={card._id}
              fullCard={data}
              key={data._id}
              name={data.name}
              link={data.link}
              likes={data.likes.length}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
              onCardDeleteClick={props.onCardDeleteClick}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;

//после форматирования

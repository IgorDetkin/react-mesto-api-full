import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect, Link, useHistory } from "react-router-dom";
import "../index.css";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import newApi from "../utils/Api.js";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/Auth.js";
import InfoToolTip from "./InfoToolTip";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  //АВТОРИЗАЦИЯ.переменные !!!!!!!
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();
  const [email, setEmail] = useState(""); // для отображения емайла в хэдере
  const [isSignYesPopupOpen, setIsSignYesPopupOpen] = useState(false);
  const [isResultRequest, setIsResultRequest] = useState(false); // для изменения содержимого попапа реакции на запрос регистрации/логина


  useEffect(() => {
    if (loggedIn) {
      //проверка чтобы запросы не выполнялись, когда пользователь не вошел
      
      newApi
        .getUserInfo()
        .then((res) => {
          setCurrentUser(res.data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      //проверка чтобы запросы не выполнялись, когда пользователь не вошел
      newApi
        .getInitialCards()
        .then((res) => {
          setCards(res.data.reverse()); //пр15
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }, [loggedIn]);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false); // остается здесь!!!!
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  const [selectedCard, setSelectedCard] = useState({ isOpen: false, card: {} });
  const handleCardClick = (photo) => {
    setSelectedCard({ isOpen: true, card: photo });
  };

  const [isLoading, setIsLoading] = useState(false);

  const [removeCard, setRemoveCard] = useState({});
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const handleDeleteCardClick = (card) => {
    setIsDeleteCardPopupOpen(!isDeleteCardPopupOpen);
    setRemoveCard(card);
  };

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id); // пр 15

    // Отправляем запрос в API и получаем обновлённые данные карточки
    newApi
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard.data : c)) // пр 15
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(event) {
    setIsLoading(true);
    newApi
      .deleteCard(removeCard._id)
      .then((res) => {
        // console.log('111')
        setCards((state) =>
          state.filter((item) => {
            return item._id !== removeCard._id;
          })
        );
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    newApi
      .editUserProfile(data)
      .then((res) => {
        setCurrentUser(res.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    newApi
      .editProfileAvatar(data)
      .then((res) => {
        setCurrentUser(res.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    newApi
      .addNewCard(data)
      .then((newCard) => {
        // console.log(newCard.data);
        setCards([newCard.data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isDeleteCardPopupOpen ||
    selectedCard.isOpen ||
    isSignYesPopupOpen;

  useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", handleEscClose);
      return () => {
        document.removeEventListener("keydown", handleEscClose);
      };
    }
  }, [isOpen]);

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false); // остается здесь!!!!
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ isOpen: false, card: {} });
    setIsDeleteCardPopupOpen(false);
    setIsSignYesPopupOpen(false);
  };

  function tokenCheck() {
    const jwt = localStorage.getItem("jwt"); //объявляем переменную в которой получаем данные
    if (jwt) {
      // если есть токен, то
      auth
        .getInfo(jwt) //сделай запрос на получение данных
        .then((res) => {
          // тогда получаем объект data, который res, в котором есть _id и email
          if (res) {
            // если есть эта data
            // console.log(res)
            setLoggedIn(true); // то тогда пропускаем пользователя
            history.push("/"); // это чтобы мы сразу попадали на главную
            setEmail(res.data.email); // это чтобы появлялся емайл в хэдере

          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    const jwt = localStorage.getItem("jwt"); //объявляем переменную в которой получаем данные
    if (jwt) {
      // если есть токен, то
      tokenCheck(jwt); //вызываем функцию с аргументом в виде токена
    }
  }, []);

  function handleRegister({ email, password }) {
    return auth
      .register({ email, password }) //из auth.js
      .then(() => {
        setIsSignYesPopupOpen(true);
        setIsResultRequest(true);
        setLoggedIn(true);
        history.push("/sign-in");
      })
      .catch((err) => {
        console.log(err);
        setIsSignYesPopupOpen(true);
        setIsResultRequest(false);
      });
  }

  function handleLogin({ email, password }) {
    return auth
      .authorize({ email, password })
      .then((res) => {
        if (res.token) {
          setLoggedIn(true);
          localStorage.setItem("jwt", res.token); //сохранение данных
          history.push("/");
          setEmail(email);
          // setCurrentUser(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsSignYesPopupOpen(true);
        setIsResultRequest(false);
      });
  }

  function handleSignOut() {
    localStorage.removeItem("jwt"); //удалить токен
    setLoggedIn(false);
    history.push("/sign-in");
    setCurrentUser({currentUser});
  }
  // console.log(cards);
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Header onClick={handleSignOut} email={email} />
          <Switch>
            <Route path="/sign-up">
              <Register onRegister={handleRegister} />
            </Route>

            <Route path="/sign-in">
              <Login onLogin={handleLogin} />
            </Route>

            <ProtectedRoute
              exact
              path="/"
              loggedIn={loggedIn}
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onClose={closeAllPopups}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
              onCardDeleteClick={handleDeleteCardClick}
            />
          </Switch>
          <Footer loggedIn={loggedIn} />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            buttonTitle={isLoading ? "Обновление..." : "Обновить"}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            buttonTitle={isLoading ? "Сохранение..." : "Сохранить"}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            buttonTitle={isLoading ? "Создание..." : "Создать"}
          />
          <DeleteCardPopup
            isOpen={isDeleteCardPopupOpen}
            onClose={closeAllPopups}
            buttonTitle={isLoading ? "Удаление..." : "Да"}
            onDeleteCard={handleCardDelete}
          />
          <ImagePopup
            name="viewImg"
            isOpen={selectedCard.isOpen}
            // isOpen = {selectedCard}
            cardProp={selectedCard}
            onClose={closeAllPopups}
          />
          <InfoToolTip
            isOpen={isSignYesPopupOpen}
            onClose={closeAllPopups}
            result={isResultRequest}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

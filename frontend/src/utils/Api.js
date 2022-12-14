class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }


  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //Загрузка информации о пользователе с сервера
  getUserInfo() {
    
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {   
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {   
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }

  editUserProfile(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {   
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._checkResponse);
  }

  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {   
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      headers: {   
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
      },
      method: "DELETE",
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, isLiked) { // тут слил два запроса в один
    if (isLiked) {
      return this.likeCard(cardId);
    } else {
      return this.deleteLikeCard(cardId);
    }
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      headers: {   
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
      },
      method: "PUT",
    }).then(this._checkResponse);
  }

  deleteLikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      headers: {   
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
      },
      method: "DELETE",
    }).then(this._checkResponse);
  }

  editProfileAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {   
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._checkResponse);
  }

  // другие методы работы с API
}


const newApi = new Api({

  // baseUrl: "https://mesto.nomoreparties.co/v1/cohort-45",
  baseUrl: "https://api.mesto.learnproject.nomoredomains.icu",
  // baseUrl: "http://localhost:3000",
  headers: {   
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    "Content-Type": "application/json",
  },
});

export default newApi;

//после форматирования

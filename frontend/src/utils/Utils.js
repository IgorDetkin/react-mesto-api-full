// ЗДЕСЬ СЛИЯНИЕ 2 ФАЙЛОВ: constants.js , data.js 



// попап редактирования  и сохранения данных профиля
export const buttonEdit = document.querySelector('.profile__edit');
// const popupEdit = document.querySelector('#popup-edit')

// const buttonExitPopup = document.querySelector('.popup__exit');
export const formElementEdit = document.querySelector('.popup__form');
export const nameInput = document.querySelector('#name-input');
export const jobInput = document.querySelector('#about-input');
export const profileName = document.querySelector('.profile__title');
export const profileJob = document.querySelector('.profile__subtitle');
// const buttonSubmitForm = document.querySelector('.popup__save');

// // // переменные для карточек
export const elementsContainer = document.querySelector('.elements');
// const elementTemplate = document.querySelector('#elements-template').content;

// // // переменные для попапа полного экрана картинкок
// const imgPopupImg = document.querySelector('.popup__image-img');
// const imgPopupName = document.querySelector('.popup__image-title');
// const imgPopup = document.querySelector('#popup-image');
// const imgExitButton = document.querySelector('.popup__exit_img')

// // переменные для попапа добавления карточек пользователем
// const popupAdd = document.querySelector('#popup-add');
export const buttonAdd = document.querySelector('.profile__add');
export const formElementAdd = document.querySelector('#formAdd');
export const nameInputAdd = document.querySelector('#cardname');
export const linkInputAdd = document.querySelector('#cardlink');
// const buttonExitPopupAdd = document.querySelector('.popup__exit_add');

export const buttonEditAvatar = document.querySelector('.profile__image-hover');
export const formElementAvatar = document.querySelector('#formAvatar');
export const linkInputAvatar = document.querySelector('#avatar');
// export default constants.js;





export const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
      // link: arhyz
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
      // link: chelyaba
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
      // link: ivanovo
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
      // link: kamchatka
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
      // link: holmogory
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
      // link: baykal
    }
  ];
  
  export const validationSetup = {
    formSelector: '.popup__form',
    inputSelector: '.popup__name',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_inactive',
    inputErrorClass: 'popup__name_type_error',
    errorClass: 'popup__name-error_active'
  };

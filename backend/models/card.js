const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },

  link: {
    type: String,
    required: true,
    // validate: [validator.isURL, 'Некорректная ссылка'],
  },

  owner: { // ссылка на модель автора карточки
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },

  likes: { // список лайкнувших пост пользователей
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'user',
    default: [],
  },

  createdAt: { // дата создания
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);

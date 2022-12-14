const Card = require('../models/card');

const ValidationError = require('../middlewares/errors/ValidationError');
const NotFoundError = require('../middlewares/errors/NotFoundError');
const NoRulesError = require('../middlewares/errors/NoRulesError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => next(err));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные при создании карточки'));
        return;
      }
      next(err);
    });
};

module.exports.deleteCardFormId = (req, res, next) => {
  Card.findById(req.params.cardId) // ищем карточку по айди
    .then((card) => {
      if (!card) { // если карточки с айди из запроса нет
        throw new NotFoundError('Карточка не найдена');
      }
      if (String(card.owner) !== req.user._id) {
        // если айди владельца карточки не совпадает с айди пользователя аккаунта
        throw new NoRulesError('Вы не можете удалить чужую карточку');
      }
      Card.findByIdAndRemove(req.params.cardId)
        .then(() => res.send({ data: card }))
        .catch((err) => next(err));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
};

module.exports.disLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
};

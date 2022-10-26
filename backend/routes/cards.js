const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getCards, createCard, deleteCardFormId, likeCard, disLikeCard } = require('../controllers/cards');

const regex = /(https?:\/\/)(www\.)?\S{2,}\.\S{2,}?/;

router.get('/', getCards);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(regex),
  }),
}), createCard);

router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
}), deleteCardFormId);

router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
}), likeCard);

router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
}), disLikeCard);

module.exports = router;

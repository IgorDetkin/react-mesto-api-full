const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUsers, getUserFromId, getUserInfo, updateProfile, updateAvatar } = require('../controllers/users');

const regex = /(https?:\/\/)(www\.)?\S{2,}\.\S{2,}?/;

router.get('/', getUsers);

router.get('/me', getUserInfo);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
}), getUserFromId);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfile);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string(), //.pattern(regex)
  }),
}), updateAvatar);

module.exports = router;

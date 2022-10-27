const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const MongoServerError = require('../middlewares/errors/MongoServerError');
const ValidationError = require('../middlewares/errors/ValidationError');
const NotFoundError = require('../middlewares/errors/NotFoundError');
const LoginError = require('../middlewares/errors/LoginError');

const { NODE_ENV, JWT_SECRET } = process.env; // пр15

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => next(err));
};

module.exports.getUserFromId = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные'));
        return;
      }

      next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create(
      { name, about, avatar, email, password: hash },
      // { runValidators: true },
    ))
    .then((user) => res.send({
      // data: user
      _id: user._id,
      email: user.email,
      name: user.name,
      about: user.about,
      avatar: user.avatar }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные'));
        return;
      }
      if (err.name === 'MongoServerError') {
        next(new MongoServerError('Пользователь с таким email уже существует'));
        return;
      }
      next(err);
    });
};

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      // if (err.name === 'CastError') {
      //   next(new ValidationError('Переданы некорректные данные'));
      //   return;
      // }
      next(err);
    });
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные при обновлении профиля'));
        return;
      }
      next(err);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные при обновлении профиля'));
        return;
      }
      next(err);
    });
};

// БЛОК НИЖЕ РАБОТАЕТ!!!!
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', { expiresIn: '7d' }); // пр15
      res.send({ token });
      // return res.send({ token });
    })
    .catch((err) => {
      if (err.name === 'Error') {
        next(new LoginError('Неверный логин или пароль'));
        return;
      }
      next(err);
    });
};

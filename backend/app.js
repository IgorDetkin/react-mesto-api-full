const path = require('path');
// require('dotenv').config({ path: path.join(__dirname, '.env') }); // ??????
require('dotenv').config({ path: path.join(__dirname, '.env') });
require('dotenv').config({ path: '/home/devopsina/.env' });
// require('dotenv').config({ path: './middlewares/.env' });
// require('dotenv').config();
const express = require('express');
// const corslibrary = require('cors');

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./middlewares/errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/Logger');
const { cors } = require('./middlewares/cors');

// console.log(process.env.NODE_ENV); // production
// console.log(process.env.JWT_SECRET);
// console.log(require('dotenv').config());

const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

const regex = /(https?:\/\/)(www\.)?\S{2,}\.\S{2,}?/;

app.use(cors);

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(regex),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});

// ssh devopsina@84.201.129.148

// pm2 kill # Полностью отключает текущий PM2 и запущенные приложения
// pm2 start app.js # Запускает приложение
// mesto.learnproject.nomoredomains.icu

// scp -r ./build/* devopsina@84.201.129.148:/home/devopsina/mesto-react

// /home/devopsina/frontendtest/react-mesto-auth/mesto-react/build

// root /home/devopsina/mesto-react;

// server {
//   listen 80;

//   server_name api.mesto.learnproject.nomoredomains.icu;

//   location / {
//             proxy_pass http://localhost:3000;
//             proxy_http_version 1.1;
//             proxy_set_header Upgrade $http_upgrade;
//             proxy_set_header Connection 'upgrade';
//             proxy_set_header Host $host;
//             proxy_cache_bypass $http_upgrade;
//   }
// }

// server {
//   listen 80;

//   server_name mesto.learnproject.nomoredomains.icu;

//   root /home/devopsina/mesto-react;

//   location / {
//   #Тут будут настройки фронта
//    }
// }

// chmod +x /home/devopsina/react-mesto-api-full/frontend/build

require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const error = require('./middlewares/error');
const router = require('./routes/routes');

const { PORT = 3000 } = process.env;

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// логгер запросов
app.use(requestLogger);

// краш-тест сервера
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// все роуты
app.use(router);

// логгер ошибок
app.use(errorLogger);

// обрабтчик ошибок для celebrate
app.use(errors());

// цетрализованная обработка ошибок
app.use(error);

// подключение к mongo и серверу
async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb');
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Connect ${PORT}`);
  });
}

main();

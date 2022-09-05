const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const NotFoundError = require('../errors/not-found-error');
const { createUser, login } = require('../controllers/users');
const { validateCreateUser, validateLogin } = require('../middlewares/validation');
const auth = require('../middlewares/auth');

/** роуты регистрации и аутентификации */
router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);

/** роуты, защищенные авторизацией */
router.use(auth);
router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;

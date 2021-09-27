import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { celebrate, errors, Joi } from 'celebrate';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';
import { login, createUser } from './controllers/users';
import auth from './middlewares/auth';

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
mongoose.connect('mongodb://localhost:27017/mestodb');

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string(),
  }),
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.use(auth);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use(errors());
app.use((err, req, res, next) => {
  let { statusCode = 500, message } = err;
  if (err.name === 'MongoServerError' && err.code === 11000) {
    message = 'Такой email уже существует';
    statusCode = 409;
  }
  if (err.name === 'ValidationError') {
    message = err.message;
    statusCode = 400;
  }
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
  next();
});

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';

const ERROR_CODE = 400;
const NOTFOUND_CODE = 404;
const DEFAULTERROR_CODE = 500;

const errorHandling = (err, res) => {
  switch (err.name) {
    case 'CastError':
    case 'ValidationError':
      res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные.', err });
      break;
    case 'ReferenceError':
      res.status(NOTFOUND_CODE).send({ message: 'Пользователь с указанным _id не найден.' });
      break;
    default:
      res.status(DEFAULTERROR_CODE).send({ message: 'Произошла ошибка' });
      break;
  }
};

export const login = (req, res) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        });
      res.send('login');
    })

    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};

export const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => errorHandling(err, res));
};

export const getUserId = (req, res) => {
  User.findById({ _id: req.params.userId })
    .then((user) => {
      if (user) {
        res.send(user);
      } else throw new ReferenceError();
    })
    .catch((err) => errorHandling(err, res));
};

export const getUserMe = (req, res) => {
  User.findById({ _id: req.user._id })
    .then((user) => {
      if (user) {
        res.send(user);
      } else throw new ReferenceError();
    })
    .catch((err) => errorHandling(err, res));
};

export const createUser = (req, res) => {
  const {
    email, password, name, about, avatar,
  } = req.body;
  if (email && password) {
    bcrypt.hash(password, 10)
      .then((hash) => {
        User.create({
          email, password: hash, name, about, avatar,
        })
          .then((user) => res.send({ data: user }))
          .catch((err) => errorHandling(err, res));
      });
  } else throw errorHandling(new mongoose.Error.ValidationError(''), res);
};

export const updateUserInfo = (req, res) => {
  const { _id } = req.user;
  const { name, about } = req.body;
  if (name && about) {
    User.findByIdAndUpdate(_id, { name, about }, { new: true })
      .then((user) => res.send(user))
      .catch((err) => errorHandling(err, res));
  } else throw errorHandling(new mongoose.Error.ValidationError(''), res);
};

export const updateUserAvatar = (req, res) => {
  const { _id } = req.user;
  const { avatar } = req.body;
  if (avatar) {
    User.findByIdAndUpdate(_id, { avatar }, { new: true })
      .then((user) => res.send(user))
      .catch((err) => errorHandling(err, res));
  } else throw errorHandling(new mongoose.Error.ValidationError(''), res);
};

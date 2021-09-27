import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import NotFoundError from '../errors/NotFoundError';
import BadRequestError from '../errors/BadRequestError';
import ConflictError from '../errors/ConflictError';

// jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTQ3ODFkMWU4MjE5MDJkZTgxYjk1MjUiLCJpYXQiOjE2MzIwNzY5MDUsImV4cCI6MTYzMjY4MTcwNX0.NioL_4AhM6AQbb8oAKgsLjvRgnFABymLoTsmqpO0Pl4; Path=/; HttpOnly; Expires=Sun, 26 Sep 2021 18:41:45 GMT;

export const login = (req, res, next) => {
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
    .catch(next);
};

export const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (!users) throw new BadRequestError('Произошла ошибка');
      res.send(users);
    })
    .catch(next);
};

export const getUserId = (req, res, next) => {
  User.findById({ _id: req.params.userId })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным _id не найден.');
      }
      res.send(user);
    })
    .catch(next);
};

export const getUserMe = (req, res, next) => {
  User.findById({ _id: req.user._id })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным _id не найден.');
      }
      res.send(user);
    })
    .catch(next);
};

export const createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;
  if (email && password) {
    bcrypt.hash(password, 10)
      .then((hash) => {
        User.create({
          email, password: hash, name, about, avatar,
        })
          .then((user) => {
            res.send({ data: user });
          })
          .catch(next);
      });
  } else throw new BadRequestError('Переданы некорректные данные.');
};

export const updateUserInfo = (req, res, next) => {
  const { _id } = req.user;
  const { name, about } = req.body;
  if (name && about) {
    User.findByIdAndUpdate(_id, { name, about }, { new: true })
      .then((user) => {
        if (!user) {
          throw new NotFoundError('Пользователь с указанным _id не найден.');
        }
        res.send(user);
      })
      .catch(next);
  } else throw new BadRequestError('Переданы некорректные данные.');
};

export const updateUserAvatar = (req, res, next) => {
  const { _id } = req.user;
  const { avatar } = req.body;
  if (avatar) {
    User.findByIdAndUpdate(_id, { avatar }, { new: true })
      .then((user) => {
        if (!user) {
          throw new NotFoundError('Пользователь с указанным _id не найден.');
        }
        res.send(user);
      })
      .catch(next);
  } else throw new BadRequestError('Переданы некорректные данные.');
};

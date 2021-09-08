import User from '../models/user';

export const getUsers = (req, res) => {
   User.find({})
      .then(users => res.send(users))
      .catch(err => res.status(404).send({ message: 'Пользователей нет' }));
};

export const getUserId = (req, res) => {
   const { _id } = req.params;

   User.findById(_id)
      .then(user => res.send(user))
      .catch(err => res.status(404).send({ message: 'Такой пользователь не найден' }));
};

export const createUser = (req, res) => {
   const { name, about, avatar } = req.body;

   User.create({ name, about, avatar })
      .then(user => res.send({ data: user }))
      .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};
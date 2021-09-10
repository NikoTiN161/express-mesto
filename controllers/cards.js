import Card from '../models/card';

const ERROR_CODE = 400;
const NOTFOUND_CODE = 404;
const DEFAULTERROR_CODE = 500;

const errorHandling = (err, res) => {
  switch (err.name) {
    case 'ValidationError':
      res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные.' });
      break;
    case 'ReferenceError':
      res.status(NOTFOUND_CODE).send({ message: 'Карточка с указанным _id не найдена.' });
      break;
    default:
      res.status(DEFAULTERROR_CODE).send({ message: 'Произошла ошибка' });
      break;
  }
};

export const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => errorHandling(err, res));
};

export const createCards = (req, res) => {
  const { _id } = req.user;
  const { name, link } = req.body;
  Card.create({ name, link, owner: _id })
    .then((card) => res.send(card))
    .catch((err) => errorHandling(err, res));
};

export const deleteCards = (req, res) => {
  Card.findByIdAndRemove({ _id: req.params.cardId })
    .then((data) => {
      if (data) {
        res.send({ message: 'Карточка удалена' });
      } else throw ReferenceError;
    })
    .catch((err) => errorHandling(err, res));
};

export const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send(card);
      } else throw new ReferenceError();
    })
    .catch((err) => errorHandling(err, res));
};

export const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send(card);
      } else throw new ReferenceError();
    })
    .catch((err) => errorHandling(err, res));
};

import { Router } from 'express';
import { getCards, createCards, deleteCards, likeCard, dislikeCard } from '../controllers/cards.js';

const cardsRouter = Router();

cardsRouter.get('/', getCards);
cardsRouter.post('/', createCards);
cardsRouter.delete('/:cardId', deleteCards);
cardsRouter.put('/:cardId/likes', likeCard);
cardsRouter.delete('/:cardId/likes', dislikeCard);

export default cardsRouter;

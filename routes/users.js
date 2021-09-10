import { Router } from 'express';
import {
  getUsers,
  getUserId,
  createUser,
  updateUserInfo,
  updateUserAvatar,
} from '../controllers/users';

const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.get('/:userId', getUserId);
usersRouter.post('/', createUser);
usersRouter.patch('/me', updateUserInfo);
usersRouter.patch('/me/avatar', updateUserAvatar);

export default usersRouter;

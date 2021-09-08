import { Router}  from 'express';
import { getUsers, getUserId, createUser } from '../controllers/users';

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/:userId', getUserId);
userRouter.post('/', createUser);

export default userRouter;
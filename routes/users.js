import { Router}  from 'express';
import { getUsers, getUserId, createUser } from '../controllers/users.js';

const userRouter = Router();

userRouter.get('/users', getUsers);
userRouter.get('/users/:userId', getUserId);
userRouter.post('/users', createUser);

export default userRouter;
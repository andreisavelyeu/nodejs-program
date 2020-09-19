import express from 'express';
import { validateSchema, schemas } from '../middlewares/validateSchema';
import {
    getUser,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    joinGroup
} from '../controllers/userController';
export const userRouter = express.Router();

userRouter.get('/users', getAllUsers);
userRouter.get('/user/:id', getUser);
userRouter.post('/user', validateSchema(schemas.userCreate), createUser);
userRouter.put('/user/:id', validateSchema(schemas.userUpdate), updateUser);
userRouter.delete('/user/:id', deleteUser);
userRouter.post('/user/joingroup', joinGroup);

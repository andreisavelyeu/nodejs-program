import express from 'express';
import { loginUser } from '../controllers/loginController';

export const loginRouter = express.Router();

loginRouter.post('/login', loginUser);

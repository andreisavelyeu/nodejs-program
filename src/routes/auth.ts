import express from 'express';
import { loginUser, revokeToken } from '../controllers/authController';

export const authRouter = express.Router();

authRouter.post('/auth/login', loginUser);
authRouter.post('/auth/revoke', revokeToken);

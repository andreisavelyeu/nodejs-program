import { logger } from '../middlewares/winston';
import { UserService } from './userService';
import { UserType } from '../types/user';
import jwt from 'jsonwebtoken';

export class AuthService {
    static async login(username: string, password: string) {
        try {
            const user = await UserService.getByLogin(username);
            if (!user || (user && (<UserType>user).password !== password)) {
                return { status: 400, message: 'Invalid credentials' };
            }
            return this.createJwt(user);
        } catch (e) {
            logger.error('error', e, {
                method: 'POST',
                name: 'AuthService.login',
                message: e.message,
                args: { username }
            });
        }
    }

    static createJwt(user) {
        try {
            const payload = {
                login: (<UserType>user).login,
                id: (<UserType>user).id
            };
            const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: +process.env.ACCESS_TOKEN_LIFE
            });
            const refreshToken = jwt.sign(
                payload,
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: +process.env.REFRESH_TOKEN_LIFE }
            );
            user.update({ refreshToken });
            user.save();
            return { status: 200, token, refreshToken, ...payload };
        } catch (e) {
            logger.error('error', e, {
                method: 'POST',
                name: 'AuthService.createJwt',
                message: e.message,
                args: { user }
            });
        }
    }

    static async revoke(username: string, refreshToken: string) {
        const user = await UserService.getByLogin(username);
        if (!user) {
            return { status: 404, message: 'User not found' };
        }
        try {
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            if (user.getDataValue('refreshToken') !== refreshToken) {
                throw new Error('You do not have permission to see this page');
            }
            return this.createJwt(user);
        } catch (e) {
            logger.error('error', e, {
                method: `POST`,
                name: 'AuthService.revoke',
                message: e.message,
                args: { user }
            });
            return {
                status: 403,
                message: 'You do not have permission to see this page'
            };
        }
    }
}

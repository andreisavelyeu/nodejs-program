import { logger } from '../middlewares/winston';
import { UserService } from './userService';
import { UserType } from '../types/user';
import jwt from 'jsonwebtoken';

export class LoginService {
    static async check(username: string, password: string) {
        try {
            const user = await UserService.getByLogin(username);

            if (!user || (user && (<UserType>user).password !== password)) {
                return { status: 400, message: 'Invalid credentials' };
            }
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
            return { status: 200, token, refreshToken, ...payload };
        } catch (e) {
            logger.error('error', e, {
                method: 'POST',
                name: 'LoginService.check',
                message: e.message,
                args: { username }
            });
        }
    }
}

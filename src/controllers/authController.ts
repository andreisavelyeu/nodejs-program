import { Response, Request } from 'express';
import { AuthService } from '../services/authService';

type ResultType = {
    message?: string;
    id?: string;
    status: number;
    token?: string;
    refreshToken?: string;
    login?: string;
};

const processResult = (res: Response, result: ResultType) => {
    if (result) {
        if (result.status === 400 || result.status === 404) {
            res.status(result.status).json(result);
        } else {
            const { refreshToken, ...rest } = result;
            res.cookie('JWT', refreshToken, {
                maxAge: +process.env.REFRESH_TOKEN_LIFE * 1000,
                httpOnly: true
            });
            res.status(result.status).json(rest);
        }
    } else {
        res.sendStatus(500);
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const result: ResultType = await AuthService.login(username, password);

    processResult(res, result);
};

export const revokeToken = async (req: Request, res: Response) => {
    const { username } = req.body;
    const token =
        req.headers.authorization &&
        req.headers.authorization.replace('Bearer ', '');
    if (!token) {
        res.status(401).json({
            message: 'You are not authorized to see this page'
        });
    }
    const result: ResultType = await AuthService.revoke(username, token);

    processResult(res, result);
};

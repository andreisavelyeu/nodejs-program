import { Response, Request } from 'express';
import { LoginService } from '../services/loginService';

type ResultType = {
    message?: string;
    id?: string;
    status: number;
    token?: string;
    refreshToken?: string;
    login?: string;
};

export const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const result: ResultType = await LoginService.check(username, password);
    if (result) {
        if (result.status === 400) {
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

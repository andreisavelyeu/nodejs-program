import { Request, Response, NextFunction } from 'express';
import { logger } from '../middlewares/winston';
import jwt from 'jsonwebtoken';

export const jwtValidator = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token =
        req.headers.authorization &&
        req.headers.authorization.replace('Bearer ', '');
    if (!token) {
        res.status(401).json({
            message: 'You are not authorized to see this page'
        });
    }
    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        next();
    } catch (e) {
        logger.error('error', e, {
            method: `${req.method}`,
            name: 'jwtValidator',
            message: e.message,
            args: { token }
        });
        res.status(403).json({
            message: 'You do not have permission to see this page'
        });
    }
};

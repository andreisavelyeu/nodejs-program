import { Request, Response } from 'express';
import { createLogger, format, transports } from 'winston';

interface HTTPError extends Error {
    status: number;
    message: string;
}

export const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.colorize(),
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    defaultMeta: { service: 'users-app' },
    transports: [new transports.Console()]
});

export const unhandledErrorMiddleware = (
    error: HTTPError,
    req: Request,
    res: Response
) => {
    const { method } = req;
    const status = error.status || 500;
    const message = error.message || 'Sorry something went wrong';
    logger.error('error', error, { method, message });
    return res.status(status).json({ status, message });
};

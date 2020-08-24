import { Response, Request, NextFunction } from 'express';
import Joi from 'joi';

export const schemas = {
    userCreate: Joi.object().keys({
        login: Joi.string().alphanum().min(3).max(30).required(),
        password: Joi.string()
            .pattern(new RegExp('^(?=.*[0-9])(?=.*[a-zA-Z])'))
            .required(),
        age: Joi.number().integer().min(4).max(130).required()
    }),
    userUpdate: Joi.object().keys({
        login: Joi.string().alphanum().min(3).max(30).optional(),
        password: Joi.string()
            .pattern(new RegExp('^(?=.*[0-9])(?=.*[a-zA-Z])'))
            .optional(),
        age: Joi.number().integer().min(4).max(130).optional()
    })
};

const errorResponse = (schemaErrors) => {
    const errors = schemaErrors.map(({ path, message }) => ({
        path,
        message
    }));
    return {
        status: 'failed',
        errors
    };
};

export const validateSchema = (schema: any) => (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const { error } = schema.validate(req.body, {
        abortEarly: false
    });

    if (error && error.isJoi) {
        res.status(400).json(errorResponse(error.details));
    } else {
        next();
    }
};

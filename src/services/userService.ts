import { Op } from 'sequelize';
import { logger } from '../middlewares/winston';
import { ParsedQs } from 'qs';
import { UserModel } from '../models/UserModel';
import { UserType } from '../types/user';

export class UserService {
    static create(user: UserType) {
        try {
            UserModel.create(user);
        } catch (e) {
            logger.error('error', e, {
                method: 'GET',
                name: 'userService.create',
                message: e.message,
                args: { user }
            });
        }
    }

    static async update(id: string, user: UserType) {
        try {
            const foundUser = await UserModel.findByPk(id);
            if (foundUser) {
                Object.entries(user).map(
                    ([key, value]) => (foundUser[key] = value)
                );
                foundUser.save();
            }
            return foundUser;
        } catch (e) {
            logger.error('error', e, {
                method: 'PUT',
                name: 'userService.update',
                message: e.message,
                args: { id, user }
            });
        }
    }

    static async delete(id: string) {
        try {
            const foundUser = await UserModel.findByPk(id);
            if (foundUser) {
                foundUser.destroy();
            }
        } catch (e) {
            logger.error('error', e, {
                method: 'DELETE',
                name: 'userService.delete',
                message: e.message,
                args: { id }
            });
        }
    }

    static getById(id: string) {
        try {
            return UserModel.findByPk(id);
        } catch (e) {
            logger.error('error', e, {
                method: 'GET',
                name: 'userService.getById',
                message: e.message,
                args: { id }
            });
        }
    }

    static getByLogin(login: string) {
        try {
            const options = {
                raw: true,
                where: {
                    login: {
                        [Op.eq]: login
                    }
                }
            };
            return UserModel.findOne(options);
        } catch (e) {
            logger.error('error', e, {
                method: 'GET',
                name: 'userService.getByLogin',
                message: e.message,
                args: { login }
            });
        }
    }

    static getAll(
        loginSubstring?: string | ParsedQs | string[] | ParsedQs[],
        limit?: number
    ) {
        const options = {
            raw: true,
            ...(limit && { limit }),
            ...(loginSubstring && {
                where: {
                    login: {
                        [Op.iLike]: `%${loginSubstring}%`
                    }
                }
            })
        };
        try {
            return UserModel.findAll(options);
        } catch (e) {
            logger.error('error', e, {
                method: 'GET',
                name: 'userService.getAll',
                message: e.message,
                args: { loginSubstring, limit }
            });
        }
    }
}

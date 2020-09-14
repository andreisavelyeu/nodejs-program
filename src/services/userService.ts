import { Op } from 'sequelize';
import { ParsedQs } from 'qs';
import { UserModel } from '../models/UserModel';
import { UserType } from '../types/user';

export class UserService {
    static create(user: UserType) {
        UserModel.create(user);
    }

    static async update(id: string, user: UserType) {
        const foundUser = await UserModel.findByPk(id);
        if (foundUser) {
            Object.entries(user).map(
                ([key, value]) => (foundUser[key] = value)
            );
            foundUser.save();
        }
        return foundUser;
    }

    static async delete(id: string) {
        const foundUser = await UserModel.findByPk(id);
        if (foundUser) {
            foundUser.destroy();
        }
    }

    static getById(id: string) {
        return UserModel.findByPk(id);
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
        return UserModel.findAll(options);
    }
}

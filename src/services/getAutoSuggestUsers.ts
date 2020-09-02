import { UserModel } from '../models/UserModel';
import { Op } from 'sequelize';
import { ParsedQs } from 'qs';

export const getAutoSuggestUsers = (
    loginSubstring: string | ParsedQs | string[] | ParsedQs[],
    limit: number
) => {
    return UserModel.findAll({
        where: {
            login: {
                [Op.iLike]: `%${loginSubstring}%`
            }
        },
        raw: true,
        limit: limit
    });
};

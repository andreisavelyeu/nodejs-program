import { GroupModel } from '../models/GroupModel';
import { sequelize } from '../models/index';
import { Model } from 'sequelize';
import { logger } from '../middlewares/winston';

export const addUsersToGroup = async (
    groupId: string,
    userIds: Array<string>
): Promise<Model> => {
    let result: Promise<Model>;
    try {
        result = await sequelize.transaction(async (t) => {
            const group = await GroupModel.findByPk(groupId, {
                transaction: t
            });
            return (
                group && (await group['setUsers'](userIds, { transaction: t }))
            );
        });
    } catch (e) {
        logger.error('error', e, {
            method: 'GET',
            name: 'addUsersToGroup',
            message: e.message,
            args: { groupId, userIds }
        });
    }
    return result;
};

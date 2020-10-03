import { GroupModel } from '../models/GroupModel';
import { sequelize } from '../models/index';
import { Model } from 'sequelize';

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
        console.error(e);
    }
    return result;
};

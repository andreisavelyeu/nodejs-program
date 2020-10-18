import { logger } from '../middlewares/winston';
import { GroupModel } from '../models/GroupModel';
import { GroupType } from '../types/group';

export class GroupService {
    static create(group: GroupType) {
        try {
            GroupModel.create(group);
        } catch (e) {
            logger.error('error', e, {
                method: 'POST',
                name: 'groupServrvice.create',
                message: e.message,
                args: { group }
            });
        }
    }

    static async update(id: string, group: GroupType) {
        try {
            const foundGroup = await GroupModel.findByPk(id);
            if (foundGroup) {
                Object.entries(group).map(
                    ([key, value]) => (foundGroup[key] = value)
                );
                foundGroup.save();
            }
            return foundGroup;
        } catch (e) {
            logger.error('error', e, {
                method: 'PUT',
                name: 'groupServrvice.update',
                message: e.message,
                args: { id, group }
            });
        }
    }

    static async delete(id: string) {
        try {
            const foundGroup = await GroupModel.findByPk(id);
            if (foundGroup) {
                foundGroup.destroy();
            }
        } catch (e) {
            logger.error('error', e, {
                method: 'DELETE',
                name: 'groupServrvice.delete',
                message: e.message,
                args: { id }
            });
        }
    }

    static async getById(id: string) {
        try {
            const group = await GroupModel.findByPk(id);
            return group;
        } catch (e) {
            logger.error('error', e, {
                method: 'GET',
                name: 'groupServrvice.getById',
                message: e.message,
                args: { id }
            });
        }
    }

    static async getAll() {
        try {
            const groups = await GroupModel.findAll();
            return groups;
        } catch (e) {
            logger.error('error', e, {
                method: 'GET',
                name: 'groupServrvice.getAll',
                message: e.message
            });
        }
    }
}

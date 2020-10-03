import { GroupModel } from '../models/GroupModel';
import { GroupType } from '../types/group';

export class GroupService {
    static create(group: GroupType) {
        GroupModel.create(group);
    }

    static async update(id: string, group: GroupType) {
        const foundGroup = await GroupModel.findByPk(id);
        if (foundGroup) {
            Object.entries(group).map(
                ([key, value]) => (foundGroup[key] = value)
            );
            foundGroup.save();
        }
        return foundGroup;
    }

    static async delete(id: string) {
        const foundGroup = await GroupModel.findByPk(id);
        if (foundGroup) {
            foundGroup.destroy();
        }
    }

    static getById(id: string) {
        return GroupModel.findByPk(id);
    }

    static getAll() {
        return GroupModel.findAll();
    }
}

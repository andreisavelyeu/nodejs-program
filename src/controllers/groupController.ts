import { Response, Request } from 'express';
import { GroupModel } from '../models/GroupModel';
import { GroupService } from '../services/groupService';

export const getAllGroups = async (req: Request, res: Response) => {
    const groups = await GroupService.getAll();
    res.json(groups);
};

export const getGroup = async (req: Request, res: Response) => {
    const group = await GroupService.getById(req.params.id);
    if (group) {
        res.json(group);
    } else {
        res.sendStatus(404);
    }
};

export const createGroup = async (req: Request, res: Response) => {
    const { body } = req;
    await GroupModel.create(body);
    res.sendStatus(201);
};

export const updateGroup = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;
    const group = await GroupService.update(id, body);
    if (group) {
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
};

export const deleteGroup = async (req: Request, res: Response) => {
    const { id } = req.params;
    await GroupService.delete(id);
    res.sendStatus(204);
};

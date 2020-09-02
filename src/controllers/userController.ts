import { Response, Request } from 'express';
import { getAutoSuggestUsers } from '../services/getAutoSuggestUsers';
import { UserModel } from '../models/UserModel';

export const getAllUsers = async (req: Request, res: Response) => {
    const { loginSubstring, limit } = req.query;
    const filteredUserList = await getAutoSuggestUsers(loginSubstring, +limit);
    res.json(filteredUserList);
};

export const getUser = async (req: Request, res: Response) => {
    const user = await UserModel.findByPk(req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.sendStatus(404);
    }
};

export const createUser = async (req: Request, res: Response) => {
    const { body } = req;
    await UserModel.create(body);
    res.sendStatus(201);
};

export const updateUser = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;
    const user = await UserModel.findByPk(id);
    if (user) {
        Object.entries(body).map(([key, value]) => (user[key] = value));
        user.save();
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await UserModel.findByPk(id);
    if (user) {
        user['isDeleted'] = true;
        user.save();
        // user.destroy();
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
};

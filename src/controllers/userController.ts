import { Response, Request } from 'express';
import { UserModel } from '../models/UserModel';
import { UserService } from '../services/userService';
import { addUsersToGroup } from '../services/addUsersToGroup';
import { UserType } from '../types/user';

export const getAllUsers = async (req: Request, res: Response) => {
    const { loginSubstring, limit } = req.query;
    const userList = await UserService.getAll(loginSubstring, +limit);
    const filteredUserList = userList.map((user) => {
        /* eslint-disable-next-line */
        const { refreshToken, ...userData } = user as UserType;
        return userData;
    });
    res.json(filteredUserList);
};

export const getUser = async (req: Request, res: Response) => {
    const user = await UserService.getById(req.params.id);
    if (user) {
        /* eslint-disable-next-line */
        const { refreshToken, ...userData } = user as UserType;
        res.json(userData);
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
    const user = await UserService.update(id, body);
    if (user) {
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    await UserService.delete(id);
    res.sendStatus(204);
};

export const joinGroup = async (req: Request, res: Response) => {
    const { userIds, groupId } = req.body;
    const result = await addUsersToGroup(groupId, userIds);
    if (result) {
        res.sendStatus(201);
    } else {
        res.sendStatus(404);
    }
};

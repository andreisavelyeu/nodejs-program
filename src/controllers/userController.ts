import { v4 as uuidv4 } from 'uuid';
import { Response, Request } from 'express';
import { getAutoSuggestUsers } from '../services/getAutoSuggestUsers';
import { userList } from '../index';

export const getAllUsers = (req: Request, res: Response): void => {
    const { loginSubstring, limit } = req.body;
    const filteredUserList = getAutoSuggestUsers(loginSubstring, limit);
    res.json(filteredUserList);
};

export const getUser = (req: Request, res: Response): void => {
    res.json(userList[req.params.id]);
};

export const createUser = (req: Request, res: Response): void => {
    const { body } = req;
    const id = uuidv4();
    const isDeleted = false;
    userList[id] = { ...body, isDeleted, id };
    res.sendStatus(201);
};

export const updateUser = (req: Request, res: Response): void => {
    const { body } = req;
    const { id } = req.params;
    userList[id] = { ...userList[id], ...body };
    res.sendStatus(204);
};

export const deleteUser = (req: Request, res: Response): void => {
    const { id } = req.params;
    userList[id] = { ...userList[id], isDeleted: true };
    res.sendStatus(204);
};

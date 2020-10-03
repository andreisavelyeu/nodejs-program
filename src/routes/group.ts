import express from 'express';
import { validateSchema, schemas } from '../middlewares/validateSchema';
import {
    getGroup,
    getAllGroups,
    createGroup,
    updateGroup,
    deleteGroup
} from '../controllers/groupController';
export const groupRouter = express.Router();

groupRouter.get('/groups', getAllGroups);
groupRouter.get('/group/:id', getGroup);
groupRouter.post('/group', validateSchema(schemas.groupCreate), createGroup);
groupRouter.put('/group/:id', validateSchema(schemas.groupUpdate), updateGroup);
groupRouter.delete('/group/:id', deleteGroup);

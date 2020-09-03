import express from 'express';
import { UserList } from './types/user';
import { userRouter } from './routes/user';

const app = express();

export const userList: UserList = {};

app.use(express.json());

app.use('/', userRouter);

app.listen(3000, () => {
    console.log('listening on port 3000');
});

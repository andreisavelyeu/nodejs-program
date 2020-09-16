import express from 'express';
import { userRouter } from './routes/user';
import { groupRouter } from './routes/group';
import { sequelize } from './models/index';
import { UserModel } from './models/UserModel';
import { GroupModel } from './models/GroupModel';

const app = express();

app.use(express.json());

app.use(userRouter);
app.use(groupRouter);

sequelize.sync({ force: true }).then(() => {
    console.log(`Database & tables created!`);

    UserModel.bulkCreate([
        { login: 'Mikalai', age: 29, password: '2d1afd2da' },
        { login: 'Mikita', age: 21, password: '312das' }
    ]);

    GroupModel.bulkCreate([
        { name: 'Football', permissions: ['READ', 'WRITE'] },
        { name: 'Group402', permissions: ['SHARE', 'READ', 'WRITE'] }
    ]);
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});

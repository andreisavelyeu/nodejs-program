import express from 'express';
import { userRouter } from './routes/user';
import { sequelize } from './models/index';
import { UserModel } from './models/UserModel';

const app = express();

app.use(express.json());

app.use('/', userRouter);

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

sequelize.sync({ force: true }).then(() => {
    console.log(`Database & tables created!`);

    UserModel.bulkCreate([
        { login: 'Mikalai', age: 29, password: '2d1afd2da' },
        { login: 'Mikita', age: 21, password: '312das' }
    ]);
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});

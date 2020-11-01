import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { config } from 'dotenv';
import { logger, unhandledErrorMiddleware } from './middlewares/winston';
import { morganConfig } from './middlewares/morgan';
import { jwtValidator } from './middlewares/jwt';
import { userRouter } from './routes/user';
import { groupRouter } from './routes/group';
import { authRouter } from './routes/auth';
import { sequelize } from './models/index';
import { UserModel } from './models/UserModel';
import { GroupModel } from './models/GroupModel';

config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(morgan(morganConfig));
app.use(authRouter);
app.use(jwtValidator);
app.use(userRouter);
app.use(groupRouter);

// 500 error middleware
app.use(unhandledErrorMiddleware);

// uncaught exception logging
process.on('uncaughtException', (error: Error) => {
    logger.error('error', error);
    process.exit(1);
});

// unhandled promise rejection logging
process.on('unhandledRejection', (error: Error) => {
    logger.error(error);
});

GroupModel.belongsToMany(UserModel, { through: 'UserGroups' });
UserModel.belongsToMany(GroupModel, { through: 'UserGroups' });

export const server = app.listen(3000, () => {
    console.log('listening on port 3000');
});

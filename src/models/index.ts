import { dbConfig } from '../config/db.config';
import { Sequelize } from 'sequelize';

const env = process.env.NODE_ENV || 'development';
const config = dbConfig[env];

export const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: 'postgres',
        logging: false
    }
);

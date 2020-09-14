import { dbConfig } from '../config/db.config';
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: 'postgres'
    }
);

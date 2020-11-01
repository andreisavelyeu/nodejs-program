import { config } from 'dotenv';

config();

export const dbConfig = {
    development: {
        HOST: process.env.DEV_DATABASE_HOST,
        USER: process.env.DEV_DATABASE_USER,
        PASSWORD: process.env.DEV_DATABASE_PASSWORD,
        DB: process.env.DEV_DATABASE_DB
    },
    test: {
        HOST: process.env.TEST_DATABASE_HOST,
        USER: process.env.TEST_DATABASE_USER,
        PASSWORD: process.env.TEST_DATABASE_PASSWORD,
        DB: process.env.TEST_DATABASE_DB
    }
};

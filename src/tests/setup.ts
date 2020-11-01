import request from 'supertest';
import { server } from '../index';
import { sequelize } from '../models/index';
import { UserModel } from '../models/UserModel';
import { GroupModel } from '../models/GroupModel';

export let supertestRequest;

beforeAll(async (done) => {
    supertestRequest = await request.agent(server);
    done();
});

afterAll(async (done) => {
    await server.close();
    await sequelize.sync({ force: true }).then(() => {
        UserModel.bulkCreate([
            { login: 'Mikalai', age: 29, password: '2d1afd2da' },
            { login: 'Mikita', age: 21, password: '312das' }
        ]);
        GroupModel.bulkCreate([
            { name: 'Football', permissions: ['READ', 'WRITE'] },
            { name: 'Group402', permissions: ['SHARE', 'READ', 'WRITE'] }
        ]);
    });
    done();
});

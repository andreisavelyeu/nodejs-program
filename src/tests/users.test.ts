import { supertestRequest } from './setup';

describe('Users test', () => {
    let token;
    let id;
    it('Should login a user', async (done) => {
        const res = await supertestRequest.post('/auth/login').send({
            username: 'Mikita',
            password: '312das'
        });
        id = res.body.id;
        token = res.body.token;
        expect(res.statusCode).toEqual(200);
        done();
    });

    it('Should return unauthorized error message', async (done) => {
        const res = await supertestRequest.get('/users');
        expect(res.body.message).toBe(
            'You are not authorized to see this page'
        );
        done();
    });

    it('Should return list of users', async (done) => {
        const res = await supertestRequest
            .get('/users')
            .set('Authorization', token);
        const usernames = res.body.map((item) => item.login);
        expect(res.body.length).toBe(2);
        expect(usernames).toEqual(
            expect.arrayContaining(['Mikita', 'Mikalai'])
        );
        done();
    });

    it('Should update user name', async (done) => {
        await supertestRequest
            .put(`/user/${id}`)
            .send({ login: 'Nikolay' })
            .set('Authorization', token);
        const user = await supertestRequest
            .get(`/users?loginSubstring=Nikolay`)
            .set('Authorization', token);
        const updatedUserId = user.body[0].id;
        const updatedName = user.body[0].login;
        expect(updatedUserId).toBe(id);
        expect(updatedName).toBe('Nikolay');
        done();
    });

    it('Should should fail on validation of the age of the new user', async (done) => {
        const newUser = {
            login: 'Mik32e',
            password: 'sadasd123fdas',
            age: 2
        };
        const res = await supertestRequest
            .post(`/user`)
            .send(newUser)
            .set('Authorization', token);
        const errorMessage = res.body.errors[0].message;
        expect(res.body.status).toBe('failed');
        expect(errorMessage).toBe('"age" must be greater than or equal to 4');
        done();
    });

    it('Should should create a new user', async (done) => {
        const newUser = {
            login: 'Mik32e',
            password: 'sadasd123fdas',
            age: 4
        };
        const res = await supertestRequest
            .post(`/user`)
            .send(newUser)
            .set('Authorization', token);
        const user = await supertestRequest
            .get(`/users?loginSubstring=Mik32e`)
            .set('Authorization', token);
        expect(res.statusCode).toBe(201);
        expect(user.body.length).toBe(1);
        expect(user.body[0].login).toBe('Mik32e');
        done();
    });

    it('Should delete user', async (done) => {
        const res = await supertestRequest
            .delete(`/user/${id}`)
            .set('Authorization', token);
        const user = await supertestRequest
            .get(`/users?loginSubstring=Nikolay`)
            .set('Authorization', token);
        expect(res.statusCode).toBe(204);
        expect(user.body).toEqual([]);
        done();
    });
});

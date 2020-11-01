import { supertestRequest } from './setup';

describe('Groups test', () => {
    let token;
    let groupId;

    it('Should login a user', async (done) => {
        const res = await supertestRequest.post('/auth/login').send({
            username: 'Mikalai',
            password: '2d1afd2da'
        });
        token = res.body.token;
        expect(res.statusCode).toEqual(200);
        done();
    });

    it('Should return list of groups', async (done) => {
        const res = await supertestRequest
            .get('/groups')
            .set('Authorization', token);
        const groups = res.body.map((item) => item.name);
        groupId = res.body[0].id;
        expect(res.body.length).toBe(2);
        expect(groups).toEqual(
            expect.arrayContaining(['Football', 'Group402'])
        );
        done();
    });

    it('Should update group permissions', async (done) => {
        const newPermissions = [
            'READ',
            'WRITE',
            'DELETE',
            'SHARE',
            'UPLOAD_FILES'
        ];
        await supertestRequest
            .put(`/group/${groupId}`)
            .send({ permissions: newPermissions })
            .set('Authorization', token);
        const group = await supertestRequest
            .get(`/group/${groupId}`)
            .set('Authorization', token);
        const updatedPermissions = group.body.permissions;
        expect(updatedPermissions).toEqual(updatedPermissions);
        done();
    });

    it('Should should create a group', async (done) => {
        const newGroup = {
            name: 'Craft',
            permissions: ['READ']
        };
        const res = await supertestRequest
            .post(`/group`)
            .send(newGroup)
            .set('Authorization', token);
        const groups = await supertestRequest
            .get(`/groups`)
            .set('Authorization', token);
        const craftGroup = groups.body.filter(
            (group) => group.name === 'Craft'
        )[0];
        expect(res.statusCode).toBe(201);
        expect(groups.body.length).toBe(3);
        expect(craftGroup.name).toBe(newGroup.name);
        expect(craftGroup.permissions).toEqual(newGroup.permissions);
        done();
    });

    it('Should delete a group', async (done) => {
        const res = await supertestRequest
            .delete(`/group/${groupId}`)
            .set('Authorization', token);
        const groups = await supertestRequest
            .get(`/groups`)
            .set('Authorization', token);
        const deletedGroup = groups.body.filter(
            (group) => group.id === groupId
        );
        expect(res.statusCode).toBe(204);
        expect(groups.body.length).toEqual(2);
        expect(deletedGroup).toEqual([]);
        done();
    });
});

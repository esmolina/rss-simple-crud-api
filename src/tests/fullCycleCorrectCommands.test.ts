import { describe } from 'node:test';
import request from 'supertest';
import { server } from '../index';

describe('The full cycle of correct commands works correctly', () => {
  afterAll(() => {
    server.close();
  });

  test('Should get empty users array', async () => {
    const response = await request(server).get('/api/users').expect(200, []);
  });

  test('Should create new user', async () => {
    const newUser = {
      username: 'Ivan',
      age: 18,
      hobbies: ['IT', 'gaming'],
    };
    const response = await request(server).post('/api/users').send(newUser).expect(201);

    expect(response.body).toMatchObject(newUser);
    expect(response.body).toHaveProperty('id');
  });

  test('Should get created user', async () => {
    const newUser = {
      username: 'Ivan',
      age: 18,
      hobbies: ['IT', 'gaming'],
    };

    const createNewUserResponse = await request(server)
      .post('/api/users')
      .send(newUser)
      .expect(201);

    const createdUserId = createNewUserResponse.body.id;

    const getCreatedUserResponse = await request(server)
      .get(`/api/users/${createdUserId}`)
      .expect(200);

    expect(getCreatedUserResponse.body).toMatchObject(newUser);
    expect(getCreatedUserResponse.body).toHaveProperty('id', createdUserId);
  });

  test('Should update created user', async () => {
    const newUser = {
      username: 'Ivan',
      age: 18,
      hobbies: ['IT', 'gaming'],
    };

    const createNewUserResponse = await request(server)
      .post('/api/users')
      .send(newUser)
      .expect(201);

    const createdUserId = createNewUserResponse.body.id;

    const updatedUser = {
      username: 'Jane Smith',
      age: 30,
      hobbies: ['coding', 'painting'],
    };

    const updateResponse = await request(server)
      .put(`/api/users/${createdUserId}`)
      .send(updatedUser)
      .expect(200);

    expect(updateResponse.body).toMatchObject(updatedUser);
    expect(updateResponse.body).toHaveProperty('id', createdUserId);
  });

  test('Should delete created user', async () => {
    const newUser = {
      username: 'Ivan',
      age: 18,
      hobbies: ['IT', 'gaming'],
    };

    const createNewUserResponse = await request(server)
      .post('/api/users')
      .send(newUser)
      .expect(201);

    const createdUserId = createNewUserResponse.body.id;
    const deleteResponse = await request(server).delete(`/api/users/${createdUserId}`).expect(204);
  });

  test('Should get deleted user', async () => {
    const newUser = {
      username: 'Ivan',
      age: 18,
      hobbies: ['IT', 'gaming'],
    };

    const createNewUserResponse = await request(server)
      .post('/api/users')
      .send(newUser)
      .expect(201);

    const createdUserId = createNewUserResponse.body.id;
    const deleteResponse = await request(server).delete(`/api/users/${createdUserId}`).expect(204);
    const deletedUserResponse = await request(server)
      .get(`/api/users/${createdUserId}`)
      .expect(404);
  });
});

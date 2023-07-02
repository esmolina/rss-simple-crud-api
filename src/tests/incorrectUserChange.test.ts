import { describe } from 'node:test';
import request from 'supertest';
import { server } from '../index';

describe('The correct response to an attempt to incorrect user change', () => {
  afterAll(() => {
    server.close();
  });

  test('Must respond to an invalid name update (not a string)', async () => {
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
      username: 111,
    };

    const updateResponse = await request(server)
      .put(`/api/users/${createdUserId}`)
      .send(updatedUser)
      .expect(418);

    expect(updateResponse.text).toEqual(
      'Invalid request body: fields contain data of an incorrect type.The server refuses the attempt to brew coffee with a teapot.',
    );
  });

  test('Must respond to an invalid age update (not a number)', async () => {
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
      age: 'IT',
    };

    const updateResponse = await request(server)
      .put(`/api/users/${createdUserId}`)
      .send(updatedUser)
      .expect(418);

    expect(updateResponse.text).toEqual(
      'Invalid request body: fields contain data of an incorrect type.The server refuses the attempt to brew coffee with a teapot.',
    );
  });

  test('Must respond to an invalid hobbies update (not an array)', async () => {
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
      hobbies: 'IT',
    };

    const updateResponse = await request(server)
      .put(`/api/users/${createdUserId}`)
      .send(updatedUser)
      .expect(418);

    expect(updateResponse.text).toEqual(
      'Invalid request body: fields contain data of an incorrect type.The server refuses the attempt to brew coffee with a teapot.',
    );
  });

  test('Must respond to an invalid JSON', async () => {
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

    const updatedUser = 'new user';

    const updateResponse = await request(server)
      .put(`/api/users/${createdUserId}`)
      .send(updatedUser)
      .expect(400);

    expect(updateResponse.text).toEqual(
      'Invalid request body: Only JSON content type is supported',
    );
  });
});

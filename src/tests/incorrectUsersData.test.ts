import { describe } from 'node:test';
import request from 'supertest';
import { server } from '../index';

describe('The correct response to an attempt to send invalid data to the user', () => {
  afterAll(() => {
    server.close();
  });

  test('Must respond to an invalid name (not a string)', async () => {
    const newUser = {
      username: 123,
      age: 18,
      hobbies: ['IT', 'gaming'],
    };
    const response = await request(server).post('/api/users').send(newUser).expect(400);

    expect(response.text).toEqual(
      'Invalid request body: body does not contain required fields, or the fields contain data of an incorrect type',
    );
  });

  test('Must respond to an invalid age (not a number)', async () => {
    const newUser = {
      username: 'Ivan',
      age: 'Ivan',
      hobbies: ['IT', 'gaming'],
    };
    const response = await request(server).post('/api/users').send(newUser).expect(400);

    expect(response.text).toEqual(
      'Invalid request body: body does not contain required fields, or the fields contain data of an incorrect type',
    );
  });

  test('Must respond to an invalid hobbies (not a strings)', async () => {
    const newUser = {
      username: 'Ivan',
      age: 18,
      hobbies: [1, 2],
    };
    const response = await request(server).post('/api/users').send(newUser).expect(400);

    expect(response.text).toEqual(
      'Invalid request body: body does not contain required fields, or the fields contain data of an incorrect type',
    );
  });

  test('Must respond to an invalid data (no name)', async () => {
    const newUser = {
      age: 18,
      hobbies: ['IT', 'gaming'],
    };
    const response = await request(server).post('/api/users').send(newUser).expect(400);

    expect(response.text).toEqual(
      'Invalid request body: body does not contain required fields, or the fields contain data of an incorrect type',
    );
  });

  test('Must respond to an invalid data (no age)', async () => {
    const newUser = {
      username: 'Ivan',
      hobbies: ['IT', 'gaming'],
    };
    const response = await request(server).post('/api/users').send(newUser).expect(400);

    expect(response.text).toEqual(
      'Invalid request body: body does not contain required fields, or the fields contain data of an incorrect type',
    );
  });

  test('Must respond to an invalid data (no hobbies)', async () => {
    const newUser = {
      username: 'Ivan',
      age: 18,
    };
    const response = await request(server).post('/api/users').send(newUser).expect(400);

    expect(response.text).toEqual(
      'Invalid request body: body does not contain required fields, or the fields contain data of an incorrect type',
    );
  });

  test('Must respond to an invalid data (is not object)', async () => {
    const newUser = 'new user';
    const response = await request(server).post('/api/users').send(newUser).expect(400);

    expect(response.text).toEqual('Invalid request body: Only JSON content type is supported');
  });
});

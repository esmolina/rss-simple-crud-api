import { v4 as uuid } from 'uuid';
import { UserInterface } from '../types/User';
import { RequestHandlerType } from '../types/serverHandlersTypes';
import { isCorrectTypeOfHobbies } from '../helpers/isCorrectTypeOfHobbies';
import { users } from '../index';

export const createUser: RequestHandlerType = (request, response) => {
  let body = '';
  request.on('data', (chunk) => {
    body += chunk;
  });

  request.on('end', () => {
    try {
      const contentType = request.headers['content-type'];
      if (!contentType || !contentType.includes('application/json')) {
        response.statusCode = 400;
        response.setHeader('Content-Type', 'text/plain');
        response.end('Invalid request body: Only JSON content type is supported');
        return;
      }

      const createdUserBody = JSON.parse(body);

      if (
        !createdUserBody.username ||
        !createdUserBody.age ||
        !createdUserBody.hobbies ||
        typeof createdUserBody.username !== 'string' ||
        typeof createdUserBody.age !== 'number' ||
        !Array.isArray(createdUserBody.hobbies) ||
        !isCorrectTypeOfHobbies(createdUserBody.hobbies)
      ) {
        response.statusCode = 400;
        response.setHeader('Content-Type', 'text/plain');
        response.end(
          'Invalid request body: body does not contain required fields, or the fields contain data of an incorrect type',
        );
        return;
      }

      const newUser: UserInterface = {
        id: uuid(),
        username: createdUserBody.username,
        age: createdUserBody.age,
        hobbies: createdUserBody.hobbies,
      };

      users.push(newUser);

      response.statusCode = 201;
      response.setHeader('Content-Type', 'application/json');
      response.end(JSON.stringify(newUser));
    } catch (error) {
      response.statusCode = 405;
      response.setHeader('Content-Type', 'text/plain');
      response.end('Invalid request body');
    }
  });
};

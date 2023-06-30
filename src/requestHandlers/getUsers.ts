import { RequestHandlerType } from '../types/serverHandlersTypes.js';
import { users } from '../index.js';

export const getUsers: RequestHandlerType = (request, response) => {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify(users));
};

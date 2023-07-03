import { RequestByIdHandlerType } from '../types/serverHandlersTypes';
import { users } from '../index';

export const getUser: RequestByIdHandlerType = (request, response, userId) => {
  const user = users.find((user) => user.id === userId);

  if (user) {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(user));
  } else {
    response.statusCode = 404;
    response.setHeader('Content-Type', 'text/plain');
    response.end(`User with ID = '${userId}' does not exist`);
  }
};

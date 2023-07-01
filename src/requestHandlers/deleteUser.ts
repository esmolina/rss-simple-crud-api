import { RequestByIdHandlerType } from '../types/serverHandlersTypes.js';
import { users } from '../index.js';

export const deleteUser: RequestByIdHandlerType = (request, response, userId) => {
  const user = users.find((user) => user.id === userId);

  if (user) {
    const userIndex = users.findIndex((user) => user.id === userId);
    users.splice(userIndex, 1);
    response.statusCode = 204;
    response.end(`User with ID = '${userId}' was deleted`);
  } else {
    response.statusCode = 404;
    response.setHeader('Content-Type', 'text/plain');
    response.end(`User with ID = '${userId}' does not exist`);
  }
};

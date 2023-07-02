import { AllUsersRequestHandlerType } from '../types/serverHandlersTypes';
import { getUsers } from '../requestHandlers/getUsers';
import { createUser } from '../requestHandlers/createUser';

export const processingAllUsersRequest: AllUsersRequestHandlerType = (
  method,
  request,
  response,
) => {
  switch (method) {
    case 'GET':
      getUsers(request, response);
      break;
    case 'POST':
      createUser(request, response);
      break;
    default:
      response.statusCode = 405;
      response.setHeader('Content-Type', 'text/plain');
      response.end('Unused method');
      break;
  }
};

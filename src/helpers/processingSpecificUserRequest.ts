import { SpecificUserRequestHandlerType } from '../types/serverHandlersTypes.js';
import { getUser } from '../requestHandlers/getUser.js';
import { updateUser } from '../requestHandlers/updateUser.js';
import { deleteUser } from '../requestHandlers/deleteUser.js';
import { validateIdByUuid } from './validateIdByUuid.js';

export const processingSpecificUserRequest: SpecificUserRequestHandlerType = (
  method,
  url,
  request,
  response,
) => {
  const userId = url.split('/').pop();

  if (!userId) {
    response.statusCode = 400;
    response.setHeader('Content-Type', 'text/plain');
    response.end(`Something went wrong. I can't get the user id`);
  } else if (!validateIdByUuid(userId)) {
    response.statusCode = 400;
    response.setHeader('Content-Type', 'text/plain');
    response.end('Invalid id.\n' + 'The ID must be in the uuid format');
  } else {
    switch (method) {
      case 'GET':
        getUser(request, response, userId);
        break;
      case 'PUT':
        updateUser(request, response, userId);
        break;
      case 'DELETE':
        deleteUser(request, response, userId);
        break;
      default:
        response.statusCode = 405;
        response.setHeader('Content-Type', 'text/plain');
        response.end('Unused method');
        break;
    }
  }
};

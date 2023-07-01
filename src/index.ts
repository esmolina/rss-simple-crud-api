import { env } from 'process';
import { createServer, Server, IncomingMessage, ServerResponse } from 'http';
import { processingAllUsersRequest } from './helpers/processingAllUsersRequest.js';
import { processingSpecificUserRequest } from './helpers/processingSpecificUserRequest.js';
import { UserInterface } from './types/User';

const envPort = env.PORT;
const port = envPort ? parseInt(envPort, 10) : 3000;
const host = '127.0.0.1';
export const users: Array<UserInterface> = [];

const server = createServer((request: IncomingMessage, response: ServerResponse) => {
  const { url, method } = request;

  if (url === '/api/users' && method) {
    processingAllUsersRequest(method, request, response);
  } else if (url && url.startsWith('/api/users/') && method) {
    const segments = url.split('/');

    if (segments.length > 4) {
      response.statusCode = 404;
      response.setHeader('Content-Type', 'text/plain');
      response.end('You are sending a request to a non-existent resource');
      return;
    }

    processingSpecificUserRequest(method, url, request, response);
  } else if (url === '/') {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');
    response.end(
      '<h1 style="color: darkgreen; font-size: 30px;">Hello, simple CRUD-API is running!</h1>',
    );
  } else {
    response.statusCode = 404;
    response.setHeader('Content-Type', 'text/plain');
    response.end('You are sending a request to a non-existent resource');
  }
});

server.listen(port, () => {
  console.log(`Server running at http://${host}:${port}`);
});

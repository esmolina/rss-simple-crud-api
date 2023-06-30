import { IncomingMessage, ServerResponse } from 'http';

export type RequestHandlerType = (request: IncomingMessage, response: ServerResponse) => void;

export type AllUsersRequestHandlerType = (
  method: string,
  request: IncomingMessage,
  response: ServerResponse,
) => void;

export type SpecificUserRequestHandlerType = (
  method: string,
  url: string,
  request: IncomingMessage,
  response: ServerResponse,
) => void;

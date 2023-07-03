# Assignment: rss-simple-crud-api

## Installation

1) Clone this repo: [esmolina-rss-simple-crud-api-repo](https://github.com/esmolina/rss-simple-crud-api);
2) Switch to a branch 'develop';
3) Install dependencies
```bash
npm install
```

## Checking the functionality
### Server operations
1) Start the server `npm run start:dev` for check development mode
2) After start server open Postman, send requests
- GET (http://localhost:3000/api/users) to get an array of users;
- GET (http://localhost:3000/incorrect_url) to get response to an incorrect request;
- POST (http://localhost:3000/api/users) to create new user with body in JSON like
```
  {
  "username": "Ivan",
  "age": 18,
  "hobbies": ["reading"]
  }
```
- POST - try sending invalid data
- copy id of created user;
- PUT (http://localhost:3000/api/users/{createdUserId}) to change user with body in JSON like
```
  {
  "username": "Petr",
  "age": 21,
  "hobbies": ["IT", "gaming]
  }
```
or
```
  {
  "hobbies": ["IT", "gaming]
  }
```
- PUT try sending invalid data;
- DELETE (http://localhost:3000/api/users/{createdUserId}) to delete created user;

### Production mode
Command `npm run start:prod` will start the build (production mode). 
Terminate process and after this you will see the dist folder in the root directory.

### Testing
Command `npm run test` run tests;

### [Technical requirements](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md)
### [Cross-check criteria](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/score.md)

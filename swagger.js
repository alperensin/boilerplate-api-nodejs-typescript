const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    version: '1.0.0',
    title: 'REST API',
    description: 'API documentation example with swagger',
  },
  host: 'localhost:3000',
  basePath: '/',
  schemes: [
    'http',
    'https'
  ],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'auth/v1/authenticate',
    },
    {
      name: 'auth/v1/users',
    },
  ],
  securityDefinitions: {
    apiKeyAuth: {
      type: 'apiKey',
      in: 'header', // 'header', 'query' or 'cookie'
      name: 'authorization', // name of the header, query parameter or cookie
      description: 'Bearer token...'
    }
  },
  definitions: {
    AuthenticateUser: {
      email: 'example@email.com',
      password: '*P4ssw0rd!'
    },
    AuthenticatedUserResponse: {
      id: 'db1c8865-7196-4d03-9f13-bf97057f874b',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRiMWM4ODY1LTcxOTYtNGQwMy05ZjEzLWJmOTcwNTdmODc0YiIsImVtYWlsIjoiYW5kcmVsdWl6cGVyZW5zaW5AZ21haWwuY29tIiwiaWF0IjoxNjQxODQ0ODAxLCJleHAiOjE2NDE5MzEyMDF9.vMwca4AOxFVpk9bIpY_H6K6HUg5oZG2itUcAVEBN4TQ'
    },
    CreateUser: {
      email: 'example@email.com',
      password: '*P4ssw0rd!'
    },
    CreatedUserResponse: {
      id: 'db1c8865-7196-4d03-9f13-bf97057f874b',
    }
  },
  components: {}
};

const outputFile = './swagger.json';
const endpointsFiles = ['./src/routes/index.ts'];

swaggerAutogen(outputFile, endpointsFiles, doc);
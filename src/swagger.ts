import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User API',
      version: '1.0.0',
      description: 'API documentation for the Package Analyzer service',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      schemas: {
        Package: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            time: {
              type: 'object',
              additionalProperties: { type: 'string' },
            },
            maintainers: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  email: { type: 'string' },
                },
                required: ['name', 'email'],
              },
            },
            readme: { type: 'string' },
            repository: {
              type: 'object',
              properties: {
                type: { type: 'string' },
                url: { type: 'string' },
              },
            },
            bugs: {
              type: 'object',
              properties: {
                url: { type: 'string' },
              },
            },
          },
          required: ['name', 'time', 'maintainers', 'readme'],
        },
      },
    },
  },
    apis: ['./src/routes/*.ts'],

};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

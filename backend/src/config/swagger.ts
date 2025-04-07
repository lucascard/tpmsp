import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gerenciamento de Planos de Teste',
      version: '1.0.0',
      description: 'API para gerenciar planos de teste, suites e casos de teste',
      contact: {
        name: 'Equipe de Desenvolvimento',
        email: 'dev@tpmsp.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Servidor de Desenvolvimento'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: [
    './src/routes/*.ts',
    './src/models/*.ts'
  ]
};

export const swaggerSpec = swaggerJsdoc(options); 
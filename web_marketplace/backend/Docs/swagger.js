const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Backendless API',
      version: '1.0.0',
      description: 'API documentation for my Express application',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 8080}`, 
        description: 'Development server'
      },
    ],
  },
  // Point to the files where your @openapi comments live.
  // Adjust this path if your auth.js is not inside a 'routes' folder!
  apis: ['./routes/*.js'], 
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app, port) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  console.log(`Docs available at http://localhost:${port}/api-docs`);
};

module.exports = setupSwagger;
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Osun Hospitals API',
      version: '1.0.0',
      description: 'API for Osun Hospitals mapping project',
    },
    servers: [
      {
        url: 'https://osunhospitals.onrender.com/api/v1',
        description: 'Production server',
      },
    ],
  },
  apis: ['./routes/hospitalRoutes.js', './hospitalDocs.js'],

  components: {
    schemas: {
      Hospital: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            description: 'The auto-generated id of the hospital',
          },
          name: {
            type: 'string',
            description: 'The name of the hospital',
          },
          operatingHours: {
            type: 'string',
            description: 'The operating hours of the hospital',
          },
          location: {
            type: 'object',
            properties: {
              type: {
                type: 'string',
                enum: ['Point'],
                description: 'The type of the geolocation point',
              },
              coordinates: {
                type: 'array',
                items: {
                  type: 'number',
                },
                description:
                  'The coordinates [longitude, latitude] of the hospital',
              },
              address: {
                type: 'string',
                description: 'The address of the hospital',
              },
              lga: {
                type: 'string',
                description: 'The Local Government Area of the hospital',
              },
            },
          },
          phone: {
            type: 'string',
            description: 'The contact phone number of the hospital',
          },
        },
      },
    },
  },
};

module.exports = swaggerJsdoc(options);

import * as Joi from 'joi';

export const validationSchema = Joi.object({
  PORT: Joi.number().default(3000),
  MONGO_URI: Joi.string().default('mongodb://localhost:27017'),
  KEYCLOAK_URI: Joi.string().default('localhost:8080/auth'),
  KEYCLOAK_REALM: Joi.string().default('master'),
  KEYCLOAK_CLIENT_ID: Joi.string().default('my-client'),
  KEYCLOAK_SECRET: Joi.string().default('secret'),
});

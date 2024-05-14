// environment variable configuration

import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  //products microservice
  PORT: number;

  //  Database Url
  DATABASE_URL: string;

  // Type of database
  TYPE_OF_DATABASE: string;
  TYPE_OF_ORM: string;

  // NATS Servers
  NATS_SERVERS: string[];
}

// validation by scheme using joi
const envsSchema = joi
  .object({
    PORT: joi.number().required(),

    DATABASE_URL: joi.string().required(),

    TYPE_OF_DATABASE: joi.string().required(),
    TYPE_OF_ORM: joi.string().required(),

    NATS_SERVERS: joi.array().items(joi.string()).required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS?.split(','),
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,

  databaseUrl: envVars.DATABASE_URL,

  typeOfDatabase: envVars.TYPE_OF_DATABASE,
  typeOfOrm: envVars.TYPE_OF_ORM,

  natsServers: envVars.NATS_SERVERS,
};

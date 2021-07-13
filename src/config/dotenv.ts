import 'dotenv/config';

const getValue = (key: string): string => {
  const value = process.env[key];

  if (value === undefined) {
    const errMessage = `${key} enviroment must be defined`;

    throw new Error(errMessage);
  }

  return value;
};

export const PORT = getValue('PORT');

export const DATABASE = {
  HOST: getValue('DATABASE_HOST'),
  DBPORT: Number(getValue('DATABASE_PORT')),
  USERNAME: getValue('DATABASE_USERNAME'),
  PASSWORD: getValue('DATABASE_PASSWORD'),
  DATABASENAME: getValue('DATABASE_DATABASE_NAME'),
};

export const JWT = {
  SECRET: getValue('JWT_SECRET'),
};

export const ENDPOINT = {
  DAUTH: getValue('DAUTH_ENDPOINT'),
  OPENAPI: getValue('OPENAPI_ENDPOINT'),
  SERVER: getValue('SERVER_ENDPOINT'),
};

export const CLIENT = {
  ID: getValue('CLINET_ID'),
  SECRET: getValue('CLIENT_SECRET'),
}

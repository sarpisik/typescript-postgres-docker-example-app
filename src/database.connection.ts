import 'reflect-metadata';
import { ConnectionOptions } from 'typeorm';

const connectionOpts: ConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'test',
  synchronize: true,
  logging: false,
  entities: [`${__dirname}/entity/*.ts`],
  migrations: [`${__dirname}/migration/**/*.ts`],
  subscribers: [`${__dirname}/subscriber/**/*.ts`],
  cli: {
    entitiesDir: `${__dirname}/entity`,
    migrationsDir: `${__dirname}/migration`,
    subscribersDir: `${__dirname}/subscriber`
  }
};

export default connectionOpts;

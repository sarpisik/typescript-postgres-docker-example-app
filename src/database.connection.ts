import 'reflect-metadata';
import { ConnectionOptions } from 'typeorm';

const connectionOpts: ConnectionOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: true,
  synchronize: true,
  logging: false,
  entities: [`${__dirname}/entity/*.ts`],
  migrations: [`${__dirname}/migration/**/*.ts`],
  subscribers: [`${__dirname}/subscriber/**/*.ts`],
  cli: {
    entitiesDir: `${__dirname}/entity`,
    migrationsDir: `${__dirname}/migration`,
    subscribersDir: `${__dirname}/subscriber`,
  },
};

export default connectionOpts;

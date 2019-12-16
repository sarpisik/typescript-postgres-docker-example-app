import 'reflect-metadata';
import { ConnectionOptions } from 'typeorm';
import { Movie } from './entity/Movie';
import { Comment } from './entity/Comment';

const connectionOpts: ConnectionOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: true,
  synchronize: true,
  logging: false,
  entities: [Movie, Comment],
  migrations: [`${__dirname}/migration/**/*.ts`],
  subscribers: [`${__dirname}/subscriber/**/*.ts`],
  cli: {
    entitiesDir: `${__dirname}/entity`,
    migrationsDir: `${__dirname}/migration`,
    subscribersDir: `${__dirname}/subscriber`,
  },
};

export default connectionOpts;

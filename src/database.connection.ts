import 'reflect-metadata';
import { ConnectionOptions } from 'typeorm';
import { Movie } from './entity/Movie';
import { Comment } from './entity/Comment';

const dbConfig =
  process.env.NODE_ENV === 'production'
    ? {
        url: process.env.DATABASE_URL,
        ssl: true,
      }
    : {
        host: process.env.DATABASE_URL || 'localhost',
        port: Number(process.env.POSTGRES_PORT) || 5432,
        username: process.env.POSTGRES_USER || 'postgres',
        password: process.env.POSTGRES_PASSWORD || 'postgres',
        database: process.env.POSTGRES_DB || 'test',
      };

const connectionOpts: ConnectionOptions = {
  type: 'postgres',
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
  ...dbConfig,
};

export default connectionOpts;

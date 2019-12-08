import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Movie } from '../entity/Movie';
import MovieInterface from './movie.interface';

export const all = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const movies: MovieInterface[] = await getRepository(Movie).find();
    res.send(movies);
  } catch (error) {
    next(error);
  }
};

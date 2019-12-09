import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Movie } from '../entity/Movie';
import { MovieInterface } from '../lib/interfaces';
import { HttpException } from '../lib/exceptions';

export const all = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const movies: MovieInterface[] = await getRepository(Movie).find();
    res.send(movies);
  } catch (error) {
    next(error);
  }
};

export const create = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const movie: MovieInterface = await getRepository(Movie).save(
      res.locals.movie
    );
    res.send(movie);
  } catch (error) {
    next(new HttpException(error));
  }
};

export const remove = async (
  { body: { id } }: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const movieRepository = await getRepository(Movie);
    // The movie is exist because already checked and validated in prior middleware.
    const movie =
      (await movieRepository.findOne({
        id
      })) || {};

    await movieRepository.delete(movie);

    res.sendStatus(200);
  } catch (error) {
    next(new HttpException(error));
  }
};

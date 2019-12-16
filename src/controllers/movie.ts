import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Movie } from '../entity/Movie';
import { MovieInterface } from '../lib/interfaces';
import { HttpException } from '../lib/exceptions';
import { onNotFound } from '../lib/helpers';

export const all = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const movies: MovieInterface[] = await getRepository(Movie).find({
      relations: ['comments'],
    });
    res.send(movies);
  } catch (error) {
    next(new HttpException(error));
  }
};

export const one = async ({ params }: Request, res: Response, next: NextFunction) => {
  try {
    const movie: MovieInterface | undefined = await getRepository(Movie).findOne(params.id, {
      relations: ['comments'],
    });

    if (movie) return res.send(movie);

    // This is known error so we don't throw to catch block.
    next(new HttpException(onNotFound('Movie'), 404));
  } catch (error) {
    next(new HttpException(error));
  }
};

export const create = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const movie: MovieInterface = await getRepository(Movie).save(res.locals.movie);
    res.send(movie);
  } catch (error) {
    next(new HttpException(error));
  }
};

export const remove = async ({ params: { id } }: Request, res: Response, next: NextFunction) => {
  try {
    await getRepository(Movie).delete(id);

    res.sendStatus(200);
  } catch (error) {
    next(new HttpException(error));
  }
};

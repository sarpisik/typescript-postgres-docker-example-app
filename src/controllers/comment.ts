import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Comment } from '../entity/Comment';
import { CommentInterface } from '../lib/interfaces';
import { HttpException } from '../lib/exceptions';
import { Movie } from '../entity/Movie';
import { onNotFound } from '../lib/helpers';

export const all = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const comments: CommentInterface[] = await getRepository(Comment).find({
      relations: ['movie'],
    });
    res.send(comments);
  } catch (error) {
    next(new HttpException(error));
  }
};

export const one = async ({ params }: Request, res: Response, next: NextFunction) => {
  try {
    const comment: CommentInterface | undefined = await getRepository(Comment).findOne(params.id, {
      relations: ['movie'],
    });

    if (comment) return res.send(comment);

    // This is known error so we don't throw to catch block.
    next(new HttpException(onNotFound('Comment'), 404));
  } catch (error) {
    next(new HttpException(error));
  }
};

export const create = async ({ body: _comment }: Request, res: Response, next: NextFunction) => {
  try {
    // Movie already validated in prior middleware.
    const movie = await getRepository(Movie).findOne(_comment.movie);

    const comment: CommentInterface = await getRepository(Comment).save({
      ..._comment,
      movie,
    });
    res.send(comment);
  } catch (error) {
    next(new HttpException(error));
  }
};

export const remove = async ({ params: { id } }: Request, res: Response, next: NextFunction) => {
  try {
    await getRepository(Comment).delete(id);

    res.sendStatus(200);
  } catch (error) {
    next(new HttpException(error));
  }
};

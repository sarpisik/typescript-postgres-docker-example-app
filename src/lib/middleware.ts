import { NextFunction, Request, Response } from 'express';
import Axios, { AxiosResponse } from 'axios';
import { HttpException } from './exceptions';
import { validationResult, ErrorFormatter } from 'express-validator';
import { capitalizeLetter } from './helpers';

const apiKey = process.env.OMDBAPI_API_KEY;

interface ValidationError {
  location?: string;
  msg?: string;
  param?: string;
  value?: string;
}

const errorFormatter: ErrorFormatter = ({ msg }: ValidationError) => msg + '.';

export const validateFields = (req: Request, _res: Response, next: NextFunction) => {
  const errors = validationResult(req).formatWith(errorFormatter);

  !errors.isEmpty()
    ? next(
        new HttpException(
          {
            name: 'Validation',
            message: 'Invalid fields: '.concat(errors.array().join(' ')),
          },
          500
        )
      )
    : next();
};

export const fetchExternalMovieDetails = async (
  { body: movie }: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const slug = movie.title.replace(/\s+/g, '-');
    const url = `http://www.omdbapi.com/?t=${slug}&apikey=${apiKey}`;
    const { data: remoteData }: AxiosResponse = await Axios.get(url);

    // If external movie details exist, merge with posted movie details.
    // Else, keep posted movie details only.
    res.locals.movie =
      remoteData.Response !== 'False'
        ? {
            ...[
              'title',
              'actors',
              'awards',
              'country',
              'director',
              'genre',
              'language',
              'ratings',
              'released',
              'year',
              'imdbRating',
            ].reduce((movie, propertyName) => {
              const isValue = movie[propertyName];
              // If value entered by user and it is not 'title', keep it.
              // Else, merge the external value from remote api.
              if (isValue && propertyName !== 'title') return movie;
              movie[propertyName] = remoteData[capitalizeLetter(propertyName)];
              return movie;
            }, movie),
          }
        : movie;

    next();
  } catch (error) {
    next(new HttpException(error));
  }
};

export const handleError = (
  { status, message }: HttpException,
  _req: Request,
  res: Response,
  _next: NextFunction
) =>
  res.status(status).send({
    status,
    message,
  });

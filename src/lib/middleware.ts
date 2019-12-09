import { NextFunction, Request, Response } from 'express';
import Axios from 'axios';
import { MovieInterface } from './interfaces';
import { HttpException } from './exceptions';
import { validationResult, ErrorFormatter } from 'express-validator';

const apiKey = process.env.OMDBAPI_API_KEY;

interface ErrorResponse {
  Response: 'False';
  Error: string;
}

interface SuccessResponse extends MovieInterface {
  Response: 'True';
}

interface ValidationError {
  location?: string;
  msg?: string;
  param?: string;
  value?: string;
}

const errorFormatter: ErrorFormatter = ({ msg }: ValidationError) => msg + '.';

export const validateFields = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req).formatWith(errorFormatter);

  !errors.isEmpty()
    ? next(
        new HttpException(
          {
            name: 'Validation',
            message: 'Invalid fields: '.concat(errors.array().join(' '))
          },
          500
        )
      )
    : next();
};

export const fetchExternalMovieDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const movie: MovieInterface = req.body;
    const searchTitle = movie.title.replace(/\s+/g, '-');
    const url = `http://www.omdbapi.com/?t=${searchTitle}&apikey=${apiKey}`;
    const response: { data: SuccessResponse | ErrorResponse } = await Axios.get(
      url
    );

    // If external movie details exist, merge with posted movie details.
    // Else, keep posted movie details only.
    res.locals.movie =
      response.data.Response !== 'False'
        ? { ...response.data, ...req.body }
        : req.body;

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
    message
  });

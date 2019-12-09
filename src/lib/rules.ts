import { check, ValidationChain } from 'express-validator';
import { getRepository } from 'typeorm';
import { Movie } from '../entity/Movie';
import { MovieInterface } from './interfaces';

const validateMovieBy = (field: string, condition: boolean) => async (
  value: string
) => {
  const movie: MovieInterface | undefined = await getRepository(Movie).findOne({
    [field]: value
  });
  return !!movie === condition ? Promise.reject() : Promise.resolve();
};

const createRule = (
  field: string,
  cb: (chain: ValidationChain) => ValidationChain,
  errMessage: string
) =>
  cb(check(field))
    .trim()
    .escape()
    .withMessage(errMessage);

const setOptional = (chain: ValidationChain) => chain.optional();

const setOptionalString = (chain: ValidationChain) =>
  setOptional(chain).isString();

export const movieRules = {
  create: [
    'title',
    'actors',
    'awards',
    'country',
    'director',
    'genre',
    'language',
    'ratings.source',
    'ratings.value',
    'released',
    'year',
    'imdbRating'
  ].map(propertyName => {
    if (propertyName === 'title')
      return createRule(
        propertyName,
        chain =>
          chain
            .notEmpty()
            .withMessage('Title must be entered.')
            .isString()
            .withMessage('Title must be a string.')
            // Movie shouldn't be exist so passing true bool.
            .custom(validateMovieBy('title', true)),
        'Movie exists'
      );

    if (propertyName === 'years')
      return createRule(
        propertyName,
        chain => setOptional(chain).isNumeric(),
        `${propertyName} field is invalid`
      );

    return createRule(
      propertyName,
      setOptionalString,
      `${propertyName} field is invalid`
    );
  }),

  delete: [
    createRule(
      'id',
      chain =>
        chain
          .notEmpty()
          .withMessage('id must be entered.')
          // Movie must be exist so passing false bool.
          .custom(validateMovieBy('id', false)),
      'Invalid id field'
    )
  ]
};

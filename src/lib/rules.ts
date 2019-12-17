import {
  createRule,
  validateMovieBy,
  setRuleOptional,
  setRuleOptionalString,
  validateCommentBy,
} from './helpers';

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
    'imdbRating',
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
        chain => setRuleOptional(chain).isNumeric(),
        `${propertyName} field is invalid`
      );

    return createRule(propertyName, setRuleOptionalString, `${propertyName} field is invalid`);
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
    ),
  ],
};

export const commentRules = {
  create: ['author', 'content', 'movie'].map(propertyName => {
    if (propertyName === 'movie')
      return createRule(
        propertyName,
        chain =>
          chain
            .notEmpty()
            .withMessage('movie must be entered')
            .isString()
            .withMessage('movie must be a string')
            // Movie must be exist so passing false bool.
            .custom(validateMovieBy(propertyName, false)),
        'Movie does not exists'
      );

    return createRule(
      propertyName,
      chain =>
        chain
          .notEmpty()
          .withMessage(`${propertyName} must be entered`)
          .isString()
          .withMessage(`${propertyName} is not a string`),
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
          // Comment must be exist so passing false bool.
          .custom(validateCommentBy('id', false)),
      'Invalid id field'
    ),
  ],
};

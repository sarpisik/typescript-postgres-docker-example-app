import { check, ValidationChain } from 'express-validator';
import { getRepository } from 'typeorm';
import { Movie } from '../entity/Movie';
import { Comment } from '../entity/Comment';
import { MovieInterface, CommentInterface } from './interfaces';

export const createRule = (
  field: string,
  cb: (chain: ValidationChain) => ValidationChain,
  errMessage: string
) =>
  cb(check(field))
    .trim()
    .escape()
    .withMessage(errMessage);

export const setRuleOptional = (chain: ValidationChain) => chain.optional();

export const setRuleOptionalString = (chain: ValidationChain) => setRuleOptional(chain).isString();

export const validateDoc = (Document: string) => (field: string, condition: boolean) => async (
  value: string
) => {
  const document: MovieInterface | CommentInterface | undefined = await getRepository(
    Document === 'movie' ? Movie : Comment
  ).findOne({
    [field]: value,
  });
  return !!document === condition ? Promise.reject() : Promise.resolve();
};

export const validateMovieBy = validateDoc('movie');

export const validateCommentBy = validateDoc('comment');

export const onNotFound = (document: string) => ({
  name: 'Error',
  message: document + ' not found.',
});

export const capitalizeLetter = (text: string) => text.replace(/^./, text[0].toUpperCase());

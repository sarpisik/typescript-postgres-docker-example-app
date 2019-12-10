import { spy } from 'sinon';
import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../../src/lib/exceptions';

let req: Partial<Request> = { params: { id: '1234' } },
  res: Partial<Response> = {
    send: spy(),
    sendStatus: spy()
  },
  next: Partial<NextFunction> = spy();

export const express = {
  req,
  res,
  next
};

export const movie = {
  title: 'Guardians of the Galaxy',
  year: 2014,
  language: 'English',
  country: 'USA'
};

export const movies = [movie];

export const comment = {
  author: 'Test author',
  content: 'We are under test attack!'
};

export const comments = [comment];

export const error = {
  withStatus: new HttpException(new Error('Something went wrong.'), 400),
  unKnown: new HttpException(new Error('Because status not passed.'))
};

import { createSandbox, SinonSandbox, spy, assert, match } from 'sinon';
import * as typeorm from 'typeorm';
import { Movie } from '../../src/controllers';
import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../../src/lib/exceptions';

let movie = {
    title: 'Guardians of the Galaxy',
    year: 2014,
    language: 'English',
    country: 'USA'
  },
  movies = [movie];

let error = {
  withStatus: new HttpException(new Error('Something went wrong.'), 400),
  unKnown: new HttpException(new Error('Because status not passed.'))
};

let req: Partial<Request> = { params: { id: '1234' } },
  res: Partial<Response> = {
    send: spy(),
    locals: { movie },
    sendStatus: spy()
  },
  next: Partial<NextFunction> = spy();

describe('Movie controller', () => {
  let sandbox: SinonSandbox;

  describe('all', () => {
    beforeEach(() => {
      sandbox = createSandbox();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should return error', async () => {
      const spyOnFind = spy(() => Promise.reject(error.withStatus));
      sandbox
        .stub(typeorm, 'getRepository')
        .returns({ find: spyOnFind } as any);

      await Movie.all(<Request>req, <Response>res, <NextFunction>next);

      assert.calledWith(next as sinon.SinonSpy, match.instanceOf(Error));
    });

    it('should return movies', async () => {
      const spyOnFind = spy(() => Promise.resolve(movies));
      sandbox.stub(typeorm, 'getRepository').returns({
        find: spyOnFind
      } as any);

      await Movie.all(<Request>req, <Response>res, <NextFunction>next);

      assert.calledWith(res.send as sinon.SinonSpy, movies);
    });
  });

  describe('one', () => {
    beforeEach(() => {
      sandbox = createSandbox();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should return error unknown', async () => {
      const spyOnFind = spy(() => Promise.reject(error.withStatus));
      sandbox
        .stub(typeorm, 'getRepository')
        .returns({ findOne: spyOnFind } as any);

      await Movie.one(<Request>req, <Response>res, <NextFunction>next);

      assert.calledWith(next as sinon.SinonSpy, match.instanceOf(Error));
    });

    it('should return error on movie not found', async () => {
      const spyOnFind = spy(() => Promise.resolve(null));
      sandbox
        .stub(typeorm, 'getRepository')
        .returns({ findOne: spyOnFind } as any);

      await Movie.one(<Request>req, <Response>res, <NextFunction>next);

      assert.calledWith(next as sinon.SinonSpy, match.instanceOf(Error));
    });

    it('should return movie', async () => {
      const spyOnFind = spy(() => Promise.resolve(movie));
      sandbox.stub(typeorm, 'getRepository').returns({
        findOne: spyOnFind
      } as any);

      await Movie.one(<Request>req, <Response>res, <NextFunction>next);

      assert.calledWith(res.send as sinon.SinonSpy, movie);
    });
  });

  describe('create', () => {
    beforeEach(() => {
      sandbox = createSandbox();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should return error unknown', async () => {
      const spyOnFind = spy(() => Promise.reject(error.unKnown));
      sandbox
        .stub(typeorm, 'getRepository')
        .returns({ save: spyOnFind } as any);

      await Movie.create(<Request>req, <Response>res, <NextFunction>next);

      assert.calledWith(next as sinon.SinonSpy, match.instanceOf(Error));
    });

    it('should return movie', async () => {
      const spyOnFind = spy(() => Promise.resolve(movie));
      sandbox.stub(typeorm, 'getRepository').returns({
        save: spyOnFind
      } as any);

      await Movie.create(<Request>req, <Response>res, <NextFunction>next);

      assert.calledWith(res.send as sinon.SinonSpy, movie);
    });
  });

  describe('remove', () => {
    beforeEach(() => {
      sandbox = createSandbox();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should return error unknown', async () => {
      const spyOnFind = spy(() => Promise.reject(error.unKnown));
      sandbox
        .stub(typeorm, 'getRepository')
        .returns({ delete: spyOnFind } as any);

      await Movie.remove(<Request>req, <Response>res, <NextFunction>next);

      assert.calledWith(next as sinon.SinonSpy, match.instanceOf(Error));
    });

    it('should remove movie', async () => {
      const spyOnFind = spy(() => Promise.resolve());
      sandbox.stub(typeorm, 'getRepository').returns({
        delete: spyOnFind
      } as any);

      await Movie.remove(<Request>req, <Response>res, <NextFunction>next);

      assert.calledWith(res.sendStatus as sinon.SinonSpy, 200);
    });
  });
});

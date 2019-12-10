import { createSandbox, SinonSandbox, spy, assert, match } from 'sinon';
import * as typeorm from 'typeorm';
import { Movie } from '../../src/controllers';
import { Request, Response, NextFunction } from 'express';
import { express, movie, movies, error } from './instances';

describe('Movie controller', () => {
  let { req, res, next } = express,
    sandbox: SinonSandbox,
    setSandbox = () => {
      sandbox = createSandbox();
    },
    restoreSandbox = () => {
      sandbox.restore();
    };

  describe('all', () => {
    beforeEach(setSandbox);

    afterEach(restoreSandbox);

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
    beforeEach(setSandbox);

    afterEach(restoreSandbox);

    it('should return error unknown', async () => {
      const spyOnFind = spy(() => Promise.reject(error.withStatus));
      sandbox.stub(typeorm, 'getRepository').returns({
        findOne: spyOnFind
      } as any);

      await Movie.one(<Request>req, <Response>res, <NextFunction>next);

      assert.calledWith(next as sinon.SinonSpy, match.instanceOf(Error));
    });

    it('should return error on movie not found', async () => {
      const spyOnFind = spy(() => Promise.resolve(null));
      sandbox.stub(typeorm, 'getRepository').returns({
        findOne: spyOnFind
      } as any);

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
    beforeEach(setSandbox);

    afterEach(restoreSandbox);

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
    beforeEach(setSandbox);

    afterEach(restoreSandbox);

    it('should return error unknown', async () => {
      const spyOnFind = spy(() => Promise.reject(error.unKnown));
      sandbox.stub(typeorm, 'getRepository').returns({
        delete: spyOnFind
      } as any);

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

import { createSandbox, SinonSandbox, spy, assert, match } from 'sinon';
import * as typeorm from 'typeorm';
import { Comment } from '../../src/controllers';
import { Request, Response, NextFunction } from 'express';
import { express, movie, comment, comments, error } from './instances';

describe('Comment controller', () => {
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
      const spyOnFind = spy(() => Promise.reject(error.unKnown));
      sandbox
        .stub(typeorm, 'getRepository')
        .returns({ find: spyOnFind } as any);

      await Comment.all(<Request>req, <Response>res, <NextFunction>next);

      assert.calledWith(next as sinon.SinonSpy, match.instanceOf(Error));
    });

    it('should return comments', async () => {
      const spyOnFind = spy(() => Promise.resolve(comments));
      sandbox.stub(typeorm, 'getRepository').returns({
        find: spyOnFind
      } as any);

      await Comment.all(<Request>req, <Response>res, <NextFunction>next);

      assert.calledWith(res.send as sinon.SinonSpy, comments);
    });
  });

  describe('one', () => {
    beforeEach(setSandbox);

    afterEach(restoreSandbox);

    it('should return error unknown', async () => {
      const spyOnFind = spy(() => Promise.reject(error.withStatus));
      sandbox
        .stub(typeorm, 'getRepository')
        .returns({ findOne: spyOnFind } as any);

      await Comment.one(<Request>req, <Response>res, <NextFunction>next);

      assert.calledWith(next as sinon.SinonSpy, match.instanceOf(Error));
    });

    it('should return error on comment not found', async () => {
      const spyOnFind = spy(() => Promise.resolve(null));
      sandbox
        .stub(typeorm, 'getRepository')
        .returns({ findOne: spyOnFind } as any);

      await Comment.one(<Request>req, <Response>res, <NextFunction>next);

      assert.calledWith(next as sinon.SinonSpy, match.instanceOf(Error));
    });

    it('should return comment', async () => {
      const spyOnFind = spy(() => Promise.resolve(comment));
      sandbox.stub(typeorm, 'getRepository').returns({
        findOne: spyOnFind
      } as any);

      await Comment.one(<Request>req, <Response>res, <NextFunction>next);

      assert.calledWith(res.send as sinon.SinonSpy, comment);
    });
  });

  describe('create', () => {
    req.body = {
      ...comment,
      movie
    };

    beforeEach(setSandbox);

    afterEach(restoreSandbox);

    it('should return error unknown', async () => {
      const spyOnFind = spy(() => Promise.resolve(movie)),
        spyOnSave = spy(() => Promise.reject(error.unKnown));

      sandbox
        .stub(typeorm, 'getRepository')
        .returns({ save: spyOnSave, findOne: spyOnFind } as any);

      await Comment.create(<Request>req, <Response>res, <NextFunction>next);

      assert.calledWith(next as sinon.SinonSpy, match.instanceOf(Error));
    });

    it('should return comment', async () => {
      const spyOnFind = spy(() => Promise.resolve(movie)),
        spyOnSave = spy(() => Promise.resolve(req.body));

      sandbox
        .stub(typeorm, 'getRepository')
        .returns({ save: spyOnSave, findOne: spyOnFind } as any);

      await Comment.create(<Request>req, <Response>res, <NextFunction>next);

      assert.calledWith(res.send as sinon.SinonSpy, req.body);
    });
  });

  describe('remove', () => {
    beforeEach(setSandbox);

    afterEach(restoreSandbox);

    it('should return error unknown', async () => {
      const spyOnDelete = spy(() => Promise.reject(error.unKnown));
      sandbox
        .stub(typeorm, 'getRepository')
        .returns({ delete: spyOnDelete } as any);

      await Comment.remove(<Request>req, <Response>res, <NextFunction>next);

      assert.calledWith(next as sinon.SinonSpy, match.instanceOf(Error));
    });

    it('should remove comment', async () => {
      const spyOnDelete = spy(() => Promise.resolve());
      sandbox.stub(typeorm, 'getRepository').returns({
        delete: spyOnDelete
      } as any);

      await Comment.remove(<Request>req, <Response>res, <NextFunction>next);

      assert.calledWith(res.sendStatus as sinon.SinonSpy, 200);
    });
  });
});

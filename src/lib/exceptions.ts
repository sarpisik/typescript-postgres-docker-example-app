import logger from './logger';

export class HttpException extends Error {
  status: number;
  message: string;
  constructor(error: Error, status?: number) {
    super(error.message);
    this.status = status || 500;
    // If status passed, this is known error so use the error message.
    // Else, this is an unknown error so use the custom message. Good luck :)
    this.message = status ? error.message : 'Something went wrong.';
    logger.error(error.name);
    logger.error(error.message);
    error.stack && logger.error(error.stack);
  }
}

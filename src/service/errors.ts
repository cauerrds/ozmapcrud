/* eslint-disable no-magic-numbers */
import { Context } from 'koa';

const badRequest = (ctx: Context, err: string) => {
  ctx.throw(400, err)
}

const internalServerError = (ctx: Context, err: Error) => {
  ctx.throw(500, err.message)
}

const notFound = (ctx: Context, err: string) => {
  ctx.throw(404, err)
}

const handleSQLiteError = (ctx: Context, err: Error) => {
  if (err.message.includes('SQLITE_CONSTRAINT: UNIQUE')) {
    badRequest(ctx, 'Unique constraint violation: name or email')
  } else {
    internalServerError(ctx, err);
  }
};



export const errorUtils = {
  badRequest,
  internalServerError,
  notFound,
  handleSQLiteError
}
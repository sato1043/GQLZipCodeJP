import { NextFunction, Request, RequestHandler, Response } from 'express'
import CreateHttpError from 'http-errors'
import isArray from 'lodash/isArray.js'
import isString from 'lodash/isString.js'

export type PromisedRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>

export function wrapPromisedRequestHandler(fn: PromisedRequestHandler): RequestHandler {
  return function (req, res, next) {
    fn(req, res, next).catch(next)
  }
}

export const Error400 = new CreateHttpError.BadRequest(`Invalid Parameters supplied`)
export const Error401 = new CreateHttpError.Unauthorized(`Request Unauthorized`)
export const Error404 = new CreateHttpError.NotFound(`Resource Not Found`)
export const Error409 = new CreateHttpError.Conflict(`Resource Conflicted`)
export const Error422 = new CreateHttpError.UnprocessableEntity(`Unprocessable Entity`)
export const Error500 = new CreateHttpError.InternalServerError(`Failed to Proceed`)
export const Error501 = new CreateHttpError.NotImplemented(`Not Implemented`)

export const throw404 = () => {
  throw Error404
}

// biome-ignore  lint/suspicious/noExplicitAny: 目的がanyからの型特定である
export function extractStringFrom(anyValue: any) {
  const noneArray = isArray(anyValue) ? anyValue[0] : anyValue
  return isString(noneArray) ? noneArray : undefined
}

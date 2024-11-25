import type { QueryResolvers } from './../../../types.generated.js'
export const meta: NonNullable<QueryResolvers['meta']> = (_parent, _arg, ctx) => {
  return ctx.townAreaDictionary.meta
}

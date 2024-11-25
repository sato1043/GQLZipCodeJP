import type { QueryResolvers } from './../../../types.generated.js'
export const townArea: NonNullable<QueryResolvers['townArea']> = (_, arg, ctx) => {
  return ctx.townAreaDictionary.records[arg.postalCode]
}

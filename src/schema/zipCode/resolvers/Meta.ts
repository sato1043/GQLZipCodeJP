import type { MetaResolvers } from './../../types.generated.js'
export const Meta: MetaResolvers = {
  count: (_) => _.count,
  updated: (_) => _.updated,
  converted: (_) => _.converted,
}

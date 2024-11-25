import postalJson, { type PostalJson } from '../generated/postal.json'

export const context = {
  townAreaDictionary: postalJson,
}

// UserContext: created for each incoming request with access to the default and server context
// https://the-guild.dev/graphql/yoga-server/docs/features/context#default-context
export type IncomingRequestContext = {
  townAreaDictionary: PostalJson
}

import {
  BigIntResolver,
  CurrencyResolver,
  DateTimeISOResolver,
  EmailAddressResolver,
  PhoneNumberResolver,
  PostalCodeResolver,
  URLResolver,
  UUIDResolver,
  VoidResolver,
} from 'graphql-scalars'
/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
import type { Resolvers } from './types.generated.js'
export const resolvers: Resolvers = {
  BigInt: BigIntResolver,
  Currency: CurrencyResolver,
  DateTimeISO: DateTimeISOResolver,
  EmailAddress: EmailAddressResolver,
  Mutation: {},
  PhoneNumber: PhoneNumberResolver,
  PostalCode: PostalCodeResolver,
  Query: {},
  URL: URLResolver,
  UUID: UUIDResolver,
  Void: VoidResolver,
}

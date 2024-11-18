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
import { townArea as Query_townArea } from './zipCode/resolvers/Query/townArea.js'
import { TownArea } from './zipCode/resolvers/TownArea.js'
import { UpdateReason } from './zipCode/resolvers/UpdateReason.js'
export const resolvers: Resolvers = {
  Query: { townArea: Query_townArea },

  TownArea: TownArea,
  UpdateReason: UpdateReason,
  BigInt: BigIntResolver,
  Currency: CurrencyResolver,
  DateTimeISO: DateTimeISOResolver,
  EmailAddress: EmailAddressResolver,
  PhoneNumber: PhoneNumberResolver,
  PostalCode: PostalCodeResolver,
  URL: URLResolver,
  UUID: UUIDResolver,
  Void: VoidResolver,
}

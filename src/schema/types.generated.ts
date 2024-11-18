/*
 * WARN: このファイルは生成ごとに上書き
 */
import type { IncomingRequestContext } from './contexts.ts'

import type {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql'
export type Maybe<T> = T | null | undefined
export type InputMaybe<T> = T | null | undefined
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never
}
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>
}
export type EnumResolverSignature<T, AllowedValues = any> = {
  [key in keyof T]?: AllowedValues
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string | number }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  BigInt: { input: bigint; output: bigint }
  Currency: { input: string; output: string }
  DateTimeISO: { input: Date | string; output: Date | string }
  EmailAddress: { input: string; output: string }
  PhoneNumber: { input: string; output: string }
  PostalCode: { input: string; output: string }
  URL: { input: URL | string; output: URL | string }
  UUID: { input: string; output: string }
  Void: { input: void; output: void }
}

export type Query = {
  __typename?: 'Query'
  townArea: TownArea
}

export type Query_townAreaArgs = {
  postalCode: Scalars['PostalCode']['input']
}

export type TownArea = {
  __typename?: 'TownArea'
  chomeList: Array<Scalars['String']['output']>
  cityKana: Scalars['String']['output']
  cityName: Scalars['String']['output']
  createdDateTime: Scalars['DateTimeISO']['output']
  difficultyDoubleMeaningZipArea: Scalars['Boolean']['output']
  difficultyNeedChome: Scalars['Boolean']['output']
  difficultyNeedKoaza: Scalars['Boolean']['output']
  difficultyNotOnlyZipAndBanti: Scalars['Boolean']['output']
  id: Scalars['ID']['output']
  kana: Scalars['String']['output']
  name: Scalars['String']['output']
  postalCode: Scalars['PostalCode']['output']
  prefectureKana: Scalars['String']['output']
  prefectureName: Scalars['String']['output']
  updateDateTime: Scalars['DateTimeISO']['output']
  updateReason: UpdateReason
}

export type UpdateReason =
  | 'ABOLITION'
  | 'ADMINISTRATION'
  | 'CORRECTION'
  | 'DESIGNATION'
  | 'NO_CHANGE'
  | 'POSTAL_ADJUST'
  | 'READJUSTMENT'

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  BigInt: ResolverTypeWrapper<Scalars['BigInt']['output']>
  Currency: ResolverTypeWrapper<Scalars['Currency']['output']>
  DateTimeISO: ResolverTypeWrapper<Scalars['DateTimeISO']['output']>
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']['output']>
  PhoneNumber: ResolverTypeWrapper<Scalars['PhoneNumber']['output']>
  PostalCode: ResolverTypeWrapper<Scalars['PostalCode']['output']>
  Query: ResolverTypeWrapper<{}>
  TownArea: ResolverTypeWrapper<
    Omit<TownArea, 'updateReason'> & { updateReason: ResolversTypes['UpdateReason'] }
  >
  String: ResolverTypeWrapper<Scalars['String']['output']>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>
  ID: ResolverTypeWrapper<Scalars['ID']['output']>
  URL: ResolverTypeWrapper<Scalars['URL']['output']>
  UUID: ResolverTypeWrapper<Scalars['UUID']['output']>
  UpdateReason: ResolverTypeWrapper<
    | 'NO_CHANGE'
    | 'ADMINISTRATION'
    | 'DESIGNATION'
    | 'READJUSTMENT'
    | 'POSTAL_ADJUST'
    | 'CORRECTION'
    | 'ABOLITION'
  >
  Void: ResolverTypeWrapper<Scalars['Void']['output']>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  BigInt: Scalars['BigInt']['output']
  Currency: Scalars['Currency']['output']
  DateTimeISO: Scalars['DateTimeISO']['output']
  EmailAddress: Scalars['EmailAddress']['output']
  PhoneNumber: Scalars['PhoneNumber']['output']
  PostalCode: Scalars['PostalCode']['output']
  Query: {}
  TownArea: TownArea
  String: Scalars['String']['output']
  Boolean: Scalars['Boolean']['output']
  ID: Scalars['ID']['output']
  URL: Scalars['URL']['output']
  UUID: Scalars['UUID']['output']
  Void: Scalars['Void']['output']
}

export interface BigIntScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt'
}

export interface CurrencyScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Currency'], any> {
  name: 'Currency'
}

export interface DateTimeISOScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['DateTimeISO'], any> {
  name: 'DateTimeISO'
}

export interface EmailAddressScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['EmailAddress'], any> {
  name: 'EmailAddress'
}

export interface PhoneNumberScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['PhoneNumber'], any> {
  name: 'PhoneNumber'
}

export interface PostalCodeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['PostalCode'], any> {
  name: 'PostalCode'
}

export type QueryResolvers<
  ContextType = IncomingRequestContext,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = {
  townArea: Resolver<
    ResolversTypes['TownArea'],
    ParentType,
    ContextType,
    RequireFields<Query_townAreaArgs, 'postalCode'>
  >
}

export type TownAreaResolvers<
  ContextType = IncomingRequestContext,
  ParentType extends ResolversParentTypes['TownArea'] = ResolversParentTypes['TownArea'],
> = {
  chomeList: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>
  cityKana: Resolver<ResolversTypes['String'], ParentType, ContextType>
  cityName: Resolver<ResolversTypes['String'], ParentType, ContextType>
  createdDateTime: Resolver<ResolversTypes['DateTimeISO'], ParentType, ContextType>
  difficultyDoubleMeaningZipArea: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >
  difficultyNeedChome: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  difficultyNeedKoaza: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  difficultyNotOnlyZipAndBanti: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  kana: Resolver<ResolversTypes['String'], ParentType, ContextType>
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>
  postalCode: Resolver<ResolversTypes['PostalCode'], ParentType, ContextType>
  prefectureKana: Resolver<ResolversTypes['String'], ParentType, ContextType>
  prefectureName: Resolver<ResolversTypes['String'], ParentType, ContextType>
  updateDateTime: Resolver<ResolversTypes['DateTimeISO'], ParentType, ContextType>
  updateReason: Resolver<ResolversTypes['UpdateReason'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export interface URLScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['URL'], any> {
  name: 'URL'
}

export interface UUIDScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['UUID'], any> {
  name: 'UUID'
}

export type UpdateReasonResolvers = EnumResolverSignature<
  {
    ABOLITION: any
    ADMINISTRATION: any
    CORRECTION: any
    DESIGNATION: any
    NO_CHANGE: any
    POSTAL_ADJUST: any
    READJUSTMENT: any
  },
  ResolversTypes['UpdateReason']
>

export interface VoidScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Void'], any> {
  name: 'Void'
}

export type Resolvers<ContextType = IncomingRequestContext> = {
  BigInt: GraphQLScalarType
  Currency: GraphQLScalarType
  DateTimeISO: GraphQLScalarType
  EmailAddress: GraphQLScalarType
  PhoneNumber: GraphQLScalarType
  PostalCode: GraphQLScalarType
  Query: QueryResolvers<ContextType>
  TownArea: TownAreaResolvers<ContextType>
  URL: GraphQLScalarType
  UUID: GraphQLScalarType
  UpdateReason: UpdateReasonResolvers
  Void: GraphQLScalarType
}

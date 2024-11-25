/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
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
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  BigInt: { input: any; output: any }
  Currency: { input: any; output: any }
  DateTimeISO: { input: any; output: any }
  EmailAddress: { input: any; output: any }
  PhoneNumber: { input: any; output: any }
  PostalCode: { input: any; output: any }
  URL: { input: any; output: any }
  UUID: { input: any; output: any }
  Void: { input: any; output: any }
}

export enum UpdateReason {
  Abolition = 'ABOLITION',
  Administration = 'ADMINISTRATION',
  Correction = 'CORRECTION',
  Designation = 'DESIGNATION',
  NoChange = 'NO_CHANGE',
  PostalAdjust = 'POSTAL_ADJUST',
  Readjustment = 'READJUSTMENT',
}

export type TownAreaQueryVariables = Exact<{
  postalCode: Scalars['PostalCode']['input']
}>

export type TownAreaQuery = {
  __typename?: 'Query'
  townArea: Array<{ __typename?: 'TownArea'; postalCode: any }>
}

export const TownAreaDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'TownArea' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'postalCode' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'PostalCode' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'townArea' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'postalCode' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'postalCode' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'postalCode' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TownAreaQuery, TownAreaQueryVariables>

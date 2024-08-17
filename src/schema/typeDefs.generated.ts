import type { DocumentNode } from 'graphql'
export const typeDefs = {
  kind: 'Document',
  definitions: [
    {
      kind: 'ObjectTypeDefinition',
      name: { kind: 'Name', value: 'Query' },
      interfaces: [],
      directives: [],
      fields: [],
    },
    {
      kind: 'ObjectTypeDefinition',
      name: { kind: 'Name', value: 'Mutation' },
      interfaces: [],
      directives: [],
      fields: [],
    },
    {
      kind: 'ScalarTypeDefinition',
      name: { kind: 'Name', value: 'DateTimeISO' },
      directives: [],
    },
    {
      kind: 'ScalarTypeDefinition',
      name: { kind: 'Name', value: 'BigInt' },
      directives: [],
    },
    {
      kind: 'ScalarTypeDefinition',
      name: { kind: 'Name', value: 'Currency' },
      directives: [],
    },
    {
      kind: 'ScalarTypeDefinition',
      name: { kind: 'Name', value: 'EmailAddress' },
      directives: [],
    },
    {
      kind: 'ScalarTypeDefinition',
      name: { kind: 'Name', value: 'PhoneNumber' },
      directives: [],
    },
    {
      kind: 'ScalarTypeDefinition',
      name: { kind: 'Name', value: 'PostalCode' },
      directives: [],
    },
    {
      kind: 'ScalarTypeDefinition',
      name: { kind: 'Name', value: 'URL' },
      directives: [],
    },
    {
      kind: 'ScalarTypeDefinition',
      name: { kind: 'Name', value: 'UUID' },
      directives: [],
    },
    {
      kind: 'ScalarTypeDefinition',
      name: { kind: 'Name', value: 'Void' },
      directives: [],
    },
    {
      kind: 'SchemaDefinition',
      operationTypes: [
        {
          kind: 'OperationTypeDefinition',
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Query' } },
          operation: 'query',
        },
        {
          kind: 'OperationTypeDefinition',
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Mutation' } },
          operation: 'mutation',
        },
      ],
    },
  ],
} as unknown as DocumentNode

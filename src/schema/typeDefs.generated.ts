import type { DocumentNode } from 'graphql'
export const typeDefs = {
  kind: 'Document',
  definitions: [
    {
      name: { kind: 'Name', value: 'Query' },
      kind: 'ObjectTypeDefinition',
      fields: [
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'meta' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Meta' } },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'townArea' },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: { kind: 'Name', value: 'postalCode' },
              type: {
                kind: 'NonNullType',
                type: { kind: 'NamedType', name: { kind: 'Name', value: 'PostalCode' } },
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: { kind: 'NamedType', name: { kind: 'Name', value: 'TownArea' } },
              },
            },
          },
          directives: [],
        },
      ],
      directives: [],
      interfaces: [],
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
      kind: 'EnumTypeDefinition',
      name: { kind: 'Name', value: 'UpdateReason' },
      directives: [],
      values: [
        {
          kind: 'EnumValueDefinition',
          name: { kind: 'Name', value: 'NO_CHANGE' },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: { kind: 'Name', value: 'ADMINISTRATION' },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: { kind: 'Name', value: 'DESIGNATION' },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: { kind: 'Name', value: 'READJUSTMENT' },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: { kind: 'Name', value: 'POSTAL_ADJUST' },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: { kind: 'Name', value: 'CORRECTION' },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: { kind: 'Name', value: 'ABOLITION' },
          directives: [],
        },
      ],
    },
    {
      kind: 'ObjectTypeDefinition',
      name: { kind: 'Name', value: 'TownArea' },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'postalCode' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'PostalCode' } },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'prefectureName' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'prefectureKana' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'cityName' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'cityKana' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'townAreaName' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'townAreaKana' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'chomeList' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'difficultyNotOnlyZipAndBanti' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'difficultyNeedKoaza' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'difficultyNeedChome' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'difficultyDoubleMeaningTownArea' },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
          },
          directives: [],
        },
      ],
    },
    {
      kind: 'ObjectTypeDefinition',
      name: { kind: 'Name', value: 'Meta' },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'count' },
          arguments: [],
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'updated' },
          arguments: [],
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'DateTimeISO' } },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'converted' },
          arguments: [],
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'DateTimeISO' } },
          directives: [],
        },
      ],
    },
    {
      kind: 'SchemaDefinition',
      operationTypes: [
        {
          kind: 'OperationTypeDefinition',
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Query' } },
          operation: 'query',
        },
      ],
    },
  ],
} as unknown as DocumentNode

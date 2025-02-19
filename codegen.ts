/*
 * graphql codegen: Guide: GraphQL Yoga / Apollo Server with Server Preset
 *   https://the-guild.dev/graphql/codegen/docs/guides/graphql-server-apollo-yoga-with-server-preset
 */
import { defineConfig } from '@eddeee888/gcg-typescript-resolver-files'
import type { CodegenConfig } from '@graphql-codegen/cli'

const warnText = `/*
 * WARN: このファイルは生成ごとに上書き
 */
import type { IncomingRequestContext } from './contexts.ts'
`

const config: CodegenConfig = {
  schema: 'src/schema/**/*.graphql',
  ignoreNoDocuments: true,
  generates: {
    'src/schema': defineConfig({
      // The following config is designed to work with GraphQL Yoga's File uploads feature
      // https://the-guild.dev/graphql/yoga-server/docs/features/file-uploads
      scalarsOverrides: {
        File: { type: 'File' },
      },
      resolverGeneration: {
        query: '*',
        mutation: '*',
        subscription: '*',
        scalar: '!*.File',
        object: '*',
        union: '',
        interface: '',
        enum: '*',
      },
      mergeSchema: false,

      // https://the-guild.dev/graphql/codegen/docs/getting-started/esm-typescript-usage
      emitLegacyCommonJSImports: false,

      /*
       * typesPluginsConfig
       *  Takes typescript config and typescript-resolvers config to override the defaults.
       * @graphql-codegen/typescript
       *   https://the-guild.dev/graphql/codegen/plugins/typescript/typescript
       * @graphql-codegen/typescript-resolvers
       *   https://the-guild.dev/graphql/codegen/plugins/typescript/typescript-resolvers
       */
      typesPluginsConfig: {
        addUnderscoreToArgsType: true,
        avoidOptionals: true,
        useTypeImports: true,
        constEnums: true,
        contextType: 'IncomingRequestContext',
        // fieldContextTypes: ['MyType.foo#CustomContextType', 'MyType.bar#./my-file#ContextTypeOne']
        // directiveContextTypes: ['myCustomDirectiveName#./my-file#CustomContextExtender']
      },
      add: {
        './types.generated.ts': { content: warnText },
      },
    }),

    './src/client/': {
      preset: 'client',
      documents: ['src/**/*.spec.ts'],
      config: {
        useTypeImports: true,
      },
    },

    './src/client/validation.ts': {
      plugins: ['typescript-validation-schema'],
      documents: ['src/**/*.spec.ts'],
      config: {
        importFrom: './graphql.ts',
        schema: 'yup',
        scalars: {
          ID: 'string', // https://github.com/Code-Hex/graphql-codegen-typescript-validation-schema/pull/375
          PostalCode: 'string',
        },
        defaultScalarSchema: 'yup.unknown()',
        scalarSchemas: {
          Date: 'yup.date()',
          Email: 'yup.string().trim().email()',
          PostalCode: 'yup.string().trim().matches(/^[0-9]{3}-[0-9]{4}$/)',
        },
        notAllowEmptyString: true,
      },
    },
  },
}

export default config

/*
 * Generated Files Overview
 *
 *  - types.generated.ts: TypeScript types generated
 *      by @graphql-codegen/typescript and @graphql-codegen/typescript-resolvers
 *
 *  - typeDefs.generated.ts: Static TypeScript Schema AST to be used by the server
 *
 *  - user/resolvers/Query/user.ts,
 *    book/resolvers/Query/book.ts,
 *    book/resolvers/Mutation/markBookAsRead.ts: Typed operation resolvers of each module
 *
 *  - user/resolvers/User.ts,
 *    book/resolvers/Book.ts: Typed object type resolvers of each module
 *
 *  - resolvers.generated.ts: Resolver map
 *      that contains all generated operation and object type resolvers
 */

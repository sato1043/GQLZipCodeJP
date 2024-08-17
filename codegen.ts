import { defineConfig } from '@eddeee888/gcg-typescript-resolver-files'
import type { CodegenConfig } from '@graphql-codegen/cli'

const warnText = `/*
 * WARN: このファイルは生成ごとに上書き
 */
import type { MyContext } from './MyContext.ts'
`

const config: CodegenConfig = {
  schema: 'src/schema/**/*.graphql',
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
        enum: '',
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
        // contextType: './my-types#MyContext',
        contextType: 'MyContext',
        // fieldContextTypes: ['MyType.foo#CustomContextType', 'MyType.bar#./my-file#ContextTypeOne']
        // directiveContextTypes: ['myCustomDirectiveName#./my-file#CustomContextExtender']
      },
      add: {
        './types.generated.ts': { content: warnText },
      },
    }),
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

import type { TypedDocumentNode } from '@graphql-typed-document-node/core'
import { type ExecutionResult, print } from 'graphql/index.js'
import conf from '../conf.js'
import { yoga } from '../routes/graphqlRouter.js'

export async function executeOperation<TResult, TVariables>(
  operation: TypedDocumentNode<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
): Promise<[ExecutionResult<TResult>, Response]> {
  const response = await yoga.fetch(conf.app.origin + conf.endpoint.graphql, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query: print(operation),
      variables: variables ?? undefined,
    }),
  })
  const responseJson = (await response.json()) as ExecutionResult<TResult>
  return [responseJson, response]
}

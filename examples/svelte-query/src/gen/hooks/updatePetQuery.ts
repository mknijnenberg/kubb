import { createMutation } from '@tanstack/svelte-query'
import client from '@kubb/swagger-client/client'
import type { KubbQueryFactory } from './types'
import type { CreateMutationOptions, CreateMutationResult } from '@tanstack/svelte-query'
import type { UpdatePetMutationRequest, UpdatePetMutationResponse, UpdatePet400, UpdatePet404, UpdatePet405 } from '../models/UpdatePet'

type UpdatePet = KubbQueryFactory<
  UpdatePetMutationResponse,
  UpdatePet400 | UpdatePet404 | UpdatePet405,
  UpdatePetMutationRequest,
  never,
  never,
  never,
  UpdatePetMutationResponse,
  {
    dataReturnType: 'full'
    type: 'mutation'
  }
> /**
 * @description Update an existing pet by Id
 * @summary Update an existing pet
 * @link /pet
 */

export function updatePetQuery<TData = UpdatePet['response'], TError = UpdatePet['error']>(
  options: {
    mutation?: CreateMutationOptions<TData, TError, UpdatePet['request']>
    client?: UpdatePet['client']['paramaters']
  } = {},
): CreateMutationResult<TData, TError, UpdatePet['request']> {
  const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {}

  return createMutation<TData, TError, UpdatePet['request']>({
    mutationFn: (data) => {
      return client<UpdatePet['data'], TError, UpdatePet['request']>({
        method: 'put',
        url: `/pet`,
        data,
        ...clientOptions,
      }).then((res) => res as TData)
    },
    ...mutationOptions,
  })
}

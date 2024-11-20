import * as yup from 'yup'
import { UpdateReason } from './graphql.ts'

export const UpdateReasonSchema = yup
  .string<UpdateReason>()
  .oneOf(Object.values(UpdateReason))
  .defined()

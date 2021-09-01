import { AccountModel } from '../models'
import { AddAccountParams, AuthenticationParams } from '../usecases/account'

export const mockAddAccountParams = (): AddAccountParams => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})

export const mockAccountModel = (): AccountModel => ({
  ...mockAddAccountParams(),
  id: 'any_id',
  password: 'hashed_password'
})

export const mockAuthenticationParams = (): AuthenticationParams => ({
  email: 'any_email',
  password: 'any_password'
})

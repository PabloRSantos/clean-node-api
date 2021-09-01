import { AccountModel } from '@/domain/models'
import { AddAccountParams } from '@/domain/usecases/account'

export interface AddAccountRepository {
  add (accountData: AddAccountParams): Promise<AccountModel>
}

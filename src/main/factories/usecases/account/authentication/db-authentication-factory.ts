import { DbAuthentication } from '@/data/usecases/account/authentication/db-authentication'
import { Authentication } from '@/domain/usecases/account'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter/jwt-adapter'
import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository'
import { env } from '@/main/config/env'

export const makeDbAuthentication = (): Authentication => {
  const salt = 12

  const accountMongoRepository = new AccountMongoRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapater = new JwtAdapter(env.jwtSecret)

  return new DbAuthentication(
    accountMongoRepository,
    bcryptAdapter,
    jwtAdapater,
    accountMongoRepository
  )
}

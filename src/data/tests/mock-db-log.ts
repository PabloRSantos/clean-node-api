import { LogErrorRepository } from '../protocols/db/log/log-error-repository'

export const mockLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRespositoryStub implements LogErrorRepository {
    async logError (stack: string): Promise<void> {
      await Promise.resolve(null)
    }
  }

  return new LogErrorRespositoryStub()
}

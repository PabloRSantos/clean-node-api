import { ok, serverError } from '../../../helpers/http/http-helper'
import { LoadSurveys, Controller, HttpRequest, HttpResponse } from './load-surveys-controller-protocols'

export class LoadSurveysController implements Controller {
  constructor (
    private readonly dbLoadSurveys: LoadSurveys
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.dbLoadSurveys.load()

      return ok(surveys)
    } catch (error) {
      return serverError(error)
    }
  }
}

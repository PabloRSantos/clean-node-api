import { forbidden, InvalidParamError } from '@/presentation/middlewares/auth-middleware-protocols'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { LoadSurveyById, SaveSurveyResult } from './save-survey-result-controller-protocols'

export class SaveSurveyResultController implements Controller {
  constructor (
    private readonly dbSaveSurveyResult: SaveSurveyResult,
    private readonly dbLoadSurveyById: LoadSurveyById
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const survey = await this.dbLoadSurveyById.loadById(httpRequest.params.surveyId)

    if (!survey) {
      return forbidden(new InvalidParamError('surveyId'))
    }

    return null
  }
}

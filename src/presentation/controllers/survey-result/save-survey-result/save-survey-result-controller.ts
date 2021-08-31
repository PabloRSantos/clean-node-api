import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { LoadSurveyById, SaveSurveyResult } from './save-survey-result-controller-protocols'

export class SaveSurveyResultController implements Controller {
  constructor (
    private readonly dbSaveSurveyResult: SaveSurveyResult,
    private readonly dbLoadSurveyById: LoadSurveyById
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.dbLoadSurveyById.loadById(httpRequest.params.surveyId)

    return null
  }
}

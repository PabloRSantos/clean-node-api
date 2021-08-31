import { forbidden, InvalidParamError, ok, serverError } from '@/presentation/middlewares/auth-middleware-protocols'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { LoadSurveyById, SaveSurveyResult } from './save-survey-result-controller-protocols'

export class SaveSurveyResultController implements Controller {
  constructor (
    private readonly dbSaveSurveyResult: SaveSurveyResult,
    private readonly dbLoadSurveyById: LoadSurveyById
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      const { answer, date } = httpRequest.body
      const { accountId } = httpRequest

      const survey = await this.dbLoadSurveyById.loadById(surveyId)

      if (survey) {
        const findedAnswer = survey.answers.find(a => a.answer === answer)

        if (!findedAnswer) {
          return forbidden(new InvalidParamError('answer'))
        }
      } else {
        return forbidden(new InvalidParamError('surveyId'))
      }

      const surveyResult = await this.dbSaveSurveyResult.save({
        surveyId,
        answer,
        date,
        accountId
      })

      return ok(surveyResult)
    } catch (error) {
      return serverError(error)
    }
  }
}

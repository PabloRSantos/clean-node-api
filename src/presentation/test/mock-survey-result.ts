import { SurveyModel } from '@/domain/models'
import { SurveyResultModel } from '@/domain/models/survey-result'
import { mockSurveyModel, mockSurveyResultModel } from '@/domain/test'
import { LoadSurveyById } from '@/domain/usecases/survey'
import { SaveSurveyResult, SaveSurveyResultParams } from '@/domain/usecases/survey-result'

export const mockSaveSurveyResult = (): SaveSurveyResult => {
  class SaveSurveyResultStub implements SaveSurveyResult {
    async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return mockSurveyResultModel()
    }
  }

  return new SaveSurveyResultStub()
}

export const mockLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById (id: string): Promise<SurveyModel> {
      return mockSurveyModel()
    }
  }

  return new LoadSurveyByIdStub()
}

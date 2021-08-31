import { AddSurveyModel } from '@/domain/usecases/survey'

export interface AddSurveyRepository {
  add(data: AddSurveyModel): Promise<void>
}

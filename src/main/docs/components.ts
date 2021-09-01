import { badRequest, serverError, unauthorized, forbidden, notFound } from './components/'
import { apiKeyAuthSchema } from './schemas/'

export const components = {
  securitySchemes: {
    apiKeyAuth: apiKeyAuthSchema
  },
  badRequest,
  serverError,
  unauthorized,
  notFound,
  forbidden
}

import { AuthenticationParams } from '../usecases/authentication';
import faker from 'faker'

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.password(),
  password: faker.internet.email()
})
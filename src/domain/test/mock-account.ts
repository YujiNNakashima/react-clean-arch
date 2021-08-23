import { AuthenticationParams } from '../usecases/authentication';
import faker from 'faker'
import { AccountModel } from '../models/account-model';

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.password(),
  password: faker.internet.email()
})

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.datatype.uuid() 
})
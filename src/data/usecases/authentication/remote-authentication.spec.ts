import { RemoteAuthentication } from './remote-authentication';
import { HttpPostClientSpy } from '../../test/mock-http-client';
import faker from 'faker'
import { mockAuthentication } from '../../../domain/test/mock-authentication';
import { InvalidCredentialsError } from '../../../domain/errors/invalid-credentials-error';
import { HttpStatusCode } from '@/data/protocols/http/http-response';
import { UnexpectedError } from '../../../domain/errors/unexpected-error';
import { ServerError } from '../../../domain/errors/server-error';
import { NotFoundError } from '../../../domain/errors/not-found-error';
import { AuthenticationParams } from '@/domain/usecases/authentication';
import { AccountModel } from '../../../domain/models/account-model';

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>
}

const makeSut = (url: string): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<AuthenticationParams, AccountModel>()
  const sut = new RemoteAuthentication(url, httpPostClientSpy)
  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAuthentication test', () => {
  test('should call HttpClient with correct URL', async () => {
    const url = faker.internet.url()
    const {sut, httpPostClientSpy} = makeSut(url)
    await sut.auth(mockAuthentication())
    expect(httpPostClientSpy.url).toBe(url)
  })

  test('should call remote authentication with correct params', async () => {
    const url = faker.internet.url()
    const {password, email} = mockAuthentication()
    const { sut, httpPostClientSpy } = makeSut(url)
    await sut.auth({password, email})
    expect(httpPostClientSpy.body).toEqual({password, email})
  })

  test('should throw InvalidCredentialError if HttpPostClient return 401', () => {
    const url = faker.internet.url()
    const {password, email} = mockAuthentication()
    const { sut, httpPostClientSpy } = makeSut(url)
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized
    }
    const promise = sut.auth({password, email})
    expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  test('should throw UnexpectedError if HttpPostClient return 400', () => {
    const url = faker.internet.url()
    const {password, email} = mockAuthentication()
    const { sut, httpPostClientSpy } = makeSut(url)
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.auth({password, email})
    expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('should throw Server Error if HttpPostClient return 500', () => {
    const url = faker.internet.url()
    const {password, email} = mockAuthentication()
    const { sut, httpPostClientSpy } = makeSut(url)
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.auth({password, email})
    expect(promise).rejects.toThrow(new ServerError())
  })

  test('should throw NotFound if HttpPostClient return 404', () => {
    const url = faker.internet.url()
    const {password, email} = mockAuthentication()
    const { sut, httpPostClientSpy } = makeSut(url)
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.auth({password, email})
    expect(promise).rejects.toThrow(new NotFoundError())
  })
})
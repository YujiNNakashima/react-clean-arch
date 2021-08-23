import { RemoteAuthentication } from './remote-authentication';
import { HttpPostClientSpy } from '../../test/mock-http-client';
import faker from 'faker'
import { mockAuthentication } from '../../../domain/test/mock-authentication';
import { InvalidCredentialsError } from '../../../domain/errors/invalid-credentials-error';
import { HttpStatusCode } from '@/data/protocols/http/http-response';

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy
}

const makeSut = (url: string): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy()
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
})
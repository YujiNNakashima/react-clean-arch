import { RemoteAuthentication } from './remote-authentication';
import { HttpPostClientSpy } from '../../test/mock-http-client';


type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy
}
const makeSut = (): SutTypes => {
  const url = 'c'
  const httpPostClientSpy = new HttpPostClientSpy()
  const sut = new RemoteAuthentication(url, httpPostClientSpy)
  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAuthentication test', () => {
  test('should call HttpClient with correct URL', async () => {
    const {sut, httpPostClientSpy} = makeSut() 
    await sut.auth()
    expect(httpPostClientSpy.url).toBe('c')
  })
})
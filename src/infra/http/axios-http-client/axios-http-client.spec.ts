import axios from 'axios'
import faker from 'faker';
import AxiosHttpClient from './axios-http-client';
import { HttpPostParams } from '@/data/protocols/http';

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
const mockedAxiosResult = {data: faker.random.objectElement(), status: faker.datatype.number()}
mockedAxios.post.mockResolvedValue(mockedAxiosResult)

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}

const mockPostResquest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
}) 

describe(('AxiosHttpClient'), () => {
  test('should call axios with correct url and body', async () => {
    const sut = makeSut()
    const request = mockPostResquest()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  });

  test('should return the correct statusCode and body', async () => {
    const sut = makeSut()
    const request = mockPostResquest()
    const httpResponse = await sut.post(request)
    expect(httpResponse).toEqual({statusCode: mockedAxiosResult.status, body: mockedAxiosResult.data})
  })
})
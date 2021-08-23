import { AccountModel } from '@/domain/models/account-model';
import { AuthenticationParams } from '@/domain/usecases/authentication';
import { HttpPostClient, HttpPostParams } from '../protocols/http/http-post-client';
import { HttpResponse, HttpStatusCode } from '../protocols/http/http-response';
export class HttpPostClientSpy<T, R> implements HttpPostClient<T, R> {
  url?: string      
  body?: T
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.noContent
  }

  async post(params: HttpPostParams<T>): Promise<HttpResponse<R>> {
    this.url = params.url
    this.body = params.body
    return Promise.resolve(this.response) 
  }
}
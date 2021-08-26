import { HttpPostParams, HttpPostClient } from '../../../data/protocols/http/http-post-client';
import axios from 'axios'
import { AuthenticationParams } from '../../../domain/usecases/authentication';
import { HttpResponse } from '../../../data/protocols/http/http-response';
import { AccountModel } from '../../../domain/models/account-model';

export default class AxiosHttpClient implements HttpPostClient<any, any> {

  async post(params: HttpPostParams<AuthenticationParams>): Promise<HttpResponse<AccountModel>> {
    const response = await axios.post(params.url, params.body)
    return {statusCode: response.status, body: response.data}
  }
}
import { HttpPostParams } from '../../../data/protocols/http/http-post-client';
import axios from 'axios'
import { AuthenticationParams } from '../../../domain/usecases/authentication';

export default class AxiosHttpClient {

  async post(params: HttpPostParams<AuthenticationParams>): Promise<void> {
    await axios.post(params.url, params.body)
  }
}
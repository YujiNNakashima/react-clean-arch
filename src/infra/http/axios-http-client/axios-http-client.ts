import { HttpPostParams } from '../../../data/protocols/http/http-post-client';
import axios from 'axios'

export default class AxiosHttpClient {

  async post(params: HttpPostParams<any>): Promise<void> {
    await axios(params.url)
  }
}
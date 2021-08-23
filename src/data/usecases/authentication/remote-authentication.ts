import { HttpPostClient } from '../../protocols/http/http-post-client';
import { AuthenticationParams } from '@/domain/usecases/authentication';
import { InvalidCredentialsError } from '../../../domain/errors/invalid-credentials-error';
import { HttpStatusCode } from '@/data/protocols/http/http-response';
import { UnexpectedError } from '../../../domain/errors/unexpected-error';
export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private httpPostClient:  HttpPostClient
    ) {}

  async auth(params: AuthenticationParams): Promise<void> {
    const httpResponse = await this.httpPostClient.post({url: this.url, body: params})

    switch(httpResponse.statusCode) {
      case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
      case HttpStatusCode.badRequest: throw new UnexpectedError()
    }
  }
}
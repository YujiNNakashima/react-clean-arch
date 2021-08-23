import { HttpPostClient } from '../../protocols/http/http-post-client';
import { AuthenticationParams } from '@/domain/usecases/authentication';
import { InvalidCredentialsError } from '../../../domain/errors/invalid-credentials-error';
import { HttpStatusCode } from '@/data/protocols/http/http-response';
import { UnexpectedError } from '../../../domain/errors/unexpected-error';
import { NotFoundError } from '../../../domain/errors/not-found-error';
import { AccountModel } from '../../../domain/models/account-model';
import { Authentication } from '../../../domain/usecases/authentication';
export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private httpPostClient:  HttpPostClient<AuthenticationParams, AccountModel>
    ) {}

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({url: this.url, body: params})

    switch(httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
      case HttpStatusCode.badRequest: throw new UnexpectedError()
      case HttpStatusCode.notFound: throw new NotFoundError()
    }


  }
}
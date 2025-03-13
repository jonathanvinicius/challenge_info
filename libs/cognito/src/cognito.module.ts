import { Module } from '@nestjs/common';
import * as Usecases from './usecases';
import { CognitoService } from './cognito.service';
import { Cognito } from '@app/domain';

const CasesProviders = [
  ...Object.values(Usecases),

  {
    provide: Cognito,
    useClass: CognitoService,
  },
];

@Module({
  providers: [...CasesProviders],
  exports: CasesProviders,
})
export class CognitoModule {}

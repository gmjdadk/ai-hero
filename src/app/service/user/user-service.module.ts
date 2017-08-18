import { NgModule } from '@angular/core';

import { PSSRHttpServiceModule } from '../http/http-service.module';

import { UserServiceBase } from './base/user.service';
import { UserByIdentifierService } from './by-identifier/user-by-identifier.service';
import { UserByNameService } from './by-name/user-by-name.service';
import { UserByRankingService } from './by-ranking/user-by-ranking.service';
import { UserByTokenService } from './by-token/user-by-token.service';

export { UserServiceBase, UserByIdentifierService, UserByNameService, UserByRankingService, UserByTokenService };

@NgModule({
  imports: [
    PSSRHttpServiceModule
  ],
  providers: [
    UserByIdentifierService,
    UserByNameService,
    UserByRankingService,
    UserByTokenService
  ]
})
export class PSSRUserServiceModule { }

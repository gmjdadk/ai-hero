import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PSSRPageNotFoundModule } from './route/not-found/not-found.module';
import { PSSRTop100Module } from './route/top100/top100.module';
import { PSSRSearchAllModule } from './route/search-all/search-all.module';
import { PSSRUserModule } from './route/user/user.module';

@NgModule({
  imports: [
    RouterModule.forRoot([
      /* define app module routes here, e.g., to lazily load a module
         (do not place feature module routes here, use an own -routing.module.ts in the feature instead)
       */
    ]),
    // Routes
    PSSRPageNotFoundModule,
    PSSRTop100Module,
    PSSRSearchAllModule,
    PSSRUserModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

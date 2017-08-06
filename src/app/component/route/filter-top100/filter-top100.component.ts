import { Component, OnInit } from '@angular/core';

import { User } from '../../../model/user/user.model';
import { Ship } from '../../../model/ship/ship.model';

import { TokenByLamService } from '../../../service/token/by-lam/token-by-lam.service';
import { UserByRankingService } from '../../../service/user/by-ranking/user-by-ranking.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-filter-top100',
  templateUrl: './filter-top100.component.html',
  styleUrls: ['./filter-top100.component.css']
})
export class FilterTop100Component implements OnInit {
  private users: User[];

  constructor(
    private tokenByLamService: TokenByLamService,
    private usersByRankingService: UserByRankingService
  ) { }

  ngOnInit() {
    let tokenObs: Observable<string> = this.tokenByLamService.getTokenByLam();

    tokenObs
      .flatMap(token => this.usersByRankingService.getUsersByRanking(token, 1, 100))
      .do(users => this.users = users)
      .subscribe();
  }

}

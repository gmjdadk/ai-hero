import { Http } from '@angular/http';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs/Observable';

import { Crew } from '../../../../model/model.module';
import { CharacterDesignService } from '../../../data/data-service.module';

export abstract class CrewServiceBase {

  constructor(
    protected http: Http,
    private characterDesignService: CharacterDesignService
  ) { }

  private annotateCrewWithDesign(crew: Crew): Observable<Crew> {
    return this.characterDesignService.getCharacterDesignById(crew.CharacterDesignId)
      .map(res => {
        crew.Design = res.exists ? res.design : null;
        return crew;
      });
  }

  protected provideCrew(crew: Crew[]): Observable<Crew[]> {
    return Observable.of(crew)
      .map(res => res.map(c => this.annotateCrewWithDesign(c)))
      .flatMap(res => Observable.forkJoin(res));
  }
}

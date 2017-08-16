import { NgModule } from '@angular/core';

import { PersistentHttpService } from './persistent/persistent-http.service';
import { XMLSerializerService } from './xml/xml-serializer.service';

export { PersistentHttpService, XMLSerializerService };

@NgModule({
  declarations: [
    PersistentHttpService,
    XMLSerializerService
  ],
  providers: [
    PersistentHttpService,
    XMLSerializerService
  ],
})
export class PSSRHttpServiceModule { }

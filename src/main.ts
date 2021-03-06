import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// here
import 'zone.js/dist/zone';

import 'rxjs/add/operator/map';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
  
}

platformBrowserDynamic().bootstrapModule(AppModule);

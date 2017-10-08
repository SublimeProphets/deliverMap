import {Routes} from '@angular/router';
import { FileuploaderComponent } from './fileuploader/fileuploader.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomepageComponent } from './homepage/homepage.component';
import { DataTableViewComponent } from './data-table-view/data-table-view.component';

import { OSMComponent} from './osm/osm.component';
import { SettingsComponent } from "./settings/settings.component";

export const appRoutes: Routes = [
  { path: 'settings', 
    component: SettingsComponent,
    data: { title: 'Einstellungen' } 
  },
  { path: 'clients', 
    component: DataTableViewComponent,
    data: { title: 'Kundentabelle' } 
  },

  { path: 'osm', 
    component: OSMComponent,
    data: { title: 'OSM' } 
  },
  { path: '', component: HomepageComponent },
  { path: 'map', component: OSMComponent },    
  { path: 'map/:type/:id', component: OSMComponent },
  { path: '**', component: PageNotFoundComponent }    
];